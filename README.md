# Shop Express - Full-Stack E-Commerce Web Application

A full-stack, responsive authentication-first e-commerce web platform built with a modular Node.js & Express REST API backend and a responsive Vanilla JavaScript frontend. Features catalog browsing, category filtering, live search, variant tracking, JWT-based user authentication & access control, persistent shopping cart & wishlist, coupon system, simulated multi-method checkout, and real-time order tracking.

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
- **Advanced Storefront Filters**: Multi-criteria catalog filtering supporting price range bounds (min & max price), minimum customer star ratings (4.5★+, 4.0★+, 3.5★+, 3.0★+), and stock availability toggle ("In Stock Only"), accompanied by responsive filter chips, individual chip removal, and instant reset controls seamlessly combined with search and category tabs.
- **Interactive Verified Reviews & Rating System**: Authenticated customers who have purchased a product can submit 1–5 star ratings and reviews (`POST /api/products/:id/reviews`). Enforces verified-purchaser access control, prevents duplicate reviews, and dynamically recalculates catalog average ratings and review counts.
- **Authentication-First Access Control**:
  - **Welcome & Auth Entry**: Unauthenticated visitors are presented with a branded entrance screen offering Sign In, Create Account, Google login, and Phone OTP verification. Anonymous guest browsing is completely eliminated.
  - **Full Storefront Access for Authenticated Users**: Catalog browsing, search, category/price/rating filters, product quick-view modals, cart, wishlist, checkout, address book, reviews, and package tracking are exclusively available once authenticated.
- **Persistent Shopping Cart & Wishlist**: Real-time quantity adjustments, stock availability enforcement, item removal, and subtotal calculation.
- **Coupon Discount System**: Validates promo codes (e.g., `SAVE10` for 10% off, `SAVE20` for 20% off, `SHOPEXPRESS` for 15% off) with dynamic discount recalculation.
- **Simulated Checkout & Payment Flow**: Multi-method checkout supporting Credit/Debit Cards, UPI apps (Google Pay, PhonePe, Paytm, BHIM), and Cash on Delivery (COD) with shipping address auto-save.
- **Dynamic Order Tracking & Delivery Estimation**: Real-time 4-stage tracking lifecycle (`Placed` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`) backed by `GET /api/orders/:id/tracking`, sequential transition simulation (`PUT /api/orders/:id/progress`), persistent deterministic delivery dates, carrier logistics metadata, and transition timestamps.
- **Saved Address Book & Multi-Address Checkout**: Authenticated users can store and manage structured delivery addresses (`Home`, `Work`, `Other`) via full CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE` at `/api/users/addresses`, and dedicated `PUT /api/users/addresses/:addressId/default`).
- **Strict Default Address Guarantee**: Exactly one default address is maintained per user. The first added address automatically becomes default; selecting any address as default unsets previous defaults; deleting the default promotes the next remaining address to default.
- **Interactive Checkout Address Picker**: Authenticated checkout displays saved addresses as selectable cards with radio buttons; the default address is automatically pre-selected and populates the shipping form fields; supports seamlessly switching to "+ Enter a different address manually" or creating new addresses directly within checkout.
- **Immutable Order Address Snapshot Safety**: Every placed order preserves an independent, immutable snapshot of the shipping address at time of purchase. Subsequent updates or deletions in the user's address book never affect past orders or tax invoices.
- **Strict Tenant Isolation & Security**: Address mutations strictly scope queries within the authenticated user's session (`User.addresses`). Cross-user address access, updates, or deletions are strictly rejected.
- **Tax Invoice & Receipt Generation**: Complete customer invoices (`GET /api/orders/:id/invoice`) with GST breakdown, itemized line totals, discounts, shipping, seller GSTIN information, and clean, print-optimized stylesheet (`window.print()`).
- **Strict Order Ownership & Security Protection**: Orders, tracking events, and invoices are strictly isolated per user account. Cross-user access (e.g. User B requesting User A's tracking or invoice) is strictly blocked with `403 Forbidden`.
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
├── test_backend.js        # Automated backend integration test suite (66 tests)
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

### Application Entry Flow & Welcome Screen
- **Initial Welcome Screen**: When an unauthenticated user opens the application, the full shopping interface (catalog, search bar, store controls, cart, wishlist, orders) is hidden. Instead, a dedicated Welcome / Authentication Screen greets the visitor with Shop Express branding, core value highlights, and authentication portals.
- **Authentication-First Architecture**: Anonymous guest browsing is removed. Visitors must sign in or register to enter the shopping storefront.
- **Authenticated Experience**: Upon signing in or registering, users enter the full shopping storefront. The navigation header displays the user's name, profile avatar initial, store controls (Cart, Wishlist, Orders), and a one-click Sign Out button.
- **Logout Behavior**: Signing out completely resets the active session, clears credentials from memory/storage, and immediately returns to the Welcome / Authentication Screen.

### Supported Authentication Modes & Personalization
1. **Email & Password**: Standard sign-up and sign-in with password hashing (`bcryptjs`) and confirm password validation.
2. **Mobile Number Login**: Sign in using a 10-digit phone number and password.
3. **Registration Personalization**: Account registration collects full name, email, phone, password, confirm password, age range (`under-18`, `18-24`, `25-34`, `35-44`, `45-54`, `55+`), optional gender (`male`, `female`, `other`, `prefer-not-to-say`), preferred product categories, clothing size, and shoe size. These preferences feed directly into the personalized recommendations engine.
4. **One-Click Demo Account**: Quick-fill button for evaluation (`alex@example.com` / `password123`).
5. **Google Sign-In Simulation**: Modal with profile selection and custom Google account input (`POST /api/auth/google`).
6. **Phone OTP Verification**: 2-step verification code flow (`POST /api/auth/phone-login`, Demo OTP: `123456`).

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
Execute the comprehensive integration test suite (66 tests covering health, auth, catalog, filters, reviews, cart, wishlist, orders, dynamic tracking, delivery estimates, invoice data, saved address book, strict default rules, and security permissions):
```bash
npm test
```

---

## 📜 License

This project is licensed under the [MIT License](package.json).
