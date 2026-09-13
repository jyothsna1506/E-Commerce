# Shop Express - Full-Stack E-Commerce Web Application

A full-stack, responsive e-commerce web platform built with a modular Node.js & Express REST API backend and a responsive Vanilla JavaScript frontend. Features catalog browsing, category filtering, live search, variant tracking, role-based guest access control, JWT-based user authentication, persistent shopping cart & wishlist, coupon system, simulated multi-method checkout, and real-time order tracking.

Repository: **[https://github.com/jyothsna1506/E-Commerce](https://github.com/jyothsna1506/E-Commerce)**

---

## 🏗️ Architecture Overview

Shop Express follows a clean architectural separation between frontend presentation and backend services:

```text
┌─────────────────────────────────────────────────────────────┐
│                 Frontend (Vanilla ES6+ SPA)                 │
│   • Semantic HTML5 + Responsive CSS3 Variables & Tailwind   │
│   • Client Hash Routing (#products, #cart, #checkout, etc.) │
│   • Dynamic DOM Rendering, Modal Dialogs & Toast Feedback   │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON / HTTP (REST API)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Backend (Node.js & Express)                 │
│   • Modular Architecture: Controllers, Routes, Middleware   │
│   • JWT Auth Verification & User Ownership Access Control   │
│   • In-Memory Storage Fallback + MongoDB Mongoose Layer     │
│   • Static File Hosting for Frontend SPA                    │
└─────────────────────────────────────────────────────────────┘
```

The Express server acts as both the static file host (serving the SPA from `/frontend`) and the REST API gateway under `/api`. For database storage, it connects to MongoDB via Mongoose with a seamless in-memory repository fallback, enabling immediate zero-configuration local execution and testing.

---

## 🚀 Key Features

- **60-Product Catalog Across 6 Departments**: 10 products per category with realistic pricing, discounts, high-resolution imagery, stock limits, and user reviews.
- **Product Variant Selection**: Clothing items support real apparel sizes (`XS`, `S`, `M`, `L`, `XL`, `XXL`); footwear supports footwear sizes (`6` to `11`); non-sized goods automatically omit variant pickers.
- **Instant Search & Filtering**: Real-time multi-attribute search across title, brand, description, tags, and category, paired with multi-criteria sorting (Price Low-to-High, Price High-to-Low, Highest Rated, Newest).
- **Product Details Quick-View Modal**: View product galleries, brand info, stock status, ratings, reviews count, quantity selectors, and related recommendations.
- **Interactive Verified Reviews & Rating System**: Authenticated customers who have purchased a product can submit 1–5 star ratings and reviews (`POST /api/products/:id/reviews`). Enforces verified-purchaser access control, prevents duplicate reviews, and dynamically recalculates catalog average ratings and review counts.
- **Enforced Authentication & Access Control**:
  - **Guests**: Freely browse catalog, search, filter, sort, and inspect product details.
  - **Protected Actions**: Adding to cart, viewing cart, toggling wishlist, checking out, placing orders, making payments, and accessing order history strictly require authentication.
  - **Contextual Auth Modal & Action Resumption**: Clicking "Add to Cart" or "Checkout" as a guest opens a sign-in modal explaining the requirement. Upon signing in, the pending action is automatically resumed and executed without losing context.
- **Persistent Shopping Cart & Wishlist**: Real-time quantity adjustments, stock availability enforcement, item removal, and subtotal calculation.
- **Coupon Discount System**: Validates promo codes (e.g., `SAVE10` for 10% off, `SAVE20` for 20% off, `SHOPEXPRESS` for 15% off) with dynamic discount recalculation.
- **Simulated Checkout & Payment Flow**: Multi-method checkout supporting Credit/Debit Cards, UPI apps (Google Pay, PhonePe, Paytm, BHIM), and Cash on Delivery (COD) with shipping address auto-save.
- **Order Lifecycle & Tracking**: Real-time order status tracking (`Processing` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`) with user-isolated order cancellation.
- **Dark / Light Theme Toggle**: Persistent user theme preference stored in localStorage.
- **Explainable Recommendations**: Rule-based scoring engine suggesting products based on category affinity, user preferences, and item ratings.

---

## 📁 Project Structure

```text
E-Commerce-main/
├── frontend/
│   ├── index.html         # Single Page Application HTML markup
│   ├── style.css          # Theme variables, layouts, badges & animations
│   └── script.js          # Catalog state, routing, DOM rendering & API calls
│
├── backend/
│   ├── config/
│   │   └── db.js          # MongoDB connection handler with fallback logging
│   ├── controllers/
│   │   ├── authController.js           # Registration, login, Google & Phone OTP
│   │   ├── productController.js        # Catalog retrieval, filtering, pagination
│   │   ├── userController.js           # Profile, preferences & activity tracking
│   │   ├── cartController.js           # Cart endpoints & variant binding
│   │   ├── wishlistController.js       # Wishlist toggle & retrieval
│   │   ├── orderController.js          # Order creation, history & cancellation
│   │   └── recommendationController.js # Recommendations endpoint
│   ├── models/
│   │   ├── Product.js     # Schema for catalog products & variants
│   │   ├── User.js        # Schema for credentials, preferences & cart
│   │   └── Order.js       # Schema for orders, items & tracking history
│   ├── middleware/
│   │   ├── auth.js        # JWT protect & optionalAuth middleware
│   │   ├── validate.js    # Request body input validation
│   │   └── error.js       # Centralized Express error handler
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── orderRoutes.js
│   │   └── recommendationRoutes.js
│   ├── services/
│   │   ├── recommendationService.js # Rule-based scoring engine
│   │   └── storageService.js        # In-memory repository fallback
│   ├── scripts/
│   │   └── seed.js        # MongoDB catalog seed script
│   └── server.js          # Express app entry point & static file server
│
├── .env.example           # Template for environment variables
├── .gitignore             # Git ignore configuration
├── package.json           # Project manifest & npm scripts
├── test_backend.js        # Automated backend integration test suite (31 tests)
└── README.md              # Project documentation
```

---

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3 Custom Properties, Modern JavaScript (ES6+), Tailwind CSS utilities.
- **Backend Runtime & Framework**: Node.js, Express.js.
- **Authentication & Security**: JSON Web Tokens (`jsonwebtoken`), password hashing with `bcryptjs`, CORS middleware (`cors`).
- **Database & ODM**: MongoDB with `mongoose`, backed by an active in-memory repository fallback (`storageService.js`) for zero-dependency local execution.
- **Configuration**: `dotenv`.
- **Testing**: Node.js built-in `assert` test runner for automated integration testing.

---

## 📦 Catalog & Product Representation

The application includes 60 fully populated products with high-quality imagery across 6 distinct departments:

| Department | Item Count | Example Products | Variants |
| :--- | :---: | :--- | :--- |
| **Fashion** | 10 | Crewneck T-Shirt, Slim Denim Jeans, Bomber Jacket | Apparel Sizes: `XS`–`XXL`, Shoe Sizes: `6`–`11` |
| **Electronics** | 10 | Noise-Canceling Headphones, 4K Smart TV, Gaming Mouse | Standard / Device specifications |
| **Home & Kitchen** | 10 | Non-Stick Cookware, Air Fryer, Ceramic Mug Set | Standard |
| **Sports & Outdoors** | 10 | Yoga Mat, Adjustable Dumbbells, Hydration Bottle | Standard |
| **Books** | 10 | Atomic Habits, Clean Code, The Psychology of Money | Paperback / Standard |
| **Beauty & Personal Care** | 10 | Vitamin C Serum, Sunscreen Gel, Matte Lipstick | Standard |

---

## 🔐 Authentication & Access Control

### Application Entry Flow & Landing Screen
- **Initial Welcome Screen**: When an unauthenticated user opens the application, the full shopping interface (catalog, search bar, store controls, cart, wishlist, orders) is hidden. Instead, a dedicated Welcome / Authentication Landing Screen greets the visitor with Shop Express branding, value propositions, and authentication portals.
- **Continue as Guest (Browse Catalog)**: Visitors can click the prominent "Continue as Guest" button on the hero banner or authentication card to enter Guest Browsing Mode. This reveals the full catalog and shopping controls, while maintaining all strict access-control protections on cart, wishlist, orders, and checkout.
- **Authenticated Experience**: Upon signing in or registering, users enter the full shopping storefront. The navigation header displays the user's name, profile avatar initial, and a one-click Sign Out button.
- **Logout Behavior**: Signing out completely resets the active session, removes guest mode flags, and immediately returns to the Welcome / Authentication Landing Screen.

### Guest Experience
- Unauthenticated visitors in Guest Mode can browse all 60 catalog items, use live search, filter by department, sort, and open the product quick-view modal.
- Protected actions (Adding to cart, viewing cart, toggling wishlist, checking out, placing orders, making payments, and viewing order history) are gated.
- Triggering any protected action displays a sign-in modal with a contextual banner explaining why authentication is needed.

### Supported Authentication Modes & Personalization
1. **Email & Password**: Standard sign-up and sign-in with password hashing (`bcryptjs`) and confirm password validation.
2. **Mobile Number Login**: Sign in using a 10-digit phone number and password.
3. **Registration Personalization**: Account registration collects full name, email, phone, password, confirm password, age range (`under-18`, `18-24`, `25-34`, `35-44`, `45-54`, `55+`), optional gender (`male`, `female`, `other`, `prefer-not-to-say`), preferred product categories, clothing size, and shoe size. These preferences feed directly into the personalized recommendations engine.
4. **One-Click Demo Account**: Quick-fill button for evaluation (`alex@example.com` / `password123`).
5. **Google Sign-In Simulation**: Modal with profile selection and custom Google account input (`POST /api/auth/google`).
6. **Phone OTP Verification**: 2-step verification code flow (`POST /api/auth/phone-login`, Demo OTP: `123456`).

### Action Restoration
When an unauthenticated guest clicks **Add to Cart** on a product card or modal, the selected product ID, quantity, and variant are preserved in memory. Immediately upon successful sign-in, the system completes the pending action, adds the item to the cart, and displays a confirmation toast.

---

## ⚙️ Environment Configuration

Copy `.env.example` to create your local `.env` file if custom configurations are needed:

```bash
cp .env.example .env
```

### Required / Supported Variables

| Variable | Default | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port where Express listens for HTTP requests. |
| `NODE_ENV` | `development` | Environment mode (`development` or `production`). |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/shop_express` | MongoDB connection URI. If offline, the app seamlessly runs on its built-in in-memory fallback. |
| `JWT_SECRET` | *(Preconfigured default secret)* | Secret key used to sign and verify JSON Web Tokens. |
| `JWT_EXPIRES_IN`| `7d` | Token validity duration. |

---

## 💻 How to Run Locally

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- *(Optional)* A running **MongoDB** instance (not required; in-memory fallback activates automatically if unavailable)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```
The server will boot on port `5000`:
- **Web Storefront**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

### 4. Development Mode (Optional)
Run with automatic file watching:
```bash
npm run dev
```

### 5. Seed MongoDB (Optional)
If running a dedicated local MongoDB instance and wishing to populate the 60 catalog items into the database:
```bash
npm run seed
```

### 6. Run Automated Tests
Execute the comprehensive integration test suite (37 tests covering health, auth, catalog, reviews, cart, wishlist, orders, and security permissions):
```bash
npm test
```

---

## 📜 License

This project is licensed under the [MIT License](package.json).
