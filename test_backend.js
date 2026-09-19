const http = require("http");
const assert = require("assert");
const fs = require("fs");
const path = require("path");

process.env.NODE_ENV = "test";
process.env.PORT = "5099";

const app = require("./backend/server");

const server = app.listen(5099, async () => {
  console.log("\n==================================================");
  console.log("RUNNING BACKEND COMPREHENSIVE TEST SUITE");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  const request = (method, path, body = null, token = null) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: "127.0.0.1",
        port: 5099,
        path,
        method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
      }

      const req = http.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          let parsed = null;
          try {
            parsed = JSON.parse(data);
          } catch (_) {
            parsed = data;
          }
          resolve({ status: res.statusCode, headers: res.headers, body: parsed });
        });
      });

      req.on("error", reject);

      if (body) {
        req.write(JSON.stringify(body));
      }
      req.end();
    });
  };

  const test = async (name, fn) => {
    try {
      await fn();
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ [FAIL] ${name}: ${err.message}`);
      failed++;
    }
  };

  try {
    // 1. Health Check
    await test("GET /api/health returns 200 OK", async () => {
      const res = await request("GET", "/api/health");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, "OK");
    });

    // 2. Products Catalog
    await test("GET /api/products returns 60 products across categories", async () => {
      const res = await request("GET", "/api/products");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.count, 60);
    });

    // 3. Category Filtering
    await test("GET /api/products?category=fashion returns 10 fashion items", async () => {
      const res = await request("GET", "/api/products?category=fashion");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.count, 10);
      res.body.products.forEach((p) => assert.strictEqual(p.category, "fashion"));
    });

    // 4. Single Product Retrieval
    await test("GET /api/products/1 returns product details", async () => {
      const res = await request("GET", "/api/products/1");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.product.id, 1);
      assert.strictEqual(res.body.product.name, "Classic Cotton Crewneck T-Shirt");
    });

    // 5. Product Search
    await test("GET /api/products?search=shoes returns matching products", async () => {
      const res = await request("GET", "/api/products?search=shoes");
      assert.strictEqual(res.status, 200);
      assert(res.body.products.length > 0);
    });

    // 6. Categories endpoint
    await test("GET /api/products/categories returns 6 distinct categories", async () => {
      const res = await request("GET", "/api/products/categories");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.categories.length, 6);
    });

    // 7. User Registration
    let authToken = null;
    const testEmail = `tester_${Date.now()}@example.com`;

    await test("POST /api/auth/register creates user and returns JWT", async () => {
      const res = await request("POST", "/api/auth/register", {
        name: "Test Runner",
        email: testEmail,
        password: "secretpassword123",
        preferences: {
          preferredCategories: ["fashion", "sports"],
          clothingSize: "L",
          shoeSize: "10",
        },
      });
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert(res.body.token, "Token should be present");
      assert.strictEqual(res.body.user.email, testEmail);
      authToken = res.body.token;
    });

    // 8. User Login
    await test("POST /api/auth/login authenticates with valid credentials", async () => {
      const res = await request("POST", "/api/auth/login", {
        email: testEmail,
        password: "secretpassword123",
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(res.body.token);
    });

    // 9. Invalid Credentials
    await test("POST /api/auth/login fails on incorrect password", async () => {
      const res = await request("POST", "/api/auth/login", {
        email: testEmail,
        password: "wrongpassword",
      });
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 10. Protected Current User
    await test("GET /api/auth/me returns profile for authenticated user", async () => {
      const res = await request("GET", "/api/auth/me", null, authToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.user.email, testEmail);
    });

    // 11. Unauthorized access without token
    await test("GET /api/auth/me rejects request without token", async () => {
      const res = await request("GET", "/api/auth/me");
      assert.strictEqual(res.status, 401);
    });

    // 12. Update Profile & Preferences
    await test("PUT /api/users/profile updates user personalization data", async () => {
      const res = await request(
        "PUT",
        "/api/users/profile",
        {
          name: "Test Runner Updated",
          preferences: {
            ageRange: "25-34",
            preferredCategories: ["sports", "books"],
            clothingSize: "XL",
            shoeSize: "11",
          },
        },
        authToken
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.user.name, "Test Runner Updated");
      assert.strictEqual(res.body.user.preferences.clothingSize, "XL");
    });

    // 13. Track Recently Viewed
    await test("POST /api/users/recently-viewed records product views without duplicates", async () => {
      await request("POST", "/api/users/recently-viewed", { productId: 4 }, authToken);
      await request("POST", "/api/users/recently-viewed", { productId: 11 }, authToken);
      await request("POST", "/api/users/recently-viewed", { productId: 4 }, authToken); // Duplicate view

      const res = await request("GET", "/api/users/recently-viewed", null, authToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.count, 2);
      assert.strictEqual(res.body.recentlyViewed[0].id, 4); // Newest first
    });

    // 14. Cart Operations
    let addedCartItemId = null;
    await test("POST /api/cart adds product with selected variant", async () => {
      const res = await request(
        "POST",
        "/api/cart",
        { productId: 1, quantity: 2, selectedVariant: "L" },
        authToken
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.count, 1);
      assert.strictEqual(res.body.cart[0].selectedVariant, "L");
      assert.strictEqual(res.body.cart[0].quantity, 2);
      addedCartItemId = res.body.cart[0]._id;
    });

    await test("PUT /api/cart/:itemId updates item quantity", async () => {
      const res = await request(
        "PUT",
        `/api/cart/${addedCartItemId}`,
        { quantity: 3 },
        authToken
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.cart[0].quantity, 3);
    });

    // 15. Wishlist Operations
    await test("POST /api/wishlist/:productId toggles item in wishlist", async () => {
      const res = await request("POST", "/api/wishlist/6", null, authToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.inWishlist, true);

      const listRes = await request("GET", "/api/wishlist", null, authToken);
      assert.strictEqual(listRes.status, 200);
      assert.strictEqual(listRes.body.count, 1);
      assert.strictEqual(listRes.body.wishlist[0].id, 6);
    });

    // 16. Orders API - Create Order
    let createdOrderId = null;
    await test("POST /api/orders creates order and updates recentlyPurchased", async () => {
      const orderPayload = {
        items: [
          {
            productId: 1,
            name: "Classic Cotton Crewneck T-Shirt",
            price: 599,
            quantity: 2,
            selectedVariant: "L",
            image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80",
          },
        ],
        shippingAddress: {
          fullName: "Test Runner",
          email: testEmail,
          phone: "9876543210",
          street: "123 Test Avenue",
          city: "Bengaluru",
          state: "Karnataka",
          pincode: "560001",
        },
        paymentMethod: "upi",
        subtotal: 1198,
        discount: 100,
        couponCode: "SAVE10",
        shipping: 0,
        total: 1098,
      };

      const res = await request("POST", "/api/orders", orderPayload, authToken);
      assert.strictEqual(res.status, 201);
      assert(res.body.order.orderId.startsWith("ORD-"));
      assert.strictEqual(res.body.order.orderStatus, "Placed");
      assert.strictEqual(res.body.order.trackingHistory[0].status, "Placed");
      createdOrderId = res.body.order.orderId;

      // Verify recentlyPurchased updated
      const purRes = await request("GET", "/api/users/recently-purchased", null, authToken);
      assert.strictEqual(purRes.status, 200);
      assert(purRes.body.recentlyPurchased.some((p) => p.id === 1));

      // Verify cart was cleared after order
      const cartRes = await request("GET", "/api/cart", null, authToken);
      assert.strictEqual(cartRes.status, 200);
      assert.strictEqual(cartRes.body.count, 0);
    });

    // 17. Orders API - Get Order By ID
    await test("GET /api/orders/:id retrieves order with tracking history", async () => {
      const res = await request("GET", `/api/orders/${createdOrderId}`, null, authToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.order.orderId, createdOrderId);
      assert.strictEqual(res.body.order.total, 1098);
    });

    // 18. Recommendations Engine
    await test("GET /api/recommendations returns personalized explainable recommendations", async () => {
      const res = await request("GET", "/api/recommendations?limit=6", null, authToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.count, 6);
      assert(res.body.recommendations[0].recommendationReason);
      assert(typeof res.body.recommendations[0].recommendationScore === "number");
    });

    // 19. Unauthenticated Order Creation Rejected
    await test("POST /api/orders strictly rejects unauthenticated requests with 401", async () => {
      const orderPayload = {
        items: [{ productId: 1, name: "Test", price: 599, quantity: 1 }],
        shippingAddress: { fullName: "Hacker", email: "hacker@test.com", phone: "9999999999", street: "None", city: "Nowhere", state: "None", pincode: "111111" },
        paymentMethod: "card",
        subtotal: 599,
        total: 599
      };
      const res = await request("POST", "/api/orders", orderPayload);
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 20. Confirm Password Validation
    await test("POST /api/auth/register rejects mismatched confirm password with 400", async () => {
      const res = await request("POST", "/api/auth/register", {
        name: "Mismatch User",
        email: `mismatch_${Date.now()}@example.com`,
        password: "secretpassword123",
        confirmPassword: "differentpassword456",
        phone: "9123456780"
      });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert(res.body.error.toLowerCase().includes("match"));
    });

    // 21. Phone Number Login
    const phoneUserEmail = `phoneuser_${Date.now()}@example.com`;
    const phoneUserNumber = "9871234567";
    await test("POST /api/auth/login succeeds with phone number identifier", async () => {
      // Register with phone number
      const regRes = await request("POST", "/api/auth/register", {
        name: "Phone User",
        email: phoneUserEmail,
        password: "phonepassword123",
        confirmPassword: "phonepassword123",
        phone: phoneUserNumber
      });
      assert.strictEqual(regRes.status, 201);

      // Login using phone as identifier
      const loginRes = await request("POST", "/api/auth/login", {
        identifier: phoneUserNumber,
        password: "phonepassword123"
      });
      assert.strictEqual(loginRes.status, 200);
      assert.strictEqual(loginRes.body.success, true);
      assert(loginRes.body.token);
      assert.strictEqual(loginRes.body.user.phone, phoneUserNumber);
    });

    // 22. Google OAuth Authentication
    let googleAuthToken = null;
    await test("POST /api/auth/google authenticates or creates Google user", async () => {
      const googleEmail = `google_${Date.now()}@example.com`;
      const res = await request("POST", "/api/auth/google", {
        email: googleEmail,
        name: "Google Explorer",
        googleId: `gid_${Date.now()}`
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(res.body.token);
      assert.strictEqual(res.body.user.email, googleEmail);
      googleAuthToken = res.body.token;
    });

    // 23. Phone OTP Login (Demo OTP 123456)
    await test("POST /api/auth/phone-login verifies demo OTP and returns session", async () => {
      const res = await request("POST", "/api/auth/phone-login", {
        phone: "9988776655",
        otp: "123456"
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(res.body.token);
      assert.strictEqual(res.body.user.phone, "9988776655");
    });

    // 24. Phone OTP Login with Invalid OTP
    await test("POST /api/auth/phone-login rejects invalid OTP code with 400", async () => {
      const res = await request("POST", "/api/auth/phone-login", {
        phone: "9988776655",
        otp: "999999"
      });
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    // 25. Cross-User Order Security Isolation
    await test("GET and PUT /api/orders/:id prevents User B from accessing or cancelling User A's order", async () => {
      // User B (Google user) tries to fetch User A's order
      const fetchRes = await request("GET", `/api/orders/${createdOrderId}`, null, googleAuthToken);
      assert([403, 404].includes(fetchRes.status), "Should deny access with 403 or 404");

      // User B tries to cancel User A's order
      const cancelRes = await request("PUT", `/api/orders/${createdOrderId}/cancel`, null, googleAuthToken);
      assert([403, 404].includes(cancelRes.status), "Should deny cancel with 403 or 404");
    });

    // 26. Unauthenticated Cart Modification Rejected
    await test("POST /api/cart strictly rejects unauthenticated requests with 401", async () => {
      const res = await request("POST", "/api/cart", { productId: 1, quantity: 1 });
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 27. Unauthenticated Cart Retrieval Rejected
    await test("GET /api/cart strictly rejects unauthenticated requests with 401", async () => {
      const res = await request("GET", "/api/cart");
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 28. Unauthenticated Wishlist Toggle Rejected
    await test("POST /api/wishlist/:id strictly rejects unauthenticated requests with 401", async () => {
      const res = await request("POST", "/api/wishlist/1");
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 29. Unauthenticated Orders List Rejected
    await test("GET /api/orders strictly rejects unauthenticated requests with 401", async () => {
      const res = await request("GET", "/api/orders");
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 30. Unauthenticated Recommendations Return Non-Personalized Catalog Picks
    await test("GET /api/recommendations without auth token returns isPersonalized: false", async () => {
      const res = await request("GET", "/api/recommendations");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.isPersonalized, false);
      assert(res.body.recommendations.length > 0);
    });

    // 31. Unauthenticated Product Review Attempt strictly rejected with 401
    await test("POST /api/products/:id/reviews rejects unauthenticated requests with 401", async () => {
      const res = await request("POST", "/api/products/1/reviews", {
        rating: 5,
        comment: "Great quality!",
      });
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // 32. Product Review with Invalid Rating rejected with 400
    await test("POST /api/products/:id/reviews rejects invalid rating values with 400", async () => {
      const resHigh = await request(
        "POST",
        "/api/products/1/reviews",
        { rating: 6, comment: "Rating too high" },
        authToken
      );
      assert.strictEqual(resHigh.status, 400);
      assert.strictEqual(resHigh.body.success, false);

      const resLow = await request(
        "POST",
        "/api/products/1/reviews",
        { rating: 0, comment: "Rating too low" },
        authToken
      );
      assert.strictEqual(resLow.status, 400);
      assert.strictEqual(resLow.body.success, false);

      const resShort = await request(
        "POST",
        "/api/products/1/reviews",
        { rating: 5, comment: " " },
        authToken
      );
      assert.strictEqual(resShort.status, 400);
      assert.strictEqual(resShort.body.success, false);
    });

    // 33. Non-purchaser attempting to review is rejected with 403
    await test("POST /api/products/:id/reviews rejects non-purchasers with 403", async () => {
      // Test Runner has only purchased product 1, not product 2
      const res = await request(
        "POST",
        "/api/products/2/reviews",
        { rating: 5, comment: "I never ordered or received this item." },
        authToken
      );
      assert.strictEqual(res.status, 403);
      assert.strictEqual(res.body.success, false);
      assert(res.body.error.includes("verified purchasers"));
    });

    // 34. Successful verified-purchase review creation
    await test("POST /api/products/:id/reviews allows verified purchaser to submit review and updates rating/count", async () => {
      const initialProd = await request("GET", "/api/products/1");
      const initialRating = initialProd.body.product.rating;
      const initialCount = initialProd.body.product.reviewCount || initialProd.body.product.reviews;

      const res = await request(
        "POST",
        "/api/products/1/reviews",
        { rating: 5, comment: "Outstanding breathable cotton quality and superb stitching!" },
        authToken
      );
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.review.rating, 5);
      assert.strictEqual(res.body.review.verifiedPurchase, true);
      assert.strictEqual(res.body.reviewCount, initialCount + 1);

      // Verify product retrieval reflects new review and updated rating
      const updatedProd = await request("GET", "/api/products/1");
      assert.strictEqual(updatedProd.body.product.reviewCount, initialCount + 1);
      assert(Array.isArray(updatedProd.body.product.reviewsList));
      assert(updatedProd.body.product.reviewsList.some((r) => r.comment.includes("Outstanding breathable")));
    });

    // 35. Duplicate review prevention
    await test("POST /api/products/:id/reviews prevents duplicate review submissions by same user with 400", async () => {
      const res = await request(
        "POST",
        "/api/products/1/reviews",
        { rating: 4, comment: "Submitting a second review for the same item" },
        authToken
      );
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert(res.body.error.includes("already submitted"));
    });

    // 36. GET /api/products/:id/reviews returns reviews list and verified eligibility status
    await test("GET /api/products/:id/reviews returns reviews list and verified eligibility status", async () => {
      // With authToken (has purchased & has reviewed)
      const authRes = await request("GET", "/api/products/1/reviews", null, authToken);
      assert.strictEqual(authRes.status, 200);
      assert.strictEqual(authRes.body.success, true);
      assert.strictEqual(authRes.body.hasPurchased, true);
      assert.strictEqual(authRes.body.hasReviewed, true);
      assert.strictEqual(authRes.body.canReview, false);
      assert(authRes.body.userReview !== null);

      // Unauthenticated request (no token)
      const unauthReviewRes = await request("GET", "/api/products/1/reviews");
      assert.strictEqual(unauthReviewRes.status, 200);
      assert.strictEqual(unauthReviewRes.body.canReview, false);
      assert.strictEqual(unauthReviewRes.body.hasPurchased, false);
      assert(Array.isArray(unauthReviewRes.body.reviewsList));
    });

    // 37. Price Filtering (minPrice & maxPrice)
    await test("GET /api/products?minPrice=1000&maxPrice=5000 filters by price range", async () => {
      const res = await request("GET", "/api/products?minPrice=1000&maxPrice=5000");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(res.body.products.length > 0);
      res.body.products.forEach((p) => {
        assert(p.price >= 1000, `Product ${p.name} price ₹${p.price} should be >= 1000`);
        assert(p.price <= 5000, `Product ${p.name} price ₹${p.price} should be <= 5000`);
      });
    });

    // 38. Minimum Rating Filtering (minRating)
    await test("GET /api/products?minRating=4.5 filters products by customer rating", async () => {
      const res = await request("GET", "/api/products?minRating=4.5");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(res.body.products.length > 0);
      res.body.products.forEach((p) => {
        assert(p.rating >= 4.5, `Product ${p.name} rating ${p.rating} should be >= 4.5`);
      });
    });

    // 39. In Stock Only Filtering (inStock=true)
    await test("GET /api/products?inStock=true returns only available in-stock items", async () => {
      const res = await request("GET", "/api/products?inStock=true");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(res.body.products.length > 0);
      res.body.products.forEach((p) => {
        assert(p.stock > 0, `Product ${p.name} stock ${p.stock} should be > 0`);
      });
    });

    // 40. Combined Multi-Criteria Filtering (category + price + minRating + inStock)
    await test("GET /api/products with combined category, price, rating, and stock filters", async () => {
      const res = await request(
        "GET",
        "/api/products?category=fashion&minPrice=500&maxPrice=3000&minRating=4.0&inStock=true"
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(res.body.products.length > 0);
      res.body.products.forEach((p) => {
        assert.strictEqual(p.category, "fashion");
        assert(p.price >= 500 && p.price <= 3000);
        assert(p.rating >= 4.0);
        assert(p.stock > 0);
      });
    });

    // 41. Extreme Filter Yielding Empty Results
    await test("GET /api/products with extreme price filters gracefully returns empty count and list", async () => {
      const res = await request("GET", "/api/products?minPrice=999999");
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.count, 0);
      assert.strictEqual(res.body.products.length, 0);
    });

    // 42. Order Tracking Retrieval & Delivery Estimate Persistence
    let trackingOrderId = null;
    await test("GET /api/orders/:id/tracking retrieves dynamic order tracking and persisted delivery estimate", async () => {
      const orderRes = await request(
        "POST",
        "/api/orders",
        {
          items: [
            {
              productId: 2,
              name: "Premium Hoodie",
              price: 1299,
              quantity: 1,
              image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80",
            },
          ],
          shippingAddress: {
            fullName: "Jane Doe",
            email: testEmail,
            phone: "9876543210",
            street: "123 High Street",
            city: "Bengaluru",
            state: "Karnataka",
            pincode: "560001",
          },
          paymentMethod: "card",
          subtotal: 1299,
          total: 1299,
        },
        authToken
      );
      assert.strictEqual(orderRes.status, 201);
      trackingOrderId = orderRes.body.order.orderId;

      const trackRes = await request("GET", `/api/orders/${trackingOrderId}/tracking`, null, authToken);
      assert.strictEqual(trackRes.status, 200);
      assert.strictEqual(trackRes.body.success, true);
      const { tracking } = trackRes.body;
      assert.strictEqual(tracking.orderId, trackingOrderId);
      assert.strictEqual(tracking.orderStatus, "Placed");
      assert(tracking.carrier, "Carrier should be present");
      assert(tracking.trackingNumber, "Tracking number should be present");
      assert(tracking.estimatedDeliveryDate, "Estimated delivery date should be present");
      assert(Array.isArray(tracking.milestones), "Milestones should be an array");
      assert.strictEqual(tracking.milestones.length, 4);
      assert.strictEqual(tracking.milestones[0].stage, "Placed");
      assert.strictEqual(tracking.milestones[0].isCompleted, true);
      assert(tracking.trackingHistory.length >= 1);
      assert(tracking.trackingHistory[0].timestamp, "Initial tracking history should have timestamp");
    });

    // 43. Correct Status Progression with Timestamps (Placed -> Shipped -> Out for Delivery -> Delivered)
    await test("PUT /api/orders/:id/progress advances order status correctly with timestamps", async () => {
      // Step 1: Placed -> Shipped
      const step1 = await request("PUT", `/api/orders/${trackingOrderId}/progress`, null, authToken);
      assert.strictEqual(step1.status, 200);
      assert.strictEqual(step1.body.order.orderStatus, "Shipped");
      assert.strictEqual(step1.body.order.trackingHistory[1].status, "Shipped");
      assert(step1.body.order.trackingHistory[1].timestamp);

      // Step 2: Shipped -> Out for Delivery
      const step2 = await request("PUT", `/api/orders/${trackingOrderId}/progress`, null, authToken);
      assert.strictEqual(step2.status, 200);
      assert.strictEqual(step2.body.order.orderStatus, "Out for Delivery");
      assert.strictEqual(step2.body.order.trackingHistory[2].status, "Out for Delivery");

      // Step 3: Out for Delivery -> Delivered
      const step3 = await request("PUT", `/api/orders/${trackingOrderId}/progress`, null, authToken);
      assert.strictEqual(step3.status, 200);
      assert.strictEqual(step3.body.order.orderStatus, "Delivered");
      assert.strictEqual(step3.body.order.trackingHistory[3].status, "Delivered");
      assert(step3.body.order.trackingHistory[3].timestamp);

      // Verify tracking retrieval reflects Delivered state with deliveredAt
      const trackRes = await request("GET", `/api/orders/${trackingOrderId}/tracking`, null, authToken);
      assert.strictEqual(trackRes.status, 200);
      assert.strictEqual(trackRes.body.tracking.orderStatus, "Delivered");
      assert(trackRes.body.tracking.deliveredAt, "deliveredAt should be populated when Delivered");
      assert.strictEqual(trackRes.body.tracking.milestones[3].isCompleted, true);
    });

    // 44. Enforce Delivered State (Cannot progress past Delivered)
    await test("PUT /api/orders/:id/progress rejects progression once order is already Delivered", async () => {
      const res = await request("PUT", `/api/orders/${trackingOrderId}/progress`, null, authToken);
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
    });

    // 45. Invoice Data Retrieval
    await test("GET /api/orders/:id/invoice returns full invoice and receipt data", async () => {
      const res = await request("GET", `/api/orders/${trackingOrderId}/invoice`, null, authToken);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      const { invoice } = res.body;
      assert(invoice.invoiceNumber.startsWith("INV-ORD-"));
      assert.strictEqual(invoice.orderId, trackingOrderId);
      assert.strictEqual(invoice.orderStatus, "Delivered");
      assert.strictEqual(invoice.storeName, "Shop Express");
      assert.strictEqual(invoice.customer.name, "Jane Doe");
      assert.strictEqual(invoice.customer.email, testEmail);
      assert.strictEqual(invoice.items.length, 1);
      assert.strictEqual(invoice.items[0].name, "Premium Hoodie");
      assert.strictEqual(invoice.items[0].price, 1299);
      assert.strictEqual(invoice.pricing.total, 1299);
      assert(invoice.pricing.taxAmount > 0);
      assert.strictEqual(invoice.payment.method, "CARD");
      assert(invoice.tracking.trackingNumber);
    });

    // 46. Unauthenticated Rejection for Tracking, Invoice, and Progress
    await test("GET /api/orders/:id/tracking and /invoice reject unauthenticated requests with 401", async () => {
      const trackRes = await request("GET", `/api/orders/${trackingOrderId}/tracking`);
      assert.strictEqual(trackRes.status, 401);

      const invRes = await request("GET", `/api/orders/${trackingOrderId}/invoice`);
      assert.strictEqual(invRes.status, 401);

      const progRes = await request("PUT", `/api/orders/${trackingOrderId}/progress`, {});
      assert.strictEqual(progRes.status, 401);
    });

    // 47. Cross-User Security Isolation for Tracking and Invoice
    await test("GET /api/orders/:id/tracking and /invoice strictly deny access to User B with 403", async () => {
      const trackRes = await request("GET", `/api/orders/${trackingOrderId}/tracking`, null, googleAuthToken);
      assert.strictEqual(trackRes.status, 403);
      assert.strictEqual(trackRes.body.success, false);

      const invRes = await request("GET", `/api/orders/${trackingOrderId}/invoice`, null, googleAuthToken);
      assert.strictEqual(invRes.status, 403);
      assert.strictEqual(invRes.body.success, false);

      const progRes = await request("PUT", `/api/orders/${trackingOrderId}/progress`, null, googleAuthToken);
      assert.strictEqual(progRes.status, 403);
      assert.strictEqual(progRes.body.success, false);
    });

    // 48. Cancellation Compatibility with Status Progression
    await test("Order cancellation is compatible with tracking and prevents further progression", async () => {
      // Create an order to be cancelled
      const newOrder = await request(
        "POST",
        "/api/orders",
        {
          items: [
            {
              productId: 3,
              name: "Silk Scarf",
              price: 499,
              quantity: 1,
              image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
            },
          ],
          shippingAddress: {
            fullName: "Cancel Tester",
            email: testEmail,
            phone: "9876543210",
            street: "Cancel Lane",
            city: "Bengaluru",
            state: "Karnataka",
            pincode: "560001",
          },
          paymentMethod: "cod",
          subtotal: 499,
          total: 499,
        },
        authToken
      );
      assert.strictEqual(newOrder.status, 201);
      const cancelOrderId = newOrder.body.order.orderId;

      // Cancel order while in Placed status
      const cancelRes = await request("PUT", `/api/orders/${cancelOrderId}/cancel`, null, authToken);
      assert.strictEqual(cancelRes.status, 200);
      assert.strictEqual(cancelRes.body.order.orderStatus, "Cancelled");

      // Progressing cancelled order must fail with 400
      const progRes = await request("PUT", `/api/orders/${cancelOrderId}/progress`, null, authToken);
      assert.strictEqual(progRes.status, 400);
      assert.strictEqual(progRes.body.success, false);

      // Delivered order cannot be cancelled
      const cancelDeliveredRes = await request("PUT", `/api/orders/${trackingOrderId}/cancel`, null, authToken);
      assert.strictEqual(cancelDeliveredRes.status, 400);
      assert.strictEqual(cancelDeliveredRes.body.success, false);
    });

    // ==================================================
    // SAVED ADDRESS BOOK & MULTI-ADDRESS CHECKOUT TESTS
    // ==================================================

    // 50. Unauthenticated Address Access Rejected
    await test("GET /api/users/addresses rejects unauthenticated request with 401", async () => {
      const res = await request("GET", "/api/users/addresses");
      assert.strictEqual(res.status, 401);
      assert.strictEqual(res.body.success, false);
    });

    // Setup dedicated User A and User B for address testing
    const addrUserAEmail = `addr_user_a_${Date.now()}@example.com`;
    const addrUserBEmail = `addr_user_b_${Date.now()}@example.com`;
    const regResA = await request("POST", "/api/auth/register", {
      name: "Address User A",
      email: addrUserAEmail,
      password: "password123",
      confirmPassword: "password123",
      phone: "9111111111",
    });
    const tokenA = regResA.body.token;

    const regResB = await request("POST", "/api/auth/register", {
      name: "Address User B",
      email: addrUserBEmail,
      password: "password123",
      confirmPassword: "password123",
      phone: "9222222222",
    });
    const tokenB = regResB.body.token;

    // 51. Authenticated User Lists Empty/Initial Addresses
    await test("GET /api/users/addresses returns address list for authenticated user", async () => {
      const res = await request("GET", "/api/users/addresses", null, tokenA);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert(Array.isArray(res.body.addresses));
      assert.strictEqual(res.body.addresses.length, 0);
    });

    // 52. Validation: Rejects Missing Required Fields
    await test("POST /api/users/addresses rejects missing required fields with 400", async () => {
      const res = await request(
        "POST",
        "/api/users/addresses",
        {
          fullName: "",
          phone: "",
        },
        tokenA
      );
      assert.strictEqual(res.status, 400);
      assert.strictEqual(res.body.success, false);
      assert(res.body.error);
    });

    let address1Id = null;
    let address2Id = null;

    // 53. Authenticated User Creates First Address
    await test("POST /api/users/addresses creates a new address for authenticated user", async () => {
      const res = await request(
        "POST",
        "/api/users/addresses",
        {
          label: "Home",
          fullName: "Address User A",
          phone: "9111111111",
          addressLine1: "123 Main Street, Apt 4B",
          addressLine2: "Near City Park",
          city: "Bengaluru",
          state: "Karnataka",
          postalCode: "560001",
          country: "India",
        },
        tokenA
      );
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert(res.body.address);
      assert.strictEqual(res.body.address.label, "Home");
      assert.strictEqual(res.body.address.fullName, "Address User A");
      assert.strictEqual(res.body.address.addressLine1, "123 Main Street, Apt 4B");
      assert.strictEqual(res.body.address.city, "Bengaluru");
      assert.strictEqual(res.body.address.postalCode, "560001");
      address1Id = res.body.address.id || res.body.address._id;
      assert(address1Id, "Address ID should be present");
    });

    // 54. First Address Automatically Set as Default
    await test("First created address automatically receives isDefault: true", async () => {
      const res = await request("GET", "/api/users/addresses", null, tokenA);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.addresses.length, 1);
      assert.strictEqual(res.body.addresses[0].isDefault, true);
    });

    // 55. Second Address Without isDefault Leaves First as Default
    await test("Adding second address with isDefault: false keeps first address as default", async () => {
      const res = await request(
        "POST",
        "/api/users/addresses",
        {
          label: "Work",
          fullName: "Address User A",
          phone: "9111111111",
          addressLine1: "456 Tech Park, Building 2",
          addressLine2: "Electronic City",
          city: "Bengaluru",
          state: "Karnataka",
          postalCode: "560100",
          country: "India",
          isDefault: false,
        },
        tokenA
      );
      assert.strictEqual(res.status, 201);
      address2Id = res.body.address.id || res.body.address._id;
      assert.strictEqual(res.body.address.isDefault, false);

      const listRes = await request("GET", "/api/users/addresses", null, tokenA);
      assert.strictEqual(listRes.body.addresses.length, 2);
      const addr1 = listRes.body.addresses.find((a) => (a.id || a._id) === address1Id);
      const addr2 = listRes.body.addresses.find((a) => (a.id || a._id) === address2Id);
      assert.strictEqual(addr1.isDefault, true);
      assert.strictEqual(addr2.isDefault, false);
    });

    // 56. Adding Address with isDefault: true Unsets Previous Default
    let address3Id = null;
    await test("Adding third address with isDefault: true unsets previous default", async () => {
      const res = await request(
        "POST",
        "/api/users/addresses",
        {
          label: "Other",
          fullName: "User A Vacation",
          phone: "9111111111",
          addressLine1: "789 Beach Road, Villa 12",
          city: "Panaji",
          state: "Goa",
          postalCode: "403001",
          country: "India",
          isDefault: true,
        },
        tokenA
      );
      assert.strictEqual(res.status, 201);
      address3Id = res.body.address.id || res.body.address._id;
      assert.strictEqual(res.body.address.isDefault, true);

      const listRes = await request("GET", "/api/users/addresses", null, tokenA);
      const defaultAddrs = listRes.body.addresses.filter((a) => a.isDefault);
      assert.strictEqual(defaultAddrs.length, 1);
      assert.strictEqual(defaultAddrs[0].id || defaultAddrs[0]._id, address3Id);
    });

    // 57. Only One Default Address Exists Across Entire Collection
    await test("Strict default guarantee: exactly one default address exists", async () => {
      const listRes = await request("GET", "/api/users/addresses", null, tokenA);
      const defaults = listRes.body.addresses.filter((a) => a.isDefault);
      assert.strictEqual(defaults.length, 1);
    });

    // 58. Authenticated User Can Update Address Details
    await test("PUT /api/users/addresses/:addressId updates address fields", async () => {
      const res = await request(
        "PUT",
        `/api/users/addresses/${address1Id}`,
        {
          fullName: "Address User A Updated",
          addressLine2: "Suite 999",
        },
        tokenA
      );
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.address.fullName, "Address User A Updated");
      assert.strictEqual(res.body.address.addressLine2, "Suite 999");
    });

    // 59. Setting Specific Address as Default via /default
    await test("PUT /api/users/addresses/:addressId/default switches default to specified address", async () => {
      const res = await request("PUT", `/api/users/addresses/${address1Id}/default`, null, tokenA);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.address.isDefault, true);

      const listRes = await request("GET", "/api/users/addresses", null, tokenA);
      const addr1 = listRes.body.addresses.find((a) => (a.id || a._id) === address1Id);
      const addr3 = listRes.body.addresses.find((a) => (a.id || a._id) === address3Id);
      assert.strictEqual(addr1.isDefault, true);
      assert.strictEqual(addr3.isDefault, false);
    });

    // 60. Deleting Default Address Safely Promotes Remaining Address to Default
    await test("DELETE default address safely promotes next remaining address to default", async () => {
      // address1 is default. Delete address1.
      const delRes = await request("DELETE", `/api/users/addresses/${address1Id}`, null, tokenA);
      assert.strictEqual(delRes.status, 200);
      assert.strictEqual(delRes.body.success, true);

      // Remaining addresses should be 2, and exactly 1 must be default
      const listRes = await request("GET", "/api/users/addresses", null, tokenA);
      assert.strictEqual(listRes.body.addresses.length, 2);
      const defaults = listRes.body.addresses.filter((a) => a.isDefault);
      assert.strictEqual(defaults.length, 1);
      // address1 should no longer exist
      assert(!listRes.body.addresses.some((a) => (a.id || a._id) === address1Id));
    });

    // 61. Deleting a Non-Default Address
    await test("DELETE /api/users/addresses/:addressId deletes specified address", async () => {
      const delRes = await request("DELETE", `/api/users/addresses/${address3Id}`, null, tokenA);
      assert.strictEqual(delRes.status, 200);
      assert.strictEqual(delRes.body.success, true);

      const listRes = await request("GET", "/api/users/addresses", null, tokenA);
      assert.strictEqual(listRes.body.addresses.length, 1);
      assert.strictEqual(listRes.body.addresses[0].id || listRes.body.addresses[0]._id, address2Id);
      assert.strictEqual(listRes.body.addresses[0].isDefault, true);
    });

    // 62. User B Cannot View User A's Saved Addresses
    await test("Multi-tenant security: User B address list is strictly isolated from User A", async () => {
      const resB = await request("GET", "/api/users/addresses", null, tokenB);
      assert.strictEqual(resB.status, 200);
      assert.strictEqual(resB.body.addresses.length, 0);
    });

    // 63. User B Cannot Update User A's Saved Address
    await test("Multi-tenant security: User B cannot update User A's address (returns 404)", async () => {
      const res = await request(
        "PUT",
        `/api/users/addresses/${address2Id}`,
        { fullName: "Hacker Attempt" },
        tokenB
      );
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    // 64. User B Cannot Delete User A's Saved Address
    await test("Multi-tenant security: User B cannot delete User A's address (returns 404)", async () => {
      const res = await request("DELETE", `/api/users/addresses/${address2Id}`, null, tokenB);
      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.success, false);
    });

    // 65. Checkout Using Saved Address Succeeds
    let checkoutOrderId = null;
    await test("POST /api/orders successfully places order using saved address data", async () => {
      const savedAddr = (await request("GET", "/api/users/addresses", null, tokenA)).body.addresses[0];
      const orderRes = await request(
        "POST",
        "/api/orders",
        {
          items: [
            {
              productId: 1,
              name: "Classic Cotton Crewneck T-Shirt",
              price: 799,
              quantity: 1,
              size: "L",
              image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&q=80",
            },
          ],
          shippingAddress: {
            fullName: savedAddr.fullName,
            phone: savedAddr.phone,
            addressLine1: savedAddr.addressLine1,
            addressLine2: savedAddr.addressLine2,
            city: savedAddr.city,
            state: savedAddr.state,
            postalCode: savedAddr.postalCode,
            country: savedAddr.country,
          },
          paymentMethod: "card",
          subtotal: 799,
          total: 799,
        },
        tokenA
      );
      assert.strictEqual(orderRes.status, 201);
      assert.strictEqual(orderRes.body.success, true);
      assert(orderRes.body.order.orderId);
      checkoutOrderId = orderRes.body.order.orderId;
      assert.strictEqual(orderRes.body.order.shippingAddress.fullName, savedAddr.fullName);
      assert.strictEqual(orderRes.body.order.shippingAddress.city, savedAddr.city);
    });

    // 66. Order Stores Independent Address Snapshot Unaffected by Later Address Changes
    await test("Order preserves immutable address snapshot independent of subsequent address modifications", async () => {
      // Modify User A's remaining saved address
      await request(
        "PUT",
        `/api/users/addresses/${address2Id}`,
        {
          fullName: "Completely Changed Name",
          addressLine1: "999 Altered Way",
          city: "Mumbai",
          postalCode: "400001",
        },
        tokenA
      );

      // Verify the previously placed order's shipping address is unchanged
      const fetchOrderRes = await request("GET", `/api/orders/${checkoutOrderId}`, null, tokenA);
      assert.strictEqual(fetchOrderRes.status, 200);
      const orderShipping = fetchOrderRes.body.order.shippingAddress;
      assert.strictEqual(orderShipping.fullName, "Address User A");
      assert.strictEqual(orderShipping.city, "Bengaluru");
      assert.strictEqual(orderShipping.postalCode, "560100");
    });

    // ==================================================
    // AUTHENTICATION-FIRST E2E & GUEST REMOVAL VERIFICATIONS
    // ==================================================

    // 67. Unauthenticated User Cannot Enter Authenticated Shopping Flow
    await test("unauthenticated user cannot enter authenticated shopping flow", async () => {
      const cartRes = await request("GET", "/api/cart");
      assert.strictEqual(cartRes.status, 401);
      const ordersRes = await request("GET", "/api/orders");
      assert.strictEqual(ordersRes.status, 401);
      const wishlistRes = await request("POST", "/api/wishlist/1");
      assert.strictEqual(wishlistRes.status, 401);
      const addressRes = await request("GET", "/api/users/addresses");
      assert.strictEqual(addressRes.status, 401);
      const checkoutRes = await request("POST", "/api/orders", {
        items: [{ productId: 1, name: "Test", price: 599, quantity: 1 }],
        shippingAddress: { fullName: "Test" },
        paymentMethod: "card",
        subtotal: 599,
        total: 599,
      });
      assert.strictEqual(checkoutRes.status, 401);
    });

    // 68. "Continue as Guest" No Longer Exists
    await test('"Continue as Guest" no longer exists', async () => {
      const indexPath = path.join(__dirname, "frontend", "index.html");
      const indexContent = fs.readFileSync(indexPath, "utf-8");
      assert(!indexContent.includes("Continue as Guest"), "index.html must not contain Continue as Guest");
      assert(!indexContent.includes("Just looking around?"), "index.html must not contain guest browsing prompt");
      assert(!indexContent.includes("guestBrowseCatalog()"), "index.html must not call guestBrowseCatalog()");

      const scriptPath = path.join(__dirname, "frontend", "script.js");
      const scriptContent = fs.readFileSync(scriptPath, "utf-8");
      assert(!scriptContent.includes("Guest (Sign In)"), "script.js must not display Guest (Sign In)");
      assert(scriptContent.includes("isGuestMode"), "isGuestMode exists for backward compatibility");
    });

    // 69. Authenticated User Can Enter Storefront
    let e2eToken = null;
    let e2eUser = null;
    await test("authenticated user can enter storefront", async () => {
      const loginRes = await request("POST", "/api/auth/login", {
        identifier: "alex@example.com",
        password: "password123",
      });
      assert.strictEqual(loginRes.status, 200);
      assert(loginRes.body.token);
      e2eToken = loginRes.body.token;
      e2eUser = loginRes.body.user;

      const meRes = await request("GET", "/api/auth/me", null, e2eToken);
      assert.strictEqual(meRes.status, 200);
      assert.strictEqual(meRes.body.user.email, "alex@example.com");
    });

    // 70. Authenticated Cart Still Works
    await test("authenticated cart still works", async () => {
      const addRes = await request(
        "POST",
        "/api/cart",
        { productId: 2, quantity: 1, selectedVariant: "M" },
        e2eToken
      );
      assert.strictEqual(addRes.status, 200);
      assert.strictEqual(addRes.body.success, true);

      const getCartRes = await request("GET", "/api/cart", null, e2eToken);
      assert.strictEqual(getCartRes.status, 200);
      assert(getCartRes.body.cart.some((item) => item.productId === 2));
    });

    // 71. Authenticated Wishlist Still Works
    await test("authenticated wishlist still works", async () => {
      const toggleRes = await request("POST", "/api/wishlist/3", null, e2eToken);
      assert.strictEqual(toggleRes.status, 200);
      assert.strictEqual(toggleRes.body.inWishlist, true);

      const listRes = await request("GET", "/api/wishlist", null, e2eToken);
      assert.strictEqual(listRes.status, 200);
      assert(listRes.body.wishlist.some((p) => p.id === 3));
    });

    // 72. Authenticated Checkout Still Works
    await test("authenticated checkout still works", async () => {
      const checkoutOrderRes = await request(
        "POST",
        "/api/orders",
        {
          items: [
            {
              productId: 2,
              name: "Slim-Fit Stretch Denim Jeans",
              price: 1899,
              quantity: 1,
              selectedVariant: "M",
              image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
            },
          ],
          shippingAddress: {
            fullName: "Alex Johnson",
            phone: "9876543210",
            street: "456 Fashion Avenue",
            city: "Bengaluru",
            state: "Karnataka",
            pincode: "560001",
          },
          paymentMethod: "upi",
          subtotal: 1899,
          total: 1899,
        },
        e2eToken
      );
      assert.strictEqual(checkoutOrderRes.status, 201);
      assert.strictEqual(checkoutOrderRes.body.success, true);
      assert(checkoutOrderRes.body.order.orderId);
    });

    // 73. Authenticated Address Book Still Works
    let e2eAddressId = null;
    await test("authenticated address book still works", async () => {
      const addAddrRes = await request(
        "POST",
        "/api/users/addresses",
        {
          fullName: "Alex Johnson",
          phone: "9876543210",
          addressLine1: "Suite 101, Tech Park",
          city: "Bengaluru",
          state: "Karnataka",
          postalCode: "560100",
          label: "Work",
          isDefault: true,
        },
        e2eToken
      );
      assert.strictEqual(addAddrRes.status, 201);
      assert(addAddrRes.body.address.id || addAddrRes.body.address._id);
      e2eAddressId = addAddrRes.body.address.id || addAddrRes.body.address._id;

      const listRes = await request("GET", "/api/users/addresses", null, e2eToken);
      assert.strictEqual(listRes.status, 200);
      assert(listRes.body.addresses.some((a) => (a.id || a._id) === e2eAddressId));
    });

    // 74. Authenticated Order Creation Still Works
    let e2eCreatedOrderId = null;
    await test("authenticated order creation still works", async () => {
      const orderRes = await request(
        "POST",
        "/api/orders",
        {
          items: [
            {
              productId: 4,
              name: "Breathable Pro Running Shoes",
              price: 3499,
              quantity: 1,
              selectedVariant: "9",
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
            },
          ],
          shippingAddress: {
            fullName: "Alex Johnson",
            phone: "9876543210",
            addressLine1: "Suite 101, Tech Park",
            city: "Bengaluru",
            state: "Karnataka",
            postalCode: "560100",
          },
          paymentMethod: "card",
          subtotal: 3499,
          total: 3499,
        },
        e2eToken
      );
      assert.strictEqual(orderRes.status, 201);
      assert.strictEqual(orderRes.body.success, true);
      e2eCreatedOrderId = orderRes.body.order.orderId;
      assert(e2eCreatedOrderId.startsWith("ORD-"));
    });

    // 75. Authenticated Order Tracking Still Works
    await test("authenticated order tracking still works", async () => {
      const trackingRes = await request("GET", `/api/orders/${e2eCreatedOrderId}/tracking`, null, e2eToken);
      assert.strictEqual(trackingRes.status, 200);
      assert.strictEqual(trackingRes.body.success, true);
      assert.strictEqual(trackingRes.body.tracking.orderStatus, "Placed");
      assert(trackingRes.body.tracking.milestones.length === 4);
    });

    // 76. Authenticated Invoice Generation Still Works
    await test("authenticated invoice generation still works", async () => {
      const invRes = await request("GET", `/api/orders/${e2eCreatedOrderId}/invoice`, null, e2eToken);
      assert.strictEqual(invRes.status, 200);
      assert.strictEqual(invRes.body.success, true);
      assert.strictEqual(invRes.body.invoice.orderId, e2eCreatedOrderId);
      assert.strictEqual(invRes.body.invoice.storeName, "Shop Express");
    });

    // 77. Logout Correctly Returns to Authentication Entry
    await test("logout correctly returns to authentication entry", async () => {
      // Simulate client token disposal on logout
      const invalidToken = null;
      const protectedRes = await request("GET", "/api/auth/me", null, invalidToken);
      assert.strictEqual(protectedRes.status, 401);
      assert.strictEqual(protectedRes.body.success, false);

      // Verify frontend script provides showWelcomeScreen navigation on logout
      const scriptPath = path.join(__dirname, "frontend", "script.js");
      const scriptContent = fs.readFileSync(scriptPath, "utf-8");
      assert(scriptContent.includes("showWelcomeScreen();"), "Logout and unauth transitions must route to welcome screen");
    });

    // 78. Logging In Again Restores the Authenticated Experience
    await test("logging in again restores the authenticated experience", async () => {
      const reloginRes = await request("POST", "/api/auth/login", {
        identifier: "alex@example.com",
        password: "password123",
      });
      assert.strictEqual(reloginRes.status, 200);
      const reToken = reloginRes.body.token;
      assert(reToken);

      const meRes = await request("GET", "/api/auth/me", null, reToken);
      assert.strictEqual(meRes.status, 200);
      assert.strictEqual(meRes.body.user.name, "Alex Morgan");

      const ordersRes = await request("GET", "/api/orders", null, reToken);
      assert.strictEqual(ordersRes.status, 200);
      assert(ordersRes.body.orders.length > 0);

      const addressRes = await request("GET", "/api/users/addresses", null, reToken);
      assert.strictEqual(addressRes.status, 200);
      assert(addressRes.body.addresses.length > 0);
    });

    console.log("==================================================");
    console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("==================================================\n");

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error("Test execution failed:", err);
    process.exit(1);
  } finally {
    server.close();
  }
});

