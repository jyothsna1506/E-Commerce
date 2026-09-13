const defaultConfig = {
  site_name: "Shop Express",
  tagline: "Your one-stop shop for everything",
  section_title: "Featured Products",
  cart_title: "Shopping Cart",
  checkout_button_text: "Proceed to Checkout",
  payment_title: "Checkout & Payment",
  all_category: "All Products",
  primary_color: "#232f3e",
  accent_color: "#ff9900",
  button_color: "#febd69",
  background_color: "#f5f5f5",
  card_color: "#ffffff"
};

// 60 Realistic Products Across 6 Categories (10 products per category)
const products = [
  // Fashion (10)
  { 
    id: 1, 
    name: "Classic Cotton Crewneck T-Shirt", 
    brand: "Roadster",
    category: "fashion", 
    subcategory: "T-Shirts",
    description: "100% combed ring-spun breathable cotton casual crewneck t-shirt with reinforced double-stitched seams.",
    price: 599, 
    originalPrice: 999,
    discount: 40,
    rating: 4.5, 
    reviews: 320, 
    reviewCount: 320,
    stock: 40,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80", 
    tags: ["tshirt", "cotton", "casual", "topwear", "fashion", "crewneck"],
    variants: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 2, 
    name: "Slim-Fit Stretch Denim Jeans", 
    brand: "Levi's",
    category: "fashion", 
    subcategory: "Jeans",
    description: "Classic medium-wash 5-pocket denim jeans tailored in flexible stretch fabric for maximum movement.",
    price: 1899, 
    originalPrice: 2999,
    discount: 37,
    rating: 4.6, 
    reviews: 284, 
    reviewCount: 284,
    stock: 25,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80", 
    tags: ["jeans", "denim", "pants", "bottomwear", "fashion", "slim-fit"],
    variants: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 3, 
    name: "Casual Lightweight Bomber Jacket", 
    brand: "Zara",
    category: "fashion", 
    subcategory: "Jackets",
    description: "Water-resistant windbreaker bomber jacket featuring ribbed collar, secure zip pockets, and satin lining.",
    price: 2499, 
    originalPrice: 3999,
    discount: 38,
    rating: 4.7, 
    reviews: 195, 
    reviewCount: 195,
    stock: 18,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80", 
    tags: ["jacket", "bomber", "outerwear", "winterwear", "fashion", "casual"],
    variants: ["S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 4, 
    name: "Breathable Pro Running Shoes", 
    brand: "Nike",
    category: "fashion", 
    subcategory: "Footwear",
    description: "Lightweight engineered mesh running shoes with responsive foam cushioning and high-traction rubber outsole.",
    price: 3499, 
    originalPrice: 4999,
    discount: 30,
    rating: 4.8, 
    reviews: 450, 
    reviewCount: 450,
    stock: 20,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", 
    tags: ["shoes", "sneakers", "running", "footwear", "fashion", "sports"],
    variants: ["6", "7", "8", "9", "10", "11"]
  },
  { 
    id: 5, 
    name: "Classic Leather White Sneakers", 
    brand: "Adidas",
    category: "fashion", 
    subcategory: "Footwear",
    description: "Timeless low-top white sneakers handcrafted in premium synthetic leather with padded collar.",
    price: 2799, 
    originalPrice: 3999,
    discount: 30,
    rating: 4.7, 
    reviews: 312, 
    reviewCount: 312,
    stock: 22,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80", 
    tags: ["sneakers", "shoes", "white shoes", "footwear", "fashion", "casual"],
    variants: ["6", "7", "8", "9", "10", "11"]
  },
  { 
    id: 6, 
    name: "Polarized Wayfarer Sunglasses", 
    brand: "Ray-Ban",
    category: "fashion", 
    subcategory: "Accessories",
    description: "UV400 protective polarized lenses in a lightweight tortoiseshell frame offering crystal-clear glare reduction.",
    price: 1299, 
    originalPrice: 2199,
    discount: 41,
    rating: 4.4, 
    reviews: 168, 
    reviewCount: 168,
    stock: 30,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80", 
    tags: ["sunglasses", "eyewear", "accessories", "fashion", "polarized", "summer"],
    variants: null
  },
  { 
    id: 7, 
    name: "Minimalist Leather Wristwatch", 
    brand: "Fossil",
    category: "fashion", 
    subcategory: "Watches",
    description: "Japanese quartz movement watch with genuine brown leather strap and scratch-resistant mineral glass.",
    price: 3199, 
    originalPrice: 4999,
    discount: 36,
    rating: 4.6, 
    reviews: 220, 
    reviewCount: 220,
    stock: 14,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&q=80", 
    tags: ["watch", "leather watch", "analog", "accessories", "fashion"],
    variants: null
  },
  { 
    id: 8, 
    name: "Casual Oxford Cotton Shirt", 
    brand: "Tommy Hilfiger",
    category: "fashion", 
    subcategory: "Shirts",
    description: "Button-down long sleeve casual Oxford cotton shirt with curved hemline and chest patch pocket.",
    price: 1499, 
    originalPrice: 2499,
    discount: 40,
    rating: 4.5, 
    reviews: 185, 
    reviewCount: 185,
    stock: 28,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80", 
    tags: ["shirt", "oxford", "formal", "casual", "topwear", "fashion"],
    variants: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 9, 
    name: "Fleece Pullover Hoodie", 
    brand: "Puma",
    category: "fashion", 
    subcategory: "Hoodies",
    description: "Cozy brushed fleece hoodie with adjustable drawstring hood, kangaroo front pocket, and ribbed cuffs.",
    price: 1699, 
    originalPrice: 2799,
    discount: 39,
    rating: 4.7, 
    reviews: 270, 
    reviewCount: 270,
    stock: 24,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80", 
    tags: ["hoodie", "pullover", "winterwear", "topwear", "fashion", "fleece"],
    variants: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  { 
    id: 10, 
    name: "Genuine Leather Bifold Wallet", 
    brand: "Woodland",
    category: "fashion", 
    subcategory: "Accessories",
    description: "Handmade full-grain leather wallet with RFID blocking layer, 8 card slots, and dual currency compartments.",
    price: 799, 
    originalPrice: 1499,
    discount: 47,
    rating: 4.4, 
    reviews: 198, 
    reviewCount: 198,
    stock: 35,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80", 
    tags: ["wallet", "leather", "accessories", "rfid", "fashion"],
    variants: null
  },

  // Electronics (10)
  { 
    id: 11, 
    name: "Wireless Over-Ear Noise-Cancelling Headphones", 
    brand: "Sony",
    category: "electronics", 
    subcategory: "Audio",
    description: "Active noise cancellation (ANC), custom 40mm drivers, 30-hour battery life, and plush memory-foam earcups.",
    price: 4999, 
    originalPrice: 7999,
    discount: 38,
    rating: 4.8, 
    reviews: 520, 
    reviewCount: 520,
    stock: 15,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", 
    tags: ["headphones", "audio", "wireless", "bluetooth", "anc", "electronics"],
    variants: null
  },
  { 
    id: 12, 
    name: "Smartwatch GPS Fitness Tracker", 
    brand: "Apple",
    category: "electronics", 
    subcategory: "Wearables",
    description: "Always-on Retina OLED display, SpO2 blood oxygen sensor, heart rate tracking, and 50m water resistance.",
    price: 8999, 
    originalPrice: 12999,
    discount: 31,
    rating: 4.8, 
    reviews: 410, 
    reviewCount: 410,
    stock: 12,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", 
    tags: ["smartwatch", "fitness", "wearables", "gps", "electronics"],
    variants: null
  },
  { 
    id: 13, 
    name: "4K Ultra HD Action Camera", 
    brand: "GoPro",
    category: "electronics", 
    subcategory: "Cameras",
    description: "Capture crystal-clear 4K video at 60fps with electronic image stabilization and waterproof casing up to 30 meters.",
    price: 5999, 
    originalPrice: 9499,
    discount: 37,
    rating: 4.6, 
    reviews: 230, 
    reviewCount: 230,
    stock: 10,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80", 
    tags: ["camera", "action camera", "4k", "video", "electronics", "sports"],
    variants: null
  },
  { 
    id: 14, 
    name: "Shockproof Slim Phone Case", 
    brand: "Spigen",
    category: "electronics", 
    subcategory: "Mobile Accessories",
    description: "Military-grade drop protection with air-cushion corners, raised camera bezel, and matte anti-slip grip.",
    price: 499, 
    originalPrice: 899,
    discount: 44,
    rating: 4.5, 
    reviews: 310, 
    reviewCount: 310,
    stock: 50,
    image: "https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp", 
    tags: ["phone case", "mobile accessories", "cover", "shockproof", "electronics"],
    variants: null
  },
  { 
    id: 15, 
    name: "Ergonomic Wireless Optical Mouse", 
    brand: "Logitech",
    category: "electronics", 
    subcategory: "Computer Accessories",
    description: "Precision 2.4GHz wireless tracking, contoured rubber side grips, silent click buttons, and 18-month battery life.",
    price: 799, 
    originalPrice: 1299,
    discount: 38,
    rating: 4.6, 
    reviews: 245, 
    reviewCount: 245,
    stock: 26,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80", 
    tags: ["mouse", "wireless mouse", "computer accessories", "peripherals", "electronics"],
    variants: null
  },
  { 
    id: 16, 
    name: "Fast Charging Braided USB-C Cable (2m)", 
    brand: "Anker",
    category: "electronics", 
    subcategory: "Cables",
    description: "Heavy-duty double-braided nylon jacket with 60W power delivery support and 10,000+ bend lifespan.",
    price: 349, 
    originalPrice: 699,
    discount: 50,
    rating: 4.4, 
    reviews: 180, 
    reviewCount: 180,
    stock: 60,
    image: "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp", 
    tags: ["cable", "usb-c", "fast charging", "charger", "electronics"],
    variants: null
  },
  { 
    id: 17, 
    name: "RGB Mechanical Gaming Keyboard", 
    brand: "Razer",
    category: "electronics", 
    subcategory: "Gaming Accessories",
    description: "Tactile blue switches with 50-million keystroke durability, per-key RGB backlighting, and magnetic wrist rest.",
    price: 3299, 
    originalPrice: 5499,
    discount: 40,
    rating: 4.7, 
    reviews: 340, 
    reviewCount: 340,
    stock: 16,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80", 
    tags: ["keyboard", "mechanical keyboard", "gaming", "rgb", "electronics"],
    variants: null
  },
  { 
    id: 18, 
    name: "True Wireless Earbuds with ANC", 
    brand: "JBL",
    category: "electronics", 
    subcategory: "Audio",
    description: "Dual microphone noise cancellation, IPX5 water resistance, touch controls, and compact wireless charging case.",
    price: 2999, 
    originalPrice: 4999,
    discount: 40,
    rating: 4.6, 
    reviews: 290, 
    reviewCount: 290,
    stock: 22,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80", 
    tags: ["earbuds", "audio", "wireless", "bluetooth", "tws", "electronics"],
    variants: null
  },
  { 
    id: 19, 
    name: "10000mAh Ultra-Slim Power Bank", 
    brand: "Mi",
    category: "electronics", 
    subcategory: "Mobile Accessories",
    description: "Dual USB output with 22.5W two-way fast charging, aluminum alloy metal shell, and smart multi-protection chip.",
    price: 1199, 
    originalPrice: 1999,
    discount: 40,
    rating: 4.5, 
    reviews: 375, 
    reviewCount: 375,
    stock: 35,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80", 
    tags: ["power bank", "battery", "fast charge", "mobile accessories", "electronics"],
    variants: null
  },
  { 
    id: 20, 
    name: "Portable Bluetooth Speaker Waterproof", 
    brand: "Boat",
    category: "electronics", 
    subcategory: "Audio",
    description: "Rugged IPX7 waterproof speaker delivering 14W stereo sound, deep bass radiators, and 12-hour continuous battery.",
    price: 1799, 
    originalPrice: 2999,
    discount: 40,
    rating: 4.5, 
    reviews: 310, 
    reviewCount: 310,
    stock: 25,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80", 
    tags: ["speaker", "bluetooth", "audio", "waterproof", "electronics"],
    variants: null
  },

  // Home & Kitchen (10)
  { 
    id: 21, 
    name: "Stainless Steel Espresso Machine", 
    brand: "De'Longhi",
    category: "home", 
    subcategory: "Kitchen Appliances",
    description: "15-bar professional pressure pump, manual milk frother steam wand, and compact brushed stainless steel chassis.",
    price: 7499, 
    originalPrice: 11999,
    discount: 38,
    rating: 4.7, 
    reviews: 180, 
    reviewCount: 180,
    stock: 9,
    image: "https://images.unsplash.com/photo-1608354580875-30bd4168b351?w=600&q=80", 
    tags: ["espresso", "coffee machine", "kitchen appliances", "home", "coffee"],
    variants: null
  },
  { 
    id: 22, 
    name: "Non-Stick Ceramic Cookware 5-Piece Set", 
    brand: "Prestige",
    category: "home", 
    subcategory: "Cookware",
    description: "PTFE/PFOA-free non-toxic ceramic coating with stay-cool silicone handles and induction-compatible bases.",
    price: 3299, 
    originalPrice: 5499,
    discount: 40,
    rating: 4.6, 
    reviews: 220, 
    reviewCount: 220,
    stock: 14,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&q=80", 
    tags: ["cookware", "pots and pans", "non-stick", "kitchen", "home"],
    variants: null
  },
  { 
    id: 23, 
    name: "High-Speed Countertop Blender", 
    brand: "Philips",
    category: "home", 
    subcategory: "Kitchen Appliances",
    description: "1200W motor with 6-leaf stainless steel crushing blades, 2L BPA-free tritan jar, and variable speed dials.",
    price: 2699, 
    originalPrice: 4299,
    discount: 37,
    rating: 4.5, 
    reviews: 195, 
    reviewCount: 195,
    stock: 18,
    image: "https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/thumbnail.webp", 
    tags: ["blender", "mixer", "kitchen appliances", "smoothies", "home"],
    variants: null
  },
  { 
    id: 24, 
    name: "16-Piece Porcelain Dinnerware Set", 
    brand: "Corelle",
    category: "home", 
    subcategory: "Dining",
    description: "Chip-resistant microwave and dishwasher safe porcelain set featuring 4 dinner plates, 4 salad plates, and bowls.",
    price: 2199, 
    originalPrice: 3499,
    discount: 37,
    rating: 4.6, 
    reviews: 165, 
    reviewCount: 165,
    stock: 15,
    image: "https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp", 
    tags: ["dinnerware", "plates", "porcelain", "dining", "home"],
    variants: null
  },
  { 
    id: 25, 
    name: "100% Organic Cotton Bed Sheet Set", 
    brand: "Spaces",
    category: "home", 
    subcategory: "Bedding",
    description: "400 thread-count sateen weave organic cotton fitted sheet, flat sheet, and matching pillowcases.",
    price: 1599, 
    originalPrice: 2799,
    discount: 43,
    rating: 4.6, 
    reviews: 240, 
    reviewCount: 240,
    stock: 22,
    image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp", 
    tags: ["bedsheet", "bedding", "cotton", "linen", "bedroom", "home"],
    variants: ["Single", "Queen", "King"]
  },
  { 
    id: 26, 
    name: "Ergonomic Memory Foam Pillow", 
    brand: "Wakefit",
    category: "home", 
    subcategory: "Bedding",
    description: "Contoured cervical orthopedic memory foam pillow with breathable bamboo fiber removable cover.",
    price: 899, 
    originalPrice: 1599,
    discount: 44,
    rating: 4.5, 
    reviews: 310, 
    reviewCount: 310,
    stock: 28,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&q=80", 
    tags: ["pillow", "memory foam", "bedding", "orthopedic", "home"],
    variants: null
  },
  { 
    id: 27, 
    name: "Stainless Steel Electric Kettle 1.8L", 
    brand: "Pigeon",
    category: "home", 
    subcategory: "Kitchen Appliances",
    description: "Fast-boiling 1500W cordless electric kettle with auto shut-off, boil-dry protection, and 360-degree swivel base.",
    price: 749, 
    originalPrice: 1299,
    discount: 42,
    rating: 4.4, 
    reviews: 420, 
    reviewCount: 420,
    stock: 35,
    image: "https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/thumbnail.webp", 
    tags: ["kettle", "electric kettle", "kitchen appliances", "home"],
    variants: null
  },
  { 
    id: 28, 
    name: "Aroma Diffuser & Essential Oil Humidifier", 
    brand: "PureMist",
    category: "home", 
    subcategory: "Home Decor",
    description: "Ultrasonic cool mist humidifier with 7 soothing ambient LED light modes and whisper-quiet operation.",
    price: 999, 
    originalPrice: 1799,
    discount: 44,
    rating: 4.5, 
    reviews: 188, 
    reviewCount: 188,
    stock: 24,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80", 
    tags: ["diffuser", "humidifier", "aromatherapy", "home decor", "home"],
    variants: null
  },
  { 
    id: 29, 
    name: "Modern Ceramic Flower Vase", 
    brand: "Home Centre",
    category: "home", 
    subcategory: "Home Decor",
    description: "Handcrafted matte textured ceramic vase with minimalist geometric silhouette suited for dried or fresh florals.",
    price: 699, 
    originalPrice: 1199,
    discount: 42,
    rating: 4.4, 
    reviews: 125, 
    reviewCount: 125,
    stock: 30,
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&q=80", 
    tags: ["vase", "ceramic", "home decor", "flowers", "home"],
    variants: null
  },
  { 
    id: 30, 
    name: "Chef Damascus Steel Kitchen Knife (8-inch)", 
    brand: "Wüsthof",
    category: "home", 
    subcategory: "Cutlery",
    description: "High-carbon 67-layer Damascus steel blade with razor-sharp 15-degree edge and ergonomic Pakkawood handle.",
    price: 1499, 
    originalPrice: 2499,
    discount: 40,
    rating: 4.7, 
    reviews: 145, 
    reviewCount: 145,
    stock: 17,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80", 
    tags: ["knife", "chef knife", "cutlery", "kitchen", "cookware", "home"],
    variants: null
  },

  // Sports (10)
  { 
    id: 31, 
    name: "Adjustable Dumbbell Set (5-50 lbs)", 
    brand: "Bowflex",
    category: "sports", 
    subcategory: "Fitness Equipment",
    description: "Rapid weight adjustment dial replacing 15 sets of weights in a compact space-saving home workout station.",
    price: 4999, 
    originalPrice: 8999,
    discount: 44,
    rating: 4.8, 
    reviews: 310, 
    reviewCount: 310,
    stock: 11,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80", 
    tags: ["dumbbells", "weights", "fitness", "gym", "workout", "sports"],
    variants: null
  },
  { 
    id: 32, 
    name: "Non-Slip Extra-Thick Yoga Mat (6mm)", 
    brand: "Lululemon",
    category: "sports", 
    subcategory: "Yoga & Pilates",
    description: "Eco-friendly TPE high-density cushioned mat with laser-engraved alignment lines and anti-tear mesh.",
    price: 999, 
    originalPrice: 1799,
    discount: 44,
    rating: 4.7, 
    reviews: 415, 
    reviewCount: 415,
    stock: 28,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80", 
    tags: ["yoga mat", "exercise", "pilates", "fitness", "sports"],
    variants: null
  },
  { 
    id: 33, 
    name: "English Willow Cricket Bat", 
    brand: "SS Ton",
    category: "sports", 
    subcategory: "Cricket",
    description: "Grade 1 English willow hand-crafted with thick contoured edges, concave profile, and multi-piece cane handle.",
    price: 3999, 
    originalPrice: 6499,
    discount: 38,
    rating: 4.7, 
    reviews: 260, 
    reviewCount: 260,
    stock: 15,
    image: "https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp", 
    tags: ["cricket", "bat", "cricket bat", "sports", "willow"],
    variants: null
  },
  { 
    id: 34, 
    name: "Official Size 5 Match Football", 
    brand: "Mitre",
    category: "sports", 
    subcategory: "Football",
    description: "Thermally bonded seamless surface with reinforced butyl bladder for optimal air retention and true flight trajectory.",
    price: 899, 
    originalPrice: 1599,
    discount: 44,
    rating: 4.6, 
    reviews: 340, 
    reviewCount: 340,
    stock: 30,
    image: "https://cdn.dummyjson.com/product-images/sports-accessories/football/thumbnail.webp", 
    tags: ["football", "soccer", "ball", "sports", "match ball"],
    variants: null
  },
  { 
    id: 35, 
    name: "Professional Badminton Racket Set", 
    brand: "Yonex",
    category: "sports", 
    subcategory: "Racket Sports",
    description: "Full carbon graphite frame engineered with isometric head shape, includes 2 rackets and nylon shuttlecocks.",
    price: 1699, 
    originalPrice: 2799,
    discount: 39,
    rating: 4.6, 
    reviews: 280, 
    reviewCount: 280,
    stock: 20,
    image: "https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp", 
    tags: ["badminton", "racket", "shuttlecock", "sports", "tennis"],
    variants: null
  },
  { 
    id: 36, 
    name: "32 oz Insulated Stainless Sports Bottle", 
    brand: "Hydro Flask",
    category: "sports", 
    subcategory: "Hydration",
    description: "Double-wall vacuum insulation keeping drinks icy cold for 24 hours or steaming hot for 12 hours with leakproof straw lid.",
    price: 699, 
    originalPrice: 1199,
    discount: 42,
    rating: 4.7, 
    reviews: 390, 
    reviewCount: 390,
    stock: 45,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80", 
    tags: ["water bottle", "flask", "hydration", "sports", "gym"],
    variants: null
  },
  { 
    id: 37, 
    name: "Resistance Exercise Bands Set (5 Levels)", 
    brand: "CultSport",
    category: "sports", 
    subcategory: "Fitness Equipment",
    description: "100% natural latex loop bands ranging from X-Light to X-Heavy with carry pouch and workout manual.",
    price: 449, 
    originalPrice: 899,
    discount: 50,
    rating: 4.5, 
    reviews: 270, 
    reviewCount: 270,
    stock: 50,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80", 
    tags: ["resistance bands", "fitness", "workout", "gym", "sports"],
    variants: null
  },
  { 
    id: 38, 
    name: "Speed Skipping Jump Rope with Bearings", 
    brand: "Everlast",
    category: "sports", 
    subcategory: "Fitness Equipment",
    description: "360-degree ball bearing rotation with tangle-free steel wire cable and non-slip aluminum alloy handles.",
    price: 349, 
    originalPrice: 699,
    discount: 50,
    rating: 4.4, 
    reviews: 210, 
    reviewCount: 210,
    stock: 40,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80", 
    tags: ["jump rope", "skipping rope", "cardio", "fitness", "sports"],
    variants: null
  },
  { 
    id: 39, 
    name: "Waterproof Hiking Backpack 40L", 
    brand: "Wildcraft",
    category: "sports", 
    subcategory: "Outdoor & Hiking",
    description: "Ripstop nylon waterproof backpack with ergonomic ventilated back panel, rain cover, and trekking pole attachments.",
    price: 1899, 
    originalPrice: 3299,
    discount: 42,
    rating: 4.6, 
    reviews: 195, 
    reviewCount: 195,
    stock: 16,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80", 
    tags: ["backpack", "hiking", "trekking", "camping", "sports", "travel"],
    variants: null
  },
  { 
    id: 40, 
    name: "Cycling & Skateboard Safety Helmet", 
    brand: "Decathlon",
    category: "sports", 
    subcategory: "Cycling",
    description: "CPSC certified shock-absorbing EPS foam core with durable ABS outer shell, dial-fit system, and 12 cooling vents.",
    price: 1199, 
    originalPrice: 1999,
    discount: 40,
    rating: 4.5, 
    reviews: 155, 
    reviewCount: 155,
    stock: 22,
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80", 
    tags: ["helmet", "cycling", "safety", "sports", "skating"],
    variants: ["M", "L"]
  },

  // Books (10)
  { 
    id: 41, 
    name: "Atomic Habits by James Clear", 
    brand: "Penguin Random House",
    category: "books", 
    subcategory: "Self-Help",
    description: "An easy and proven way to build good habits and break bad ones using neuroscience and practical frameworks.",
    price: 499, 
    originalPrice: 799,
    discount: 38,
    rating: 4.9, 
    reviews: 980, 
    reviewCount: 980,
    stock: 35,
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", 
    tags: ["books", "habits", "self-help", "productivity", "non-fiction"],
    variants: null
  },
  { 
    id: 42, 
    name: "The Silent Patient by Alex Michaelides", 
    brand: "Celadon Books",
    category: "books", 
    subcategory: "Psychological Thriller",
    description: "A shocking psychological thriller of a woman's act of violence against her husband and the therapist obsessed with uncovering her motive.",
    price: 399, 
    originalPrice: 650,
    discount: 39,
    rating: 4.7, 
    reviews: 720, 
    reviewCount: 720,
    stock: 28,
    image: "https://covers.openlibrary.org/b/id/9407338-L.jpg", 
    tags: ["books", "thriller", "mystery", "fiction", "novel"],
    variants: null
  },
  { 
    id: 43, 
    name: "The Joy of Cooking by Irma S. Rombauer", 
    brand: "Scribner",
    category: "books", 
    subcategory: "Cookbooks",
    description: "The quintessential all-purpose American cookbook packed with over 4,000 tested kitchen-tested recipes and culinary fundamentals.",
    price: 899, 
    originalPrice: 1499,
    discount: 40,
    rating: 4.8, 
    reviews: 340, 
    reviewCount: 340,
    stock: 15,
    image: "https://covers.openlibrary.org/b/id/475157-L.jpg", 
    tags: ["books", "cookbook", "recipes", "cooking", "food"],
    variants: null
  },
  { 
    id: 44, 
    name: "Zero to One by Peter Thiel", 
    brand: "Crown Business",
    category: "books", 
    subcategory: "Business & Startups",
    description: "Notes on startups, building technology companies, and how to create breakthrough value in the modern economy.",
    price: 449, 
    originalPrice: 699,
    discount: 36,
    rating: 4.7, 
    reviews: 650, 
    reviewCount: 650,
    stock: 30,
    image: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg", 
    tags: ["books", "business", "startups", "technology", "entrepreneurship"],
    variants: null
  },
  { 
    id: 45, 
    name: "Bedtime Stories for Kids", 
    brand: "Disney Press",
    category: "books", 
    subcategory: "Children Books",
    description: "A heartwarming collection of beautifully illustrated classic tales designed to calm and delight young children at bedtime.",
    price: 349, 
    originalPrice: 599,
    discount: 42,
    rating: 4.6, 
    reviews: 290, 
    reviewCount: 290,
    stock: 40,
    image: "https://covers.openlibrary.org/b/id/35556-L.jpg", 
    tags: ["books", "children", "stories", "kids", "illustrated"],
    variants: null
  },
  { 
    id: 46, 
    name: "A Brief History of Time by Stephen Hawking", 
    brand: "Bantam Books",
    category: "books", 
    subcategory: "Popular Science",
    description: "Stephen Hawking's worldwide masterpiece exploring black holes, gravitational singularities, the Big Bang, and cosmology.",
    price: 429, 
    originalPrice: 699,
    discount: 39,
    rating: 4.8, 
    reviews: 810, 
    reviewCount: 810,
    stock: 25,
    image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg", 
    tags: ["books", "science", "physics", "cosmology", "non-fiction"],
    variants: null
  },
  { 
    id: 47, 
    name: "Thinking, Fast and Slow by Daniel Kahneman", 
    brand: "Farrar, Straus and Giroux",
    category: "books", 
    subcategory: "Psychology",
    description: "Nobel laureate Daniel Kahneman reveals the two systems that drive the way we think: intuitive fast thinking versus deliberate slow thinking.",
    price: 529, 
    originalPrice: 899,
    discount: 41,
    rating: 4.8, 
    reviews: 610, 
    reviewCount: 610,
    stock: 22,
    image: "https://covers.openlibrary.org/b/isbn/9780374275631-L.jpg", 
    tags: ["books", "psychology", "behavioral economics", "decision making"],
    variants: null
  },
  { 
    id: 48, 
    name: "The Psychology of Money by Morgan Housel", 
    brand: "Harriman House",
    category: "books", 
    subcategory: "Personal Finance",
    description: "Timeless lessons on wealth, greed, and happiness exploring how people think about money and financial independence.",
    price: 379, 
    originalPrice: 599,
    discount: 37,
    rating: 4.9, 
    reviews: 940, 
    reviewCount: 940,
    stock: 35,
    image: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg", 
    tags: ["books", "money", "finance", "investing", "wealth"],
    variants: null
  },
  { 
    id: 49, 
    name: "Deep Work by Cal Newport", 
    brand: "Grand Central Publishing",
    category: "books", 
    subcategory: "Productivity",
    description: "Rules for focused success in a distracted world, teaching how to master complicated information and produce better results in less time.",
    price: 419, 
    originalPrice: 699,
    discount: 40,
    rating: 4.7, 
    reviews: 540, 
    reviewCount: 540,
    stock: 26,
    image: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg", 
    tags: ["books", "productivity", "focus", "deep work", "career"],
    variants: null
  },
  { 
    id: 50, 
    name: "To Kill a Mockingbird by Harper Lee", 
    brand: "HarperCollins",
    category: "books", 
    subcategory: "Classic Literature",
    description: "The Pulitzer Prize-winning classic novel of warmth and humor tackling the roots of human behavior, prejudice, and moral courage.",
    price: 329, 
    originalPrice: 499,
    discount: 34,
    rating: 4.9, 
    reviews: 1100, 
    reviewCount: 1100,
    stock: 30,
    image: "https://covers.openlibrary.org/b/isbn/9780060935467-L.jpg", 
    tags: ["books", "literature", "classics", "fiction", "novel"],
    variants: null
  },

  // Beauty (10)
  { 
    id: 51, 
    name: "Hydrating Hyaluronic Acid Facial Serum", 
    brand: "The Ordinary",
    category: "beauty", 
    subcategory: "Skincare",
    description: "Multi-depth hydration formulation with ultra-pure vegan hyaluronic acid and soothing vitamin B5.",
    price: 699, 
    originalPrice: 1199,
    discount: 42,
    rating: 4.7, 
    reviews: 480, 
    reviewCount: 480,
    stock: 32,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80", 
    tags: ["serum", "skincare", "hyaluronic acid", "hydrating", "beauty"],
    variants: null
  },
  { 
    id: 52, 
    name: "Broad-Spectrum SPF 50 Mineral Sunscreen", 
    brand: "Neutrogena",
    category: "beauty", 
    subcategory: "Suncare",
    description: "Sheer ultra-lightweight water-resistant zinc oxide sunscreen offering UVA/UVB defense without greasy residue or white cast.",
    price: 549, 
    originalPrice: 899,
    discount: 39,
    rating: 4.6, 
    reviews: 390, 
    reviewCount: 390,
    stock: 38,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80", 
    tags: ["sunscreen", "spf", "suncare", "skincare", "beauty"],
    variants: null
  },
  { 
    id: 53, 
    name: "Nourishing Moroccan Argan Oil Shampoo", 
    brand: "OGX",
    category: "beauty", 
    subcategory: "Haircare",
    description: "Sulfate-free restoring shampoo infused with precious Moroccan argan oil to revive softness, shine, and silky strength.",
    price: 649, 
    originalPrice: 999,
    discount: 35,
    rating: 4.5, 
    reviews: 310, 
    reviewCount: 310,
    stock: 26,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80", 
    tags: ["shampoo", "argan oil", "haircare", "beauty", "sulfate-free"],
    variants: null
  },
  { 
    id: 54, 
    name: "Ionic Salon-Grade Blow Hair Dryer", 
    brand: "Dyson",
    category: "beauty", 
    subcategory: "Hair Tools",
    description: "High-velocity 1800W brushless motor with negative ion generator, diffuser nozzle, and 3 heat settings for frizz-free drying.",
    price: 2799, 
    originalPrice: 4499,
    discount: 38,
    rating: 4.8, 
    reviews: 220, 
    reviewCount: 220,
    stock: 14,
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80", 
    tags: ["hair dryer", "hair styling", "tools", "beauty", "salon"],
    variants: null
  },
  { 
    id: 55, 
    name: "Long-Lasting Glossy Gel Nail Polish", 
    brand: "O.P.I",
    category: "beauty", 
    subcategory: "Nails",
    description: "Chip-resistant, salon-quality high-shine lacquer providing up to 14 days of chip-free vibrant wear with wide pro-brush.",
    price: 349, 
    originalPrice: 599,
    discount: 42,
    rating: 4.4, 
    reviews: 165, 
    reviewCount: 165,
    stock: 40,
    image: "https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp", 
    tags: ["nail polish", "nails", "manicure", "beauty", "cosmetics"],
    variants: null
  },
  { 
    id: 56, 
    name: "Purifying Herbal Green Tea Clay Face Mask", 
    brand: "Innisfree",
    category: "beauty", 
    subcategory: "Skincare",
    description: "Mineral-rich kaolin volcanic clay mask enriched with Jeju green tea extract to absorb excess sebum and unclog pores.",
    price: 499, 
    originalPrice: 799,
    discount: 38,
    rating: 4.6, 
    reviews: 275, 
    reviewCount: 275,
    stock: 30,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80", 
    tags: ["face mask", "clay mask", "skincare", "pore cleansing", "beauty"],
    variants: null
  },
  { 
    id: 57, 
    name: "Matte Velvet Longwear Liquid Lipstick", 
    brand: "MAC",
    category: "beauty", 
    subcategory: "Makeup",
    description: "Weightless transfer-proof liquid lipstick delivering intense bold pigmentation with a comfortable 16-hour velvety finish.",
    price: 899, 
    originalPrice: 1499,
    discount: 40,
    rating: 4.7, 
    reviews: 360, 
    reviewCount: 360,
    stock: 25,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80", 
    tags: ["lipstick", "liquid lipstick", "matte", "makeup", "beauty", "cosmetics"],
    variants: null
  },
  { 
    id: 58, 
    name: "Gentle Foaming Hydrating Facial Cleanser", 
    brand: "CeraVe",
    category: "beauty", 
    subcategory: "Skincare",
    description: "Non-comedogenic daily foaming face wash formulated with 3 essential ceramides, hyaluronic acid, and niacinamide.",
    price: 599, 
    originalPrice: 999,
    discount: 40,
    rating: 4.8, 
    reviews: 510, 
    reviewCount: 510,
    stock: 34,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80", 
    tags: ["cleanser", "face wash", "ceramides", "skincare", "beauty"],
    variants: null
  },
  { 
    id: 59, 
    name: "Volumizing & Lengthening Waterproof Mascara", 
    brand: "Maybelline",
    category: "beauty", 
    subcategory: "Eye Makeup",
    description: "Buildable clump-resistant mascara with flexible silicone wand for dramatic fanned-out lash volume that lasts all day.",
    price: 399, 
    originalPrice: 649,
    discount: 39,
    rating: 4.6, 
    reviews: 420, 
    reviewCount: 420,
    stock: 36,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&q=80", 
    tags: ["mascara", "lashes", "eye makeup", "waterproof", "beauty"],
    variants: null
  },
  { 
    id: 60, 
    name: "Rose Water Soothing Facial Toner Mist", 
    brand: "Forest Essentials",
    category: "beauty", 
    subcategory: "Skincare",
    description: "Steam-distilled pure rose water face mist providing instant refreshing hydration, balanced pH, and pore refinement.",
    price: 499, 
    originalPrice: 799,
    discount: 38,
    rating: 4.6, 
    reviews: 230, 
    reviewCount: 230,
    stock: 28,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&q=80", 
    tags: ["toner", "rose water", "face mist", "skincare", "beauty", "natural"],
    variants: null
  }
];

// Application State
let cart = [];
let wishlist = [];
let recentlyViewed = [];
let orders = [];
let currentCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let selectedPaymentMethod = 'card';
let selectedUpiApp = 'gpay';
let appliedCoupon = null;
let discountPercent = 0;
let activeModalProductId = null;
let activeModalQty = 1;
let activeModalVariant = null;

// Coupon Rules
const validCoupons = {
  'SAVE10': { percent: 10, label: '10% Discount' },
  'SAVE20': { percent: 20, label: '20% Discount' },
  'SHOPEXPRESS': { percent: 15, label: '15% Welcome Offer' }
};

// Safe Image Fallback
const imageFallback = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='%23f3f4f6'><rect width='400' height='300' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='22' font-weight='bold' fill='%239ca3af'>Shop Express</text></svg>";

function handleImageError(img) {
  img.onerror = null;
  img.src = imageFallback;
}

// Load from localStorage
function loadAllState() {
  if (!authToken) {
    cart = [];
    wishlist = [];
    orders = [];
    appliedCoupon = null;
    discountPercent = 0;
    loadTheme();
    loadSavedAddress();
    updateCartCount();
    updateWishlistCount();
    return;
  }

  try {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      cart = JSON.parse(savedCart).map(item => ({
        ...item,
        cartItemId: item.cartItemId || (item.selectedVariant ? `${item.id}_${item.selectedVariant}` : `${item.id}`)
      }));
    }
  } catch(e) { cart = []; }

  try {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) wishlist = JSON.parse(savedWishlist);
  } catch(e) { wishlist = []; }

  try {
    const savedRecentlyViewed = localStorage.getItem('recently-viewed');
    if (savedRecentlyViewed) recentlyViewed = JSON.parse(savedRecentlyViewed);
  } catch(e) { recentlyViewed = []; }

  try {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) orders = JSON.parse(savedOrders);
  } catch(e) { orders = []; }

  try {
    const savedCoupon = localStorage.getItem('applied-coupon');
    if (savedCoupon && validCoupons[savedCoupon]) {
      appliedCoupon = savedCoupon;
      discountPercent = validCoupons[savedCoupon].percent;
    }
  } catch(e) { appliedCoupon = null; discountPercent = 0; }

  loadTheme();
  loadSavedAddress();
  updateCartCount();
  updateWishlistCount();
}

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('theme-icon').textContent = '☀';
    document.getElementById('theme-text').textContent = 'Light';
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('theme-icon').textContent = '🌙';
    document.getElementById('theme-text').textContent = 'Dark';
  }
}

function loadSavedAddress() {
  try {
    const saved = localStorage.getItem('shipping-address');
    if (saved) {
      const addr = JSON.parse(saved);
      if (document.getElementById('checkout-name')) document.getElementById('checkout-name').value = addr.name || '';
      if (document.getElementById('checkout-email')) document.getElementById('checkout-email').value = addr.email || '';
      if (document.getElementById('checkout-phone')) document.getElementById('checkout-phone').value = addr.phone || '';
      if (document.getElementById('checkout-address')) document.getElementById('checkout-address').value = addr.address || '';
      if (document.getElementById('checkout-city')) document.getElementById('checkout-city').value = addr.city || '';
      if (document.getElementById('checkout-state')) document.getElementById('checkout-state').value = addr.state || '';
      if (document.getElementById('checkout-pincode')) document.getElementById('checkout-pincode').value = addr.pincode || '';
    }
  } catch(e) {}
}

function saveCart() {
  localStorage.setItem('shopping-cart', JSON.stringify(cart));
}

function saveWishlist() {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function saveRecentlyViewed() {
  localStorage.setItem('recently-viewed', JSON.stringify(recentlyViewed));
}

function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function saveCouponState() {
  if (appliedCoupon) {
    localStorage.setItem('applied-coupon', appliedCoupon);
  } else {
    localStorage.removeItem('applied-coupon');
  }
}

// Toast Notifications
function showToast(message, isError = false, isInfo = false) {
  const existing = document.querySelectorAll('.toast');
  existing.forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast' + (isError ? ' error' : (isInfo ? ' info' : ''));
  toast.innerHTML = `<span>${isError ? '⚠️' : (isInfo ? 'ℹ️' : '✓')}</span> <span>${message}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2400);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  badge.textContent = count;
  badge.classList.add('cart-badge');
  setTimeout(() => badge.classList.remove('cart-badge'), 300);

  const clearBtn = document.getElementById('clear-cart-btn');
  if (clearBtn) {
    clearBtn.style.display = cart.length > 0 ? 'inline-block' : 'none';
  }
}

function updateWishlistCount() {
  const badge = document.getElementById('wishlist-count');
  badge.textContent = wishlist.length;
  badge.classList.add('cart-badge');
  setTimeout(() => badge.classList.remove('cart-badge'), 300);
}

// Stars rendering helper
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.4;
  let stars = '★'.repeat(full);
  if (half && full < 5) stars += '½';
  const empty = 5 - full - (half ? 1 : 0);
  if (empty > 0) stars += '☆'.repeat(empty);
  return stars;
}

// Filtering & Sorting
function filterAndSortProducts() {
  let filtered = products.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
      product.name.toLowerCase().includes(q) ||
      (product.brand && product.brand.toLowerCase().includes(q)) ||
      product.description.toLowerCase().includes(q) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(q)) ||
      (product.tags && product.tags.some(t => t.toLowerCase().includes(q))) ||
      product.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentSort === 'newest') {
    filtered.sort((a, b) => b.id - a.id);
  }

  return filtered;
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const filteredProducts = filterAndSortProducts();
  const countBadge = document.getElementById('products-count-badge');

  if (countBadge) {
    countBadge.textContent = `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`;
  }
  
  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
        <div style="font-size: 54px; margin-bottom: 12px;">🔍</div>
        <h3 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">No products found</h3>
        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 20px;">We couldn't find any products matching "${escapeHtml(searchQuery)}".</p>
        <button onclick="clearSearch()" style="background: var(--accent-color); color: white; border: none; padding: 10px 24px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer;">Clear Search &amp; Filters</button>
      </div>
    `;
    renderRecommendations();
    return;
  }

  grid.innerHTML = filteredProducts.map(product => {
    const inWishlist = isInWishlist(product.id);
    const isLowStock = product.stock <= 7;
    return `
    <div class="product-card" style="border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px var(--card-shadow); position: relative; cursor: pointer;" onclick="openProductModal(${product.id})">
      <span class="wishlist-heart ${inWishlist ? 'active' : ''}" title="${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">${inWishlist ? '❤' : '🤍'}</span>
      
      <div>
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" class="product-img" loading="lazy" onerror="handleImageError(this)">
        </div>
        <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">${product.category} ${product.subcategory ? `· ${product.subcategory}` : ''}</div>
        <h3 style="font-size: 17px; font-weight: 600; margin: 0 0 6px 0; color: var(--text-primary); line-height: 1.3;">${escapeHtml(product.name)}</h3>
        
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
          <span style="color: #f39c12; font-size: 14px;">${renderStars(product.rating)}</span>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${product.rating}</span>
          <span style="font-size: 12px; color: var(--text-secondary);">(${product.reviewCount || product.reviews})</span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); margin: 0 0 14px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${escapeHtml(product.description)}</p>
      </div>

      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div>
            <span style="font-size: 22px; font-weight: 700; color: var(--accent-color);">₹${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span style="font-size: 13px; color: var(--text-secondary); text-decoration: line-through; margin-left: 6px;">₹${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <span style="font-size: 12px; font-weight: 600; color: ${isLowStock ? '#e74c3c' : '#10b981'}; background: ${isLowStock ? 'rgba(231,76,60,0.1)' : 'rgba(16,185,129,0.1)'}; padding: 3px 8px; border-radius: 4px;">${isLowStock ? `Only ${product.stock} left!` : 'In Stock'}</span>
        </div>
        <button onclick="event.stopPropagation(); addToCartById(${product.id}, 1)" style="width: 100%; background: var(--accent-color); color: white; border: none; padding: 11px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s;">Add to Cart</button>
      </div>
    </div>
  `}).join('');
  
  renderRecommendations();
  if (recentlyViewed.length > 0 && document.getElementById('products-view').style.display !== 'none') {
    renderRecentlyViewed();
  }
}

function clearSearch() {
  searchQuery = '';
  currentCategory = 'all';
  document.getElementById('search-input').value = '';
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === 'all');
  });
  renderProducts();
}

// Wishlist Functions
function toggleWishlist(productId) {
  if (!authToken) {
    promptAuthForAction('wishlist_toggle', { productId }, 'Please sign in or create an account to save items to your Wishlist.');
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const index = wishlist.findIndex(item => item.id === productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed "${product.name}" from Wishlist`);
  } else {
    wishlist.push(product);
    showToast(`Added "${product.name}" to Wishlist! ❤`);
  }
  saveWishlist();
  updateWishlistCount();
  renderProducts();
  renderRecommendations();
  if (typeof syncWishlistToggleWithBackend === 'function') {
    syncWishlistToggleWithBackend(productId);
  }
  
  if (document.getElementById('wishlist-view').style.display === 'block') {
    renderWishlist();
  }
  if (activeModalProductId === productId) {
    updateModalWishlistState();
  }
}

function isInWishlist(productId) {
  return wishlist.some(item => item.id === productId);
}

function renderWishlist() {
  const grid = document.getElementById('wishlist-grid');
  const subtitle = document.getElementById('wishlist-subtitle');
  if (subtitle) {
    subtitle.textContent = `${wishlist.length} ${wishlist.length === 1 ? 'item' : 'items'} saved`;
  }
  
  if (wishlist.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border-color);">
        <div style="font-size: 64px; margin-bottom: 16px;">❤</div>
        <h3 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Your Wishlist is Empty</h3>
        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 24px;">Explore our catalog and click the heart icon to save products you love.</p>
        <button onclick="showProducts()" style="background: var(--accent-color); color: white; border: none; padding: 12px 30px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer;">Explore Products</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = wishlist.map(product => `
    <div class="product-card" style="border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px var(--card-shadow); position: relative; cursor: pointer;" onclick="openProductModal(${product.id})">
      <span class="wishlist-heart active" title="Remove from Wishlist" onclick="event.stopPropagation(); toggleWishlist(${product.id})">❤</span>
      <div>
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" class="product-img" loading="lazy" onerror="handleImageError(this)">
        </div>
        <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 4px;">${product.category}</div>
        <h3 style="font-size: 17px; font-weight: 600; margin: 0 0 6px 0; color: var(--text-primary);">${escapeHtml(product.name)}</h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin: 0 0 14px 0; line-height: 1.4;">${escapeHtml(product.description)}</p>
      </div>
      <div>
        <div style="font-size: 22px; font-weight: 700; color: var(--accent-color); margin-bottom: 12px;">₹${product.price.toFixed(2)}</div>
        <div style="display: flex; gap: 8px;">
          <button onclick="event.stopPropagation(); addToCartById(${product.id}, 1)" style="flex: 1; background: var(--accent-color); color: white; border: none; padding: 10px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">Add to Cart</button>
          <button onclick="event.stopPropagation(); toggleWishlist(${product.id})" style="background: transparent; color: #ef4444; border: 1px solid #ef4444; padding: 10px 14px; border-radius: 6px; font-size: 14px; cursor: pointer;" title="Remove">✕</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Product Details Modal Logic
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  activeModalProductId = productId;
  activeModalQty = 1;

  addToRecentlyViewed(product);

  document.getElementById('modal-product-img').src = product.image;
  document.getElementById('modal-product-img').alt = product.name;
  document.getElementById('modal-product-img').onerror = function() { handleImageError(this); };
  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-product-category').textContent = product.category + (product.brand ? ` · ${product.brand}` : '');
  document.getElementById('modal-product-stars').textContent = renderStars(product.rating);
  document.getElementById('modal-product-rating').textContent = product.rating.toFixed(1);
  document.getElementById('modal-product-reviews').textContent = `(${product.reviewCount || product.reviews} customer reviews)`;
  document.getElementById('modal-product-price').textContent = product.price.toFixed(2);
  document.getElementById('modal-product-description').textContent = product.description;
  
  const stockEl = document.getElementById('modal-product-stock');
  if (product.stock <= 7) {
    stockEl.style.color = '#e74c3c';
    stockEl.textContent = `⚠️ Low Stock - Only ${product.stock} units remaining!`;
  } else {
    stockEl.style.color = '#10b981';
    stockEl.textContent = `✓ In Stock (${product.stock} units available)`;
  }

  // Handle Product Variants / Sizes
  const variantContainer = document.getElementById('modal-variant-container');
  const variantOptions = document.getElementById('modal-variant-options');
  const variantDisplay = document.getElementById('modal-selected-variant-display');

  const variantLabel = document.getElementById('modal-variant-label');

  if (product.variants && product.variants.length > 0) {
    activeModalVariant = product.variants[0];
    if (variantContainer) variantContainer.style.display = 'block';
    if (variantDisplay) variantDisplay.textContent = activeModalVariant;
    
    if (variantLabel) {
      if (product.subcategory === 'Footwear' || product.name.toLowerCase().includes('shoes') || product.name.toLowerCase().includes('sneakers')) {
        variantLabel.textContent = 'Select Shoe Size (UK):';
      } else if (product.category === 'fashion') {
        variantLabel.textContent = 'Select Clothing Size:';
      } else if (product.subcategory === 'Bedding') {
        variantLabel.textContent = 'Select Bedding Size:';
      } else {
        variantLabel.textContent = 'Select Size / Option:';
      }
    }

    if (variantOptions) {
      variantOptions.innerHTML = product.variants.map((v, i) => `
        <button type="button" class="variant-btn ${i === 0 ? 'selected' : ''}" data-variant="${escapeHtml(v)}" onclick="selectModalVariant('${escapeHtml(v)}')">
          ${escapeHtml(v)}
        </button>
      `).join('');
    }
  } else {
    activeModalVariant = null;
    if (variantContainer) variantContainer.style.display = 'none';
    if (variantOptions) variantOptions.innerHTML = '';
  }

  document.getElementById('modal-qty-value').textContent = '1';
  updateModalWishlistState();
  renderModalRecommendations(product);

  document.getElementById('product-detail-modal').style.display = 'flex';
}

function selectModalVariant(variant) {
  activeModalVariant = variant;
  const display = document.getElementById('modal-selected-variant-display');
  if (display) display.textContent = variant;

  document.querySelectorAll('#modal-variant-options .variant-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.variant === variant);
  });
}

function closeProductModal() {
  document.getElementById('product-detail-modal').style.display = 'none';
  activeModalProductId = null;
  activeModalVariant = null;
}

function updateModalWishlistState() {
  if (!activeModalProductId) return;
  const inWishlist = isInWishlist(activeModalProductId);
  const heart = document.getElementById('modal-wishlist-heart');
  const label = document.getElementById('modal-wishlist-label');
  if (heart) heart.textContent = inWishlist ? '❤' : '🤍';
  if (label) label.textContent = inWishlist ? 'Saved in Wishlist' : 'Wishlist';
}

document.getElementById('close-product-modal').addEventListener('click', closeProductModal);
document.getElementById('product-detail-modal').addEventListener('click', function(e) {
  if (e.target === this) closeProductModal();
});

document.getElementById('modal-qty-minus').addEventListener('click', function() {
  if (activeModalQty > 1) {
    activeModalQty--;
    document.getElementById('modal-qty-value').textContent = activeModalQty;
  }
});

document.getElementById('modal-qty-plus').addEventListener('click', function() {
  const product = products.find(p => p.id === activeModalProductId);
  if (product && activeModalQty < product.stock) {
    activeModalQty++;
    document.getElementById('modal-qty-value').textContent = activeModalQty;
  } else {
    showToast(`Maximum available stock reached (${product ? product.stock : 1})`, true);
  }
});

document.getElementById('modal-add-to-cart').addEventListener('click', function() {
  if (activeModalProductId) {
    if (!authToken) {
      closeProductModal();
      promptAuthForAction('add_to_cart', {
        productId: activeModalProductId,
        quantityToAdd: activeModalQty,
        variant: activeModalVariant
      }, 'Please sign in or create an account to add items to your cart.');
      return;
    }
    addToCartById(activeModalProductId, activeModalQty, activeModalVariant);
    closeProductModal();
  }
});

document.getElementById('modal-toggle-wishlist').addEventListener('click', function() {
  if (activeModalProductId) {
    toggleWishlist(activeModalProductId);
  }
});

// Modal Related / You May Also Like
function renderModalRecommendations(currentProduct) {
  const box = document.getElementById('modal-related-section');
  const grid = document.getElementById('modal-related-grid');
  if (!box || !grid) return;

  const related = products
    .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || (p.tags && currentProduct.tags && p.tags.some(t => currentProduct.tags.includes(t)))))
    .slice(0, 3);

  if (related.length === 0) {
    box.style.display = 'none';
    return;
  }

  box.style.display = 'block';
  grid.innerHTML = related.map(p => `
    <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; cursor: pointer; display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s;" onclick="openProductModal(${p.id})">
      <div style="height: 100px; border-radius: 6px; overflow: hidden; margin-bottom: 8px; background: var(--bg-secondary);">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this)">
      </div>
      <div style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; line-height: 1.3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(p.name)}</div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
        <span style="font-size: 14px; font-weight: 700; color: var(--accent-color);">₹${p.price.toFixed(2)}</span>
        <span style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">★ ${p.rating.toFixed(1)}</span>
      </div>
    </div>
  `).join('');
}

// Recently Viewed
function addToRecentlyViewed(product) {
  recentlyViewed = recentlyViewed.filter(item => item.id !== product.id);
  recentlyViewed.unshift(product);
  if (recentlyViewed.length > 6) {
    recentlyViewed = recentlyViewed.slice(0, 6);
  }
  saveRecentlyViewed();
  renderRecentlyViewed();
  renderRecommendations();
  if (typeof syncRecentlyViewedToBackend === 'function') {
    syncRecentlyViewedToBackend(product.id);
  }
}

function clearRecentlyViewed() {
  recentlyViewed = [];
  saveRecentlyViewed();
  renderRecentlyViewed();
  renderRecommendations();
}

function renderRecentlyViewed() {
  const section = document.getElementById('recently-viewed-section');
  const grid = document.getElementById('recently-viewed-grid');
  
  if (recentlyViewed.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';
  grid.innerHTML = recentlyViewed.map(product => {
    const inWishlist = isInWishlist(product.id);
    return `
    <div class="product-card" style="border-radius: 10px; padding: 14px; box-shadow: 0 2px 6px var(--card-shadow); position: relative; cursor: pointer;" onclick="openProductModal(${product.id})">
      <span class="wishlist-heart ${inWishlist ? 'active' : ''}" style="top: 8px; right: 8px; width: 30px; height: 30px; font-size: 16px;" onclick="event.stopPropagation(); toggleWishlist(${product.id})">${inWishlist ? '❤' : '🤍'}</span>
      <div class="product-img-wrap" style="height: 140px; margin-bottom: 10px;">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" class="product-img" loading="lazy" onerror="handleImageError(this)">
      </div>
      <h4 style="font-size: 15px; font-weight: 600; margin: 0 0 4px 0; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(product.name)}</h4>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
        <span style="font-size: 16px; font-weight: 700; color: var(--accent-color);">₹${product.price.toFixed(2)}</span>
        <button onclick="event.stopPropagation(); addToCartById(${product.id}, 1)" style="background: var(--accent-color); color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">Add</button>
      </div>
    </div>
  `}).join('');
}

// Personalized Recommendations Algorithm
function getRecommendations(limit = 4) {
  const purchasedIds = new Set(orders.flatMap(o => (o.items || []).map(i => i.id)));
  const cartIds = new Set(cart.map(i => i.id));
  const viewedIds = new Set(recentlyViewed.map(i => i.id));

  const catScores = {};
  const subcatScores = {};
  const tagScores = {};

  // 1. Recently Viewed (recency-weighted)
  recentlyViewed.forEach((item, idx) => {
    const factor = (recentlyViewed.length - idx) / recentlyViewed.length;
    catScores[item.category] = (catScores[item.category] || 0) + 20 * factor;
    if (item.subcategory) subcatScores[item.subcategory] = (subcatScores[item.subcategory] || 0) + 25 * factor;
    (item.tags || []).forEach(t => {
      tagScores[t] = (tagScores[t] || 0) + 8 * factor;
    });
  });

  // 2. Orders / Purchases (strong signal for related & complementary products)
  orders.forEach(order => {
    (order.items || []).forEach(item => {
      catScores[item.category] = (catScores[item.category] || 0) + 25;
      if (item.subcategory) subcatScores[item.subcategory] = (subcatScores[item.subcategory] || 0) + 30;
      (item.tags || []).forEach(t => {
        tagScores[t] = (tagScores[t] || 0) + 10;
      });
    });
  });

  // 3. Wishlist
  wishlist.forEach(item => {
    catScores[item.category] = (catScores[item.category] || 0) + 12;
    if (item.subcategory) subcatScores[item.subcategory] = (subcatScores[item.subcategory] || 0) + 15;
    (item.tags || []).forEach(t => {
      tagScores[t] = (tagScores[t] || 0) + 5;
    });
  });

  // 4. Cart
  cart.forEach(item => {
    catScores[item.category] = (catScores[item.category] || 0) + 10;
    (item.tags || []).forEach(t => {
      tagScores[t] = (tagScores[t] || 0) + 4;
    });
  });

  const scored = products.map(p => {
    let score = 0;
    if (catScores[p.category]) score += catScores[p.category];
    if (p.subcategory && subcatScores[p.subcategory]) score += subcatScores[p.subcategory];
    if (p.tags) {
      p.tags.forEach(t => {
        if (tagScores[t]) score += tagScores[t];
      });
    }

    // Baseline popularity & rating quality
    score += (p.rating * 4) + (Math.min(p.reviewCount || p.reviews || 0, 500) / 100);

    // If already in cart
    if (cartIds.has(p.id)) {
      score -= 20;
    }

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);

  // Avoid recommending products the user has already purchased when enough relevant alternatives exist
  const unpurchased = scored.filter(s => !purchasedIds.has(s.product.id));
  const candidatePool = (unpurchased.length >= limit) ? unpurchased : scored;

  return candidatePool.slice(0, limit).map(s => s.product);
}

function renderRecommendations() {
  const section = document.getElementById('recommendations-section');
  const grid = document.getElementById('recommendations-grid');
  const subtitle = document.getElementById('recommendations-subtitle');
  const badge = document.getElementById('recommendations-badge');
  if (!section || !grid) return;

  const welcomeView = document.getElementById('welcome-view');
  if (welcomeView && welcomeView.style.display === 'block' && !authToken && !isGuestMode()) {
    section.style.display = 'none';
    return;
  }

  const recs = getRecommendations(4);
  if (recs.length === 0) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  const hasPurchased = orders.length > 0;
  const hasViewed = recentlyViewed.length > 0;
  const hasWishlist = wishlist.length > 0;

  if (subtitle) {
    if (hasPurchased) {
      subtitle.textContent = "Personalized picks based on your recent purchases and browsing history";
    } else if (hasViewed) {
      subtitle.textContent = "Recommended products tailored to items you recently explored";
    } else if (hasWishlist) {
      subtitle.textContent = "Recommended items complementing your wishlist";
    } else {
      subtitle.textContent = "Top-rated and trending products selected for you";
    }
  }

  if (badge) {
    badge.textContent = (hasPurchased || hasViewed) ? "⚡ Tailored For You" : "🔥 Popular Picks";
  }

  grid.innerHTML = recs.map(product => {
    const inWishlist = isInWishlist(product.id);
    const isLowStock = product.stock <= 7;
    return `
    <div class="product-card" style="border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px var(--card-shadow); position: relative; cursor: pointer;" onclick="openProductModal(${product.id})">
      <span class="wishlist-heart ${inWishlist ? 'active' : ''}" title="${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">${inWishlist ? '❤' : '🤍'}</span>
      
      <div>
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" class="product-img" loading="lazy" onerror="handleImageError(this)">
        </div>
        <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">${product.category} ${product.subcategory ? `· ${product.subcategory}` : ''}</div>
        <h3 style="font-size: 17px; font-weight: 600; margin: 0 0 6px 0; color: var(--text-primary); line-height: 1.3;">${escapeHtml(product.name)}</h3>
        
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
          <span style="color: #f39c12; font-size: 14px;">${renderStars(product.rating)}</span>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${product.rating}</span>
          <span style="font-size: 12px; color: var(--text-secondary);">(${product.reviewCount || product.reviews})</span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); margin: 0 0 14px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${escapeHtml(product.description)}</p>
      </div>

      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div>
            <span style="font-size: 22px; font-weight: 700; color: var(--accent-color);">₹${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span style="font-size: 13px; color: var(--text-secondary); text-decoration: line-through; margin-left: 6px;">₹${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <span style="font-size: 12px; font-weight: 600; color: ${isLowStock ? '#e74c3c' : '#10b981'}; background: ${isLowStock ? 'rgba(231,76,60,0.1)' : 'rgba(16,185,129,0.1)'}; padding: 3px 8px; border-radius: 4px;">${isLowStock ? `Only ${product.stock} left!` : 'In Stock'}</span>
        </div>
        <button onclick="event.stopPropagation(); addToCartById(${product.id}, 1)" style="width: 100%; background: var(--accent-color); color: white; border: none; padding: 11px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s;">Add to Cart</button>
      </div>
    </div>
  `}).join('');
}

// Cart Operations
function addToCartById(productId, quantityToAdd = 1, variant = null) {
  if (!authToken) {
    promptAuthForAction('add_to_cart', { productId, quantityToAdd, variant }, 'Please sign in or create an account to add items to your cart.');
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const selectedVariant = variant !== null 
    ? variant 
    : (product.variants && product.variants.length > 0 ? product.variants[0] : null);

  const cartItemId = selectedVariant ? `${product.id}_${selectedVariant}` : `${product.id}`;
  const existing = cart.find(item => item.cartItemId === cartItemId || (!item.cartItemId && item.id === productId && item.selectedVariant === selectedVariant));

  if (existing) {
    if (existing.quantity + quantityToAdd > product.stock) {
      showToast(`Cannot add more. Limit of ${product.stock} reached for this item!`, true);
      return;
    }
    existing.quantity += quantityToAdd;
  } else {
    if (quantityToAdd > product.stock) {
      showToast(`Only ${product.stock} available in stock!`, true);
      return;
    }
    cart.push({
      cartItemId: cartItemId,
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      stock: product.stock,
      selectedVariant: selectedVariant,
      quantity: quantityToAdd
    });
  }

  saveCart();
  updateCartCount();
  renderRecommendations();
  
  const variantLabel = selectedVariant ? ` (Size: ${selectedVariant})` : '';
  showToast(`Added ${quantityToAdd} × "${product.name}"${variantLabel} to cart! 🛒`);
  
  if (typeof syncCartAddWithBackend === 'function') {
    syncCartAddWithBackend(productId, quantityToAdd, selectedVariant);
  }

  if (document.getElementById('cart-view').style.display === 'block') {
    renderCart();
  }
}

function removeFromCart(cartItemId) {
  const item = cart.find(i => i.cartItemId === cartItemId || String(i.id) === String(cartItemId));
  const itemName = item ? item.name : 'Item';
  cart = cart.filter(i => i.cartItemId !== cartItemId && String(i.id) !== String(cartItemId));
  saveCart();
  updateCartCount();
  renderCart();
  renderRecommendations();
  showToast(`Removed "${itemName}" from cart.`);
}

function updateQuantity(cartItemId, change) {
  const item = cart.find(i => i.cartItemId === cartItemId || String(i.id) === String(cartItemId));
  if (!item) return;
  const product = products.find(p => p.id === item.id);

  if (change > 0 && product && item.quantity >= product.stock) {
    showToast(`Only ${product.stock} units available in stock!`, true);
    return;
  }

  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(item.cartItemId || item.id);
  } else {
    saveCart();
    renderCart();
  }
  updateCartCount();
  renderRecommendations();
}

function clearCart() {
  if (cart.length === 0) return;
  if (confirm('Are you sure you want to clear your shopping cart?')) {
    cart = [];
    saveCart();
    updateCartCount();
    renderCart();
    renderRecommendations();
    showToast('Shopping cart cleared.');
  }
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const summaryBox = document.getElementById('cart-summary-box');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 64px; margin-bottom: 16px;">🛒</div>
        <h3 style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Your Cart is Empty</h3>
        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 24px;">Looks like you haven't added anything to your cart yet.</p>
        <button onclick="showProducts()" style="background: var(--accent-color); color: white; border: none; padding: 12px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Explore Products</button>
      </div>
    `;
    if (summaryBox) summaryBox.style.display = 'none';
    document.getElementById('cart-total').textContent = '0.00';
    return;
  }

  if (summaryBox) summaryBox.style.display = 'block';

  container.innerHTML = cart.map(item => {
    const itemKey = item.cartItemId || item.id;
    return `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 18px 0; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; align-items: center; gap: 18px; flex: 1; min-width: 260px;">
        <div style="width: 72px; height: 72px; border-radius: 8px; overflow: hidden; background: var(--bg-primary); flex-shrink: 0; border: 1px solid var(--border-color);">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this)">
        </div>
        <div style="flex: 1;">
          <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 4px 0; color: var(--text-primary);">
            ${escapeHtml(item.name)}${item.selectedVariant ? ` — Size: ${escapeHtml(item.selectedVariant)}` : ''}
          </h3>
          <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">
            Unit Price: ₹${item.price.toFixed(2)}${item.selectedVariant ? ` · <span style="color: var(--accent-color); font-weight: 600;">Size ${escapeHtml(item.selectedVariant)}</span>` : ''}
          </div>
          ${item.stock <= 5 ? `<div style="font-size: 11px; color: #e74c3c; font-weight: 600;">Only ${item.stock} left in stock</div>` : ''}
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 20px;">
        <div style="display: flex; align-items: center; gap: 8px; background: var(--bg-primary); border-radius: 8px; padding: 4px; border: 1px solid var(--border-color);">
          <button onclick="updateQuantity('${itemKey}', -1)" style="background: var(--bg-secondary); border: 1px solid var(--border-color); width: 32px; height: 32px; border-radius: 6px; cursor: pointer; font-size: 18px; font-weight: 600; display: flex; align-items: center; justify-content: center; color: var(--text-primary);">−</button>
          <span style="font-size: 15px; font-weight: 600; min-width: 32px; text-align: center; color: var(--text-primary);">${item.quantity}</span>
          <button onclick="updateQuantity('${itemKey}', 1)" style="background: var(--bg-secondary); border: 1px solid var(--border-color); width: 32px; height: 32px; border-radius: 6px; cursor: pointer; font-size: 18px; font-weight: 600; display: flex; align-items: center; justify-content: center; color: var(--text-primary);">+</button>
        </div>
        <span style="font-size: 18px; font-weight: 700; color: var(--accent-color); min-width: 90px; text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart('${itemKey}')" style="background: transparent; color: #ef4444; border: 1px solid #ef4444; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;" title="Remove Item">Remove</button>
      </div>
    </div>
  `}).join('');

  calculateCartTotal();
}

function calculateCartTotal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discount);

  document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('cart-total').textContent = total.toFixed(2);

  const discountRow = document.getElementById('discount-row');
  if (discountPercent > 0) {
    discountRow.style.display = 'block';
    document.getElementById('discount-percent').textContent = discountPercent;
    document.getElementById('discount-amount').textContent = discount.toFixed(2);
  } else {
    discountRow.style.display = 'none';
  }
}

// Coupon Logic
function applyCoupon() {
  const input = document.getElementById('coupon-input');
  const code = input.value.trim().toUpperCase();
  const msgDiv = document.getElementById('coupon-message');

  if (!code) {
    msgDiv.innerHTML = `<span style="color: #ef4444; font-weight: 600;">Please enter a promo code</span>`;
    return;
  }

  if (appliedCoupon === code) {
    msgDiv.innerHTML = `<span style="color: #3b82f6; font-weight: 600;">Coupon "${code}" is already applied!</span>`;
    showToast(`Coupon "${code}" is already active`, false, true);
    return;
  }

  if (validCoupons[code]) {
    appliedCoupon = code;
    discountPercent = validCoupons[code].percent;
    saveCouponState();
    msgDiv.innerHTML = `<span style="color: #27ae60; font-weight: 600;">✓ Coupon "${code}" applied! ${discountPercent}% off</span>`;
    calculateCartTotal();
    showToast(`Coupon "${code}" applied! ${discountPercent}% discount activated!`);
  } else {
    appliedCoupon = null;
    discountPercent = 0;
    saveCouponState();
    msgDiv.innerHTML = `<span style="color: #ef4444; font-weight: 600;">✗ Invalid coupon code. Try SAVE10 or SAVE20</span>`;
    calculateCartTotal();
    showToast('Invalid coupon code entered', true);
  }
}

function removeCoupon() {
  appliedCoupon = null;
  discountPercent = 0;
  saveCouponState();
  document.getElementById('coupon-input').value = '';
  document.getElementById('coupon-message').innerHTML = `<span style="color: var(--text-secondary);">Coupon removed</span>`;
  calculateCartTotal();
  showToast('Coupon removed');
}

document.getElementById('apply-coupon-btn').addEventListener('click', applyCoupon);

// Checkout & Payment View Rendering
function renderPaymentSummary() {
  const container = document.getElementById('payment-items');
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discount);

  container.innerHTML = cart.map(item => `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
      <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
        <div style="width: 44px; height: 44px; border-radius: 6px; overflow: hidden; background: var(--bg-primary); flex-shrink: 0; border: 1px solid var(--border-color);">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this)">
        </div>
        <div>
          <div style="font-weight: 600; font-size: 14px; color: var(--text-primary); line-height: 1.2;">
            ${escapeHtml(item.name)}${item.selectedVariant ? ` — Size: ${escapeHtml(item.selectedVariant)}` : ''}
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">Qty: ${item.quantity} × ₹${item.price.toFixed(2)}</div>
        </div>
      </div>
      <div style="font-weight: 600; font-size: 14px; color: var(--accent-color); text-align: right;">₹${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  document.getElementById('payment-subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('payment-total').textContent = total.toFixed(2);
  document.getElementById('card-amount').textContent = total.toFixed(2);
  document.getElementById('upi-amount').textContent = total.toFixed(2);

  const discountRow = document.getElementById('payment-discount-row');
  if (discountPercent > 0 && appliedCoupon) {
    discountRow.style.display = 'flex';
    document.getElementById('payment-discount-code').textContent = appliedCoupon;
    document.getElementById('payment-discount-amount').textContent = discount.toFixed(2);
  } else {
    discountRow.style.display = 'none';
  }
}

// Shipping validation
function validateAndGetShippingAddress() {
  const name = document.getElementById('checkout-name').value.trim();
  const email = document.getElementById('checkout-email').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  const city = document.getElementById('checkout-city').value.trim();
  const state = document.getElementById('checkout-state').value.trim();
  const pincode = document.getElementById('checkout-pincode').value.trim();

  if (!name || name.length < 2) {
    showToast('Please enter your full name', true);
    document.getElementById('checkout-name').focus();
    return null;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', true);
    document.getElementById('checkout-email').focus();
    return null;
  }

  if (!/^\d{10}$/.test(phone)) {
    showToast('Please enter a valid 10-digit phone number', true);
    document.getElementById('checkout-phone').focus();
    return null;
  }

  if (!address || address.length < 5) {
    showToast('Please enter your street / delivery address', true);
    document.getElementById('checkout-address').focus();
    return null;
  }

  if (!city) {
    showToast('Please enter your city', true);
    document.getElementById('checkout-city').focus();
    return null;
  }

  if (!state) {
    showToast('Please enter your state', true);
    document.getElementById('checkout-state').focus();
    return null;
  }

  if (!/^\d{6}$/.test(pincode)) {
    showToast('Please enter a valid 6-digit PIN code', true);
    document.getElementById('checkout-pincode').focus();
    return null;
  }

  const addr = { name, email, phone, address, city, state, pincode };

  if (document.getElementById('save-address-checkbox').checked) {
    localStorage.setItem('shipping-address', JSON.stringify(addr));
  }

  return addr;
}

// Navigation / View Switching
function updateURLHash(view) {
  window.location.hash = view;
}

function isGuestMode() {
  return sessionStorage.getItem('shop_express_guest_mode') === 'true';
}

function showWelcomeScreen() {
  const welcomeView = document.getElementById('welcome-view');
  if (welcomeView) welcomeView.style.display = 'block';

  const headerStore = document.getElementById('header-store-controls');
  if (headerStore) headerStore.style.display = 'none';
  const headerSearch = document.getElementById('header-search-container');
  if (headerSearch) headerSearch.style.display = 'none';
  const headerRow = document.getElementById('header-top-row');
  if (headerRow) headerRow.style.marginBottom = '0px';

  document.getElementById('products-view').style.display = 'none';
  document.getElementById('cart-view').style.display = 'none';
  document.getElementById('payment-view').style.display = 'none';
  document.getElementById('wishlist-view').style.display = 'none';
  document.getElementById('orders-view').style.display = 'none';
  document.getElementById('recommendations-section').style.display = 'none';
  document.getElementById('recently-viewed-section').style.display = 'none';

  updateAuthUI(null);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname);
  }
}

function handleLogoClick() {
  if (authToken || isGuestMode()) {
    showProducts();
  } else {
    showWelcomeScreen();
  }
}

function showProducts() {
  const welcomeView = document.getElementById('welcome-view');
  if (welcomeView) welcomeView.style.display = 'none';

  const headerStore = document.getElementById('header-store-controls');
  if (headerStore) headerStore.style.display = 'flex';
  const headerSearch = document.getElementById('header-search-container');
  if (headerSearch) headerSearch.style.display = 'block';
  const headerRow = document.getElementById('header-top-row');
  if (headerRow) headerRow.style.marginBottom = '16px';

  document.getElementById('products-view').style.display = 'block';
  document.getElementById('cart-view').style.display = 'none';
  document.getElementById('payment-view').style.display = 'none';
  document.getElementById('wishlist-view').style.display = 'none';
  document.getElementById('orders-view').style.display = 'none';
  document.getElementById('recommendations-section').style.display = 'block';
  document.getElementById('recently-viewed-section').style.display = recentlyViewed.length > 0 ? 'block' : 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateURLHash('products');
}

function showCart() {
  if (!authToken) {
    promptAuthForAction('view_cart', null, 'Please sign in or create an account to view and manage your Shopping Cart.');
    return;
  }
  const welcomeView = document.getElementById('welcome-view');
  if (welcomeView) welcomeView.style.display = 'none';
  document.getElementById('products-view').style.display = 'none';
  document.getElementById('cart-view').style.display = 'block';
  document.getElementById('payment-view').style.display = 'none';
  document.getElementById('wishlist-view').style.display = 'none';
  document.getElementById('orders-view').style.display = 'none';
  document.getElementById('recommendations-section').style.display = 'none';
  document.getElementById('recently-viewed-section').style.display = 'none';
  renderCart();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateURLHash('cart');
}

function showWishlist() {
  if (!authToken) {
    promptAuthForAction('view_wishlist', null, 'Please sign in or create an account to access your Wishlist.');
    return;
  }
  const welcomeView = document.getElementById('welcome-view');
  if (welcomeView) welcomeView.style.display = 'none';
  document.getElementById('products-view').style.display = 'none';
  document.getElementById('cart-view').style.display = 'none';
  document.getElementById('payment-view').style.display = 'none';
  document.getElementById('wishlist-view').style.display = 'block';
  document.getElementById('orders-view').style.display = 'none';
  document.getElementById('recommendations-section').style.display = 'none';
  document.getElementById('recently-viewed-section').style.display = 'none';
  renderWishlist();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateURLHash('wishlist');
}

function showOrders() {
  if (!authToken) {
    promptAuthForAction('view_orders', null, 'Please sign in or create an account to view your Order History.');
    return;
  }
  const welcomeView = document.getElementById('welcome-view');
  if (welcomeView) welcomeView.style.display = 'none';
  document.getElementById('products-view').style.display = 'none';
  document.getElementById('cart-view').style.display = 'none';
  document.getElementById('payment-view').style.display = 'none';
  document.getElementById('wishlist-view').style.display = 'none';
  document.getElementById('orders-view').style.display = 'block';
  document.getElementById('recommendations-section').style.display = 'none';
  document.getElementById('recently-viewed-section').style.display = 'none';
  renderOrders();
  if (authToken && typeof syncUserOrdersFromBackend === 'function') {
    syncUserOrdersFromBackend();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateURLHash('orders');
}

function showPayment() {
  if (!authToken) {
    promptAuthForAction('checkout', null, 'Please sign in or create an account to proceed with Checkout & Payment.');
    return;
  }
  if (cart.length === 0) {
    showToast('Your cart is empty! Add products before checking out.', true);
    return;
  }
  const welcomeView = document.getElementById('welcome-view');
  if (welcomeView) welcomeView.style.display = 'none';
  document.getElementById('products-view').style.display = 'none';
  document.getElementById('cart-view').style.display = 'none';
  document.getElementById('payment-view').style.display = 'block';
  document.getElementById('wishlist-view').style.display = 'none';
  document.getElementById('orders-view').style.display = 'none';
  document.getElementById('recommendations-section').style.display = 'none';
  document.getElementById('recently-viewed-section').style.display = 'none';
  renderPaymentSummary();

  // Auto-fill checkout fields if user is authenticated
  if (currentUser) {
    const nameInput = document.getElementById('checkout-name');
    const emailInput = document.getElementById('checkout-email');
    const phoneInput = document.getElementById('checkout-phone');
    if (nameInput && !nameInput.value && currentUser.name) nameInput.value = currentUser.name;
    if (emailInput && !emailInput.value && currentUser.email) emailInput.value = currentUser.email;
    if (phoneInput && !phoneInput.value && currentUser.phone) phoneInput.value = currentUser.phone;

    if (currentUser.addresses && currentUser.addresses.length > 0) {
      const defAddr = currentUser.addresses.find(a => a.isDefault) || currentUser.addresses[0];
      const addrInput = document.getElementById('checkout-address');
      const cityInput = document.getElementById('checkout-city');
      const stateInput = document.getElementById('checkout-state');
      const pinInput = document.getElementById('checkout-pincode');
      if (addrInput && !addrInput.value && defAddr.street) addrInput.value = defAddr.street;
      if (cityInput && !cityInput.value && defAddr.city) cityInput.value = defAddr.city;
      if (stateInput && !stateInput.value && defAddr.state) stateInput.value = defAddr.state;
      if (pinInput && !pinInput.value && defAddr.pincode) pinInput.value = defAddr.pincode;
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateURLHash('checkout');
}

// Hash router
window.addEventListener('hashchange', function() {
  const hash = window.location.hash.replace('#', '');
  if (!authToken && !isGuestMode()) {
    showWelcomeScreen();
    return;
  }
  if (hash === 'cart') {
    if (!authToken) {
      promptAuthForAction('view_cart', null, 'Please sign in or create an account to view and access your Shopping Cart.');
      updateURLHash('products');
    } else {
      showCart();
    }
  } else if (hash === 'wishlist') {
    if (!authToken) {
      promptAuthForAction('view_wishlist', null, 'Please sign in or create an account to access your Wishlist.');
      updateURLHash('products');
    } else {
      showWishlist();
    }
  } else if (hash === 'orders') {
    if (!authToken) {
      promptAuthForAction('view_orders', null, 'Please sign in or create an account to view your Order History.');
      updateURLHash('products');
    } else {
      showOrders();
    }
  } else if (hash === 'checkout') {
    if (!authToken) {
      promptAuthForAction('checkout', null, 'Please sign in or create an account to proceed with Checkout & Payment.');
      updateURLHash('cart');
    } else {
      showPayment();
    }
  } else {
    showProducts();
  }
});

// Event Listeners for Nav
document.getElementById('cart-button').addEventListener('click', function() {
  if (!authToken) {
    promptAuthForAction('view_cart', null, 'Please sign in or create an account to view and access your Shopping Cart.');
    return;
  }
  showCart();
});
document.getElementById('wishlist-button').addEventListener('click', function() {
  if (!authToken) {
    promptAuthForAction('view_wishlist', null, 'Please sign in or create an account to access your Wishlist.');
    return;
  }
  showWishlist();
});
document.getElementById('orders-button').addEventListener('click', function() {
  if (!authToken) {
    promptAuthForAction('view_orders', null, 'Please sign in or create an account to view your Order History.');
    return;
  }
  showOrders();
});
document.getElementById('back-button').addEventListener('click', showProducts);
document.getElementById('back-from-wishlist').addEventListener('click', showProducts);
document.getElementById('back-from-orders').addEventListener('click', showProducts);
document.getElementById('checkout-button').addEventListener('click', function() {
  if (!authToken) {
    promptAuthForAction('checkout', null, 'Please sign in or create an account to proceed with Checkout & Payment.');
    return;
  }
  showPayment();
});
document.getElementById('back-to-cart-button').addEventListener('click', showCart);

// Dark Mode Toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  
  if (newTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('theme-icon').textContent = '☀';
    document.getElementById('theme-text').textContent = 'Light';
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('theme-icon').textContent = '🌙';
    document.getElementById('theme-text').textContent = 'Dark';
  }
  localStorage.setItem('theme', newTheme);
});

// Category Filter buttons
document.querySelectorAll('.category-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentCategory = this.dataset.category;
    renderProducts();
  });
});

// Search input with debounce
let searchTimeout;
document.getElementById('search-input').addEventListener('input', function(e) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchQuery = e.target.value;
    if (document.getElementById('products-view').style.display === 'none') {
      showProducts();
    }
    renderProducts();
  }, 150);
});

// Sorting
document.getElementById('sort-select').addEventListener('change', function(e) {
  currentSort = e.target.value;
  renderProducts();
});

// Payment method selection
document.querySelectorAll('.payment-method').forEach(method => {
  method.addEventListener('click', function() {
    document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
    this.classList.add('selected');
    selectedPaymentMethod = this.dataset.method;
    
    document.getElementById('card-form').style.display = selectedPaymentMethod === 'card' ? 'block' : 'none';
    document.getElementById('upi-form').style.display = selectedPaymentMethod === 'upi' ? 'block' : 'none';
  });
});

// UPI app selection
const upiAppNames = {
  'gpay': 'Google Pay',
  'phonepe': 'PhonePe',
  'paytm': 'Paytm',
  'bhim': 'BHIM',
  'amazonpay': 'Amazon Pay',
  'other': 'Other UPI App'
};

document.querySelectorAll('.upi-option').forEach(option => {
  option.addEventListener('click', function() {
    document.querySelectorAll('.upi-option').forEach(o => o.classList.remove('selected'));
    this.classList.add('selected');
    selectedUpiApp = this.dataset.upi;
    document.getElementById('selected-upi-app').textContent = `Selected: ${upiAppNames[selectedUpiApp] || 'UPI App'}`;
  });
});

// Card formatting
document.getElementById('card-number').addEventListener('input', function(e) {
  let val = e.target.value.replace(/\D/g, '').substring(0, 16);
  let parts = [];
  for (let i = 0; i < val.length; i += 4) {
    parts.push(val.substring(i, i + 4));
  }
  e.target.value = parts.join(' ');
});

document.getElementById('card-expiry').addEventListener('input', function(e) {
  let val = e.target.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) {
    val = val.substring(0, 2) + '/' + val.substring(2);
  }
  e.target.value = val;
});

document.getElementById('card-cvv').addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});

document.getElementById('checkout-phone').addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '').substring(0, 10);
});

document.getElementById('checkout-pincode').addEventListener('input', function(e) {
  e.target.value = e.target.value.replace(/\D/g, '').substring(0, 6);
});

// Card Form Submit
document.getElementById('card-payment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!authToken) {
    promptAuthForAction('checkout_payment', null, 'Please sign in or create an account to complete payment.');
    return;
  }
  const address = validateAndGetShippingAddress();
  if (!address) return;

  const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
  const cardName = document.getElementById('card-name').value.trim();
  const cardExpiry = document.getElementById('card-expiry').value.trim();
  const cardCvv = document.getElementById('card-cvv').value.trim();

  if (cardNumber.length !== 16) {
    showToast('Please enter a valid 16-digit card number', true);
    return;
  }

  if (cardName.length < 3) {
    showToast('Please enter the cardholder name', true);
    return;
  }

  if (cardExpiry.length !== 5 || !cardExpiry.includes('/')) {
    showToast('Please enter expiry date as MM/YY', true);
    return;
  }

  const [expMonth, expYear] = cardExpiry.split('/').map(Number);
  if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
    showToast('Invalid expiry month (01-12)', true);
    return;
  }

  const currentYearShort = Number(String(new Date().getFullYear()).slice(-2));
  const currentMonth = new Date().getMonth() + 1;
  if (expYear < currentYearShort || (expYear === currentYearShort && expMonth < currentMonth)) {
    showToast('Card has expired. Please use a valid card.', true);
    return;
  }

  if (cardCvv.length !== 3) {
    showToast('CVV must be 3 digits', true);
    return;
  }

  processOrderPayment({
    method: 'Credit/Debit Card',
    details: `Card ending in •••• ${cardNumber.slice(-4)}`
  }, address);
});

// UPI Form Submit
document.getElementById('upi-payment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!authToken) {
    promptAuthForAction('checkout_payment', null, 'Please sign in or create an account to complete payment.');
    return;
  }
  const address = validateAndGetShippingAddress();
  if (!address) return;

  const upiId = document.getElementById('upi-id').value.trim();
  const upiRegex = /^[\w.-]{2,50}@[a-zA-Z]{2,30}$/;

  if (!upiRegex.test(upiId)) {
    showToast('Please enter a valid UPI ID (e.g. name@okhdfcbank or 9876543210@paytm)', true);
    return;
  }

  processOrderPayment({
    method: `UPI (${upiAppNames[selectedUpiApp] || 'App'})`,
    details: `VPA: ${upiId}`
  }, address);
});

// Simulated Payment Processing
function processOrderPayment(paymentMethodInfo, shippingAddress) {
  if (!authToken) {
    promptAuthForAction('checkout_payment', { paymentMethodInfo, shippingAddress }, 'Please sign in or create an account to complete your order and payment.');
    return;
  }
  const payBtn = selectedPaymentMethod === 'card' 
    ? document.getElementById('pay-card-btn') 
    : document.getElementById('pay-upi-btn');
  
  const originalText = payBtn.innerHTML;
  payBtn.disabled = true;
  payBtn.innerHTML = `<span>⏳ Processing Payment...</span>`;

  setTimeout(() => {
    payBtn.disabled = false;
    payBtn.innerHTML = originalText;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = (subtotal * discountPercent) / 100;
    const total = Math.max(0, subtotal - discount);
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      items: cart.map(i => ({ ...i })),
      subtotal: subtotal,
      discount: discount,
      couponCode: appliedCoupon || null,
      total: total,
      customer: shippingAddress,
      payment: paymentMethodInfo,
      status: 'Order Placed'
    };

    orders.unshift(newOrder);
    saveOrders();

    if (typeof syncOrderWithBackend === 'function') {
      syncOrderWithBackend(newOrder, shippingAddress, selectedPaymentMethod);
    }

    // Clear cart and state
    cart = [];
    appliedCoupon = null;
    discountPercent = 0;
    saveCart();
    saveCouponState();
    updateCartCount();
    renderRecommendations();

    // Show Success Modal
    document.getElementById('success-order-id-badge').textContent = `Order #${orderId}`;
    document.getElementById('success-order-msg').textContent = `Thank you, ${shippingAddress.name}! Your order of ₹${total.toFixed(2)} has been placed successfully and will be delivered to ${shippingAddress.city}.`;
    document.getElementById('success-modal').style.display = 'flex';
  }, 1200);
}

function goToOrdersFromSuccess() {
  document.getElementById('success-modal').style.display = 'none';
  showOrders();
}

document.getElementById('close-modal').addEventListener('click', function() {
  document.getElementById('success-modal').style.display = 'none';
  showProducts();
});

// Order History Logic
function getStatusColor(status) {
  switch (status) {
    case 'Order Placed': return '#3498db';
    case 'Confirmed': return '#16a085';
    case 'Shipped': return '#8e44ad';
    case 'Out for Delivery': return '#f39c12';
    case 'Delivered': return '#27ae60';
    case 'Cancelled': return '#e74c3c';
    default: return '#3498db';
  }
}

function renderOrders() {
  const container = document.getElementById('orders-list');
  if (!container) return;

  if (!currentUser && !authToken) {
    container.innerHTML = `
      <div style="text-align: center; padding: 70px 20px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border-color);">
        <div style="font-size: 56px; margin-bottom: 16px;">🔒</div>
        <h3 style="font-size: 22px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Sign In to View Your Orders</h3>
        <p style="font-size: 14px; color: var(--text-secondary); max-width: 480px; margin: 0 auto 20px auto;">Orders and tracking information are protected and linked to your Shop Express account. Please sign in to review your purchase history, receipts, and shipment progress.</p>
        <button onclick="document.getElementById('auth-modal').style.display='flex'" style="background: var(--accent-color); color: white; border: none; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer;">Sign In to Account</button>
      </div>
    `;
    return;
  }

  if (orders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 80px 20px; background: var(--bg-secondary); border-radius: 12px; border: 1px solid var(--border-color);">
        <div style="font-size: 64px; margin-bottom: 16px;">📦</div>
        <h3 style="font-size: 24px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">No Orders Yet</h3>
        <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 24px;">When you place orders, they will appear here so you can review receipts, track deliveries, or easily buy again.</p>
        <button onclick="showProducts()" style="background: var(--accent-color); color: white; border: none; padding: 12px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Start Shopping</button>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const statusColor = getStatusColor(order.status);
    const isCancelled = order.status === 'Cancelled';
    const isDelivered = order.status === 'Delivered';

    return `
    <div style="background: var(--bg-secondary); border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px var(--card-shadow); margin-bottom: 24px; border: 1px solid var(--border-color); border-left: 5px solid ${statusColor};">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
            <h3 style="font-size: 19px; font-weight: 700; margin: 0; color: var(--text-primary);">Order #${order.id}</h3>
            <span style="background: ${statusColor}18; color: ${statusColor}; font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 4px; border: 1px solid ${statusColor}40;">
              ● ${order.status}
            </span>
          </div>
          <p style="font-size: 13px; color: var(--text-secondary); margin: 0;">Placed on ${orderDate}</p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 22px; font-weight: 700; color: var(--accent-color);">₹${order.total.toFixed(2)}</div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${order.payment ? order.payment.method : 'Card'}</div>
        </div>
      </div>

      <div style="background: var(--bg-primary); padding: 12px 16px; border-radius: 8px; font-size: 13px; color: var(--text-secondary); margin-bottom: 16px; border: 1px solid var(--border-color);">
        <strong>Deliver to:</strong> ${order.customer ? `${order.customer.name}, ${order.customer.address}, ${order.customer.city} (${order.customer.pincode})` : 'Standard Delivery'}
      </div>

      <div style="border-top: 1px solid var(--border-color); padding-top: 14px; margin-bottom: 16px;">
        <div style="font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 10px;">Items (${order.items.length})</div>
        ${order.items.map(item => `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; padding: 6px 0;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 42px; height: 42px; border-radius: 6px; overflow: hidden; background: var(--bg-primary); flex-shrink: 0; border: 1px solid var(--border-color);">
                <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this)">
              </div>
              <div>
                <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">
                  ${escapeHtml(item.name)}${item.selectedVariant ? ` <span style="display: inline-block; background: var(--bg-primary); border: 1px solid var(--border-color); font-size: 11px; padding: 1px 6px; border-radius: 4px; color: var(--accent-color); font-weight: 700; margin-left: 4px;">Size: ${escapeHtml(item.selectedVariant)}</span>` : ''}
                </div>
                <div style="font-size: 12px; color: var(--text-secondary);">Qty: ${item.quantity} × ₹${item.price.toFixed(2)}</div>
              </div>
            </div>
            <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">₹${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        `).join('')}
      </div>

      ${order.discount > 0 ? `
        <div style="padding: 8px 12px; background: rgba(39, 174, 96, 0.1); border-radius: 6px; font-size: 13px; color: #27ae60; margin-bottom: 16px; font-weight: 500;">
          💸 You saved ₹${order.discount.toFixed(2)} with coupon code <strong>${order.couponCode}</strong>
        </div>
      ` : ''}

      <div style="display: flex; justify-content: flex-end; gap: 10px; border-top: 1px solid var(--border-color); padding-top: 16px; flex-wrap: wrap;">
        <button onclick="viewOrderDetails('${order.id}')" style="background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">Track &amp; View Details</button>
        <button onclick="buyAgain('${order.id}')" style="background: var(--accent-color); color: white; border: none; padding: 8px 18px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">Buy Again 🛒</button>
        ${(!isCancelled && !isDelivered) ? `
          <button onclick="cancelOrder('${order.id}')" style="background: transparent; color: #ef4444; border: 1px solid #ef4444; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;">Cancel Order</button>
        ` : ''}
      </div>
    </div>
  `}).join('');
}

function buyAgain(orderId) {
  if (!authToken) {
    promptAuthForAction('buy_again', { orderId }, 'Please sign in or create an account to reorder items.');
    return;
  }
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  order.items.forEach(orderItem => {
    addToCartById(orderItem.id, orderItem.quantity, orderItem.selectedVariant);
  });

  saveCart();
  updateCartCount();
  showToast(`Items from Order #${orderId} added to cart! 🛒`);
  showCart();
}

function cancelOrder(orderId) {
  if (!authToken) {
    promptAuthForAction('cancel_order', { orderId }, 'Please sign in or create an account to cancel orders.');
    return;
  }
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  if (order.status === 'Delivered' || order.status === 'Cancelled') {
    showToast('This order cannot be cancelled.', true);
    return;
  }

  if (confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
    order.status = 'Cancelled';
    saveOrders();
    renderOrders();
    renderRecommendations();
    showToast(`Order #${orderId} has been cancelled.`);
    if (authToken) {
      apiRequest(`/orders/${orderId}/cancel`, { method: 'PUT' }).catch(err => {
        console.warn('[Cancel Order Sync Notice]:', err.message);
      });
    }
  }
}

function viewOrderDetails(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  document.getElementById('detail-order-id').textContent = `Order #${order.id}`;
  
  const badge = document.getElementById('detail-order-badge');
  badge.textContent = order.status;
  badge.style.background = getStatusColor(order.status) + '20';
  badge.style.color = getStatusColor(order.status);
  badge.style.border = `1px solid ${getStatusColor(order.status)}40`;

  // Tracking progress
  const steps = ['placed', 'confirmed', 'shipped', 'delivered'];
  const currentStepIndex = order.status === 'Order Placed' ? 0 :
                          order.status === 'Confirmed' ? 1 :
                          order.status === 'Shipped' ? 2 :
                          order.status === 'Delivered' ? 3 : -1;

  steps.forEach((st, idx) => {
    const el = document.getElementById(`step-${st}`);
    el.className = 'tracker-step';
    if (order.status === 'Cancelled') {
      if (idx === 0) el.classList.add('cancelled');
    } else {
      if (idx < currentStepIndex) el.classList.add('completed');
      else if (idx === currentStepIndex) el.classList.add('active');
    }
  });

  // Items list
  document.getElementById('detail-order-items').innerHTML = order.items.map(item => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--border-color);">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 40px; height: 40px; border-radius: 6px; overflow: hidden; background: var(--bg-primary); border: 1px solid var(--border-color);">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this)">
        </div>
        <div>
          <div style="font-weight: 600; font-size: 14px; color: var(--text-primary);">
            ${escapeHtml(item.name)}${item.selectedVariant ? ` — Size: ${escapeHtml(item.selectedVariant)}` : ''}
          </div>
          <div style="font-size: 12px; color: var(--text-secondary);">Qty: ${item.quantity} × ₹${item.price.toFixed(2)}</div>
        </div>
      </div>
      <div style="font-weight: 600; font-size: 14px; color: var(--accent-color);">₹${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  // Address & Payment
  const c = order.customer || {};
  document.getElementById('detail-order-address').innerHTML = `
    <strong>${c.name || 'Recipient'}</strong><br>
    ${c.address || 'Address on file'}<br>
    ${c.city || ''}, ${c.state || ''} - ${c.pincode || ''}<br>
    Phone: ${c.phone || 'N/A'}
  `;

  document.getElementById('detail-order-payment').innerHTML = `
    <strong>${order.payment ? order.payment.method : 'Card'}</strong><br>
    ${order.payment ? order.payment.details : ''}<br>
    Status: Paid (Simulated)
  `;

  // Totals
  document.getElementById('detail-order-subtotal').textContent = `₹${order.subtotal.toFixed(2)}`;
  document.getElementById('detail-order-total').textContent = `₹${order.total.toFixed(2)}`;

  const discountRow = document.getElementById('detail-order-discount-row');
  if (order.discount > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('detail-order-discount').textContent = `-₹${order.discount.toFixed(2)} (${order.couponCode || 'PROMO'})`;
  } else {
    discountRow.style.display = 'none';
  }

  document.getElementById('order-detail-modal').style.display = 'flex';
}

document.getElementById('close-order-modal').addEventListener('click', function() {
  document.getElementById('order-detail-modal').style.display = 'none';
});
document.getElementById('detail-close-btn').addEventListener('click', function() {
  document.getElementById('order-detail-modal').style.display = 'none';
});
document.getElementById('order-detail-modal').addEventListener('click', function(e) {
  if (e.target === this) document.getElementById('order-detail-modal').style.display = 'none';
});

// Helper to escape HTML in attributes
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Keyboard accessibility
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProductModal();
    document.getElementById('order-detail-modal').style.display = 'none';
    document.getElementById('success-modal').style.display = 'none';
    const authM = document.getElementById('auth-modal');
    if (authM) authM.style.display = 'none';
    const profM = document.getElementById('profile-modal');
    if (profM) profM.style.display = 'none';
  }
});

// Config change hook preservation
async function onConfigChange(config) {
  if (!config) return;
  if (config.site_name) document.getElementById('site-name').textContent = config.site_name;
  if (config.tagline) document.getElementById('tagline').textContent = config.tagline;
  if (config.section_title) document.getElementById('section-title').textContent = config.section_title;
  if (config.cart_title) document.getElementById('cart-title').textContent = config.cart_title;
  if (config.checkout_button_text) document.getElementById('checkout-button').textContent = config.checkout_button_text;
  if (config.payment_title) document.getElementById('payment-title').textContent = config.payment_title;
  renderProducts();
}

// ==========================================
// BACKEND INTEGRATION & CLIENT SERVICE
// ==========================================

const API_BASE = window.location.origin.includes('5000') || window.location.origin.includes('localhost')
  ? '/api'
  : 'http://localhost:5000/api';

let currentUser = null;
let authToken = localStorage.getItem('shop_express_token') || null;

// Centralized API Request Helper
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 401 && authToken) {
        logoutUser(false);
      }
      throw new Error(data.error || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    console.warn(`[Shop Express API] ${endpoint}:`, err.message);
    throw err;
  }
}

// 1. Session Restoration on Refresh
async function restoreAuthSession() {
  if (!authToken) {
    updateAuthUI(null);
    return;
  }
  try {
    const data = await apiRequest('/auth/me');
    if (data && data.success && data.user) {
      currentUser = data.user;
      updateAuthUI(currentUser);
      populatePreferencesForm(currentUser.preferences);

      // Restore user cart from backend
      if (currentUser.cart && currentUser.cart.length > 0) {
        await syncUserCartFromBackend();
      }

      // Restore user wishlist from backend
      if (currentUser.wishlist && currentUser.wishlist.length > 0) {
        wishlist = products.filter(p => currentUser.wishlist.includes(p.id));
        saveWishlist();
        updateWishlistCount();
      }

      // Restore user orders from backend
      if (typeof syncUserOrdersFromBackend === 'function') {
        await syncUserOrdersFromBackend();
      }

      // Refresh personalized recommendations
      fetchAndRenderRecommendations();
    }
  } catch (err) {
    try {
      const cached = localStorage.getItem('shop_express_user');
      if (cached) {
        currentUser = JSON.parse(cached);
        updateAuthUI(currentUser);
      }
    } catch (_) {}
  }
}

// 2. Auth Header UI
function updateAuthUI(user) {
  const authBtnLabel = document.getElementById('auth-button-label');
  const authBtn = document.getElementById('auth-button');
  const quickLogoutBtn = document.getElementById('quick-logout-btn');
  if (!authBtnLabel) return;
  if (user) {
    const firstName = user.name ? user.name.split(' ')[0] : 'Account';
    authBtnLabel.textContent = firstName;
    if (authBtn) {
      authBtn.title = `Signed in as ${user.name} (Click for Profile & Preferences)`;
      authBtn.style.background = 'rgba(255, 153, 0, 0.25)';
      authBtn.style.borderColor = 'var(--accent-color)';
    }
    if (quickLogoutBtn) {
      quickLogoutBtn.style.display = 'inline-flex';
    }
    const avatar = document.getElementById('profile-avatar-initial');
    if (avatar) avatar.textContent = firstName.charAt(0).toUpperCase();
    const dispName = document.getElementById('profile-display-name');
    if (dispName) dispName.textContent = user.name;
    const dispEmail = document.getElementById('profile-display-email');
    if (dispEmail) dispEmail.textContent = user.email || (user.phone ? `Phone: ${user.phone}` : '');
  } else {
    const isGuest = isGuestMode();
    authBtnLabel.textContent = isGuest ? 'Guest (Sign In)' : 'Sign In';
    if (authBtn) {
      authBtn.title = isGuest ? 'Browsing as Guest - Click to Sign In' : 'Sign In to your Shop Express account';
      authBtn.style.background = isGuest ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.15)';
      authBtn.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    }
    if (quickLogoutBtn) {
      quickLogoutBtn.style.display = 'none';
    }
  }
}

// 3. Form Population
function populatePreferencesForm(prefs = {}) {
  if (!prefs) return;
  if (prefs.ageRange && document.getElementById('pref-age-range')) {
    document.getElementById('pref-age-range').value = prefs.ageRange;
  }
  if (prefs.gender && document.getElementById('pref-gender')) {
    document.getElementById('pref-gender').value = prefs.gender;
  }
  if (prefs.clothingSize && document.getElementById('pref-clothing-size')) {
    document.getElementById('pref-clothing-size').value = prefs.clothingSize;
  }
  if (prefs.shoeSize && document.getElementById('pref-shoe-size')) {
    document.getElementById('pref-shoe-size').value = prefs.shoeSize;
  }
  if (prefs.preferredCategories && Array.isArray(prefs.preferredCategories)) {
    document.querySelectorAll('input[name="pref-cat"]').forEach(chk => {
      chk.checked = prefs.preferredCategories.includes(chk.value);
    });
  }
}

// 4. Cart Backend Sync
async function syncUserCartFromBackend() {
  if (!authToken) return;
  try {
    const data = await apiRequest('/cart');
    if (data && data.success && Array.isArray(data.cart)) {
      if (data.cart.length > 0) {
        cart = data.cart.map(item => ({
          cartItemId: `${item.productId}_${item.selectedVariant || 'default'}`,
          id: item.productId,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice || item.price,
          discount: item.discount || 0,
          image: item.image,
          category: item.category,
          stock: item.stock,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant
        }));
        saveCart();
        updateCartCount();
        if (document.getElementById('cart-view').style.display === 'block') {
          renderCart();
        }
      }
    }
  } catch (_) {}
}

function syncCartAddWithBackend(productId, quantity, variant) {
  if (!authToken) return;
  apiRequest('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity, selectedVariant: variant })
  }).catch(() => {});
}

function syncWishlistToggleWithBackend(productId) {
  if (!authToken) return;
  apiRequest(`/wishlist/${productId}`, {
    method: 'POST'
  }).catch(() => {});
}

function syncRecentlyViewedToBackend(productId) {
  if (!authToken) return;
  apiRequest('/users/recently-viewed', {
    method: 'POST',
    body: JSON.stringify({ productId })
  }).catch(() => {});
}

function syncOrderWithBackend(order, shippingAddress, paymentMethod) {
  if (!authToken) return;
  const payload = {
    items: order.items.map(i => ({
      productId: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      selectedVariant: i.selectedVariant || null,
      size: i.selectedVariant || null,
      image: i.image
    })),
    shippingAddress: {
      fullName: shippingAddress.name,
      email: shippingAddress.email,
      phone: shippingAddress.phone,
      street: shippingAddress.address,
      city: shippingAddress.city,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode
    },
    paymentMethod: paymentMethod === 'upi' ? 'upi' : 'card',
    subtotal: order.subtotal,
    discount: order.discount,
    couponCode: order.couponCode,
    shipping: 0,
    total: order.total
  };

  apiRequest('/orders', {
    method: 'POST',
    body: JSON.stringify(payload)
  }).then(data => {
    if (data && data.success && data.order) {
      const successBadge = document.getElementById('success-order-id-badge');
      if (successBadge && data.order.orderId) {
        successBadge.textContent = `Order #${data.order.orderId}`;
      }
      if (authToken) {
        syncUserOrdersFromBackend();
      }
    }
  }).catch(err => console.warn('[Order Sync Notice]:', err.message));
}

async function syncUserOrdersFromBackend() {
  if (!authToken) return;
  try {
    const data = await apiRequest('/orders');
    if (data && data.success && Array.isArray(data.orders)) {
      if (data.orders.length > 0) {
        orders = data.orders.map(o => ({
          id: o.orderId,
          date: o.createdAt,
          status: o.orderStatus === 'Placed' ? 'Order Placed' : o.orderStatus,
          items: (o.items || []).map(it => ({
            id: it.productId,
            name: it.name,
            price: it.price,
            quantity: it.quantity,
            selectedVariant: it.selectedVariant,
            image: it.image
          })),
          subtotal: o.subtotal,
          discount: o.discount || 0,
          couponCode: o.couponCode || null,
          total: o.total,
          customer: {
            name: o.shippingAddress ? o.shippingAddress.fullName : 'Customer',
            email: o.shippingAddress ? o.shippingAddress.email : '',
            phone: o.shippingAddress ? o.shippingAddress.phone : '',
            address: o.shippingAddress ? o.shippingAddress.street : '',
            city: o.shippingAddress ? o.shippingAddress.city : '',
            state: o.shippingAddress ? o.shippingAddress.state : '',
            pincode: o.shippingAddress ? o.shippingAddress.pincode : ''
          },
          payment: {
            method: (o.paymentMethod || 'card').toUpperCase(),
            details: o.paymentDetails ? o.paymentDetails.transactionId : 'Prepaid'
          },
          trackingHistory: o.trackingHistory || []
        }));
        saveOrders();
        if (document.getElementById('orders-view').style.display === 'block') {
          renderOrders();
        }
      }
    }
  } catch (_) {}
}

async function fetchProductsFromBackend() {
  try {
    const data = await apiRequest('/products?limit=100');
    if (data && data.success && Array.isArray(data.products) && data.products.length > 0) {
      data.products.forEach(bp => {
        const localP = products.find(p => p.id === bp.id);
        if (localP) {
          localP.stock = bp.stock;
          localP.rating = bp.rating;
          localP.reviewCount = bp.reviewCount;
        }
      });
      renderProducts();
    }
  } catch (_) {}
}

// 5. Auth Handlers & Action Interception
let pendingAuthAction = null;

function promptAuthForAction(actionType, data = null, reasonMsg = 'Please sign in to continue.') {
  pendingAuthAction = { actionType, data };

  const banner = document.getElementById('auth-modal-reason-banner');
  const reasonText = document.getElementById('auth-modal-reason-text');
  if (banner && reasonText) {
    reasonText.textContent = reasonMsg;
    banner.style.display = 'flex';
  }

  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.style.display = 'flex';
  }

  showToast(reasonMsg, false);
}

function executePendingAction() {
  if (!pendingAuthAction) return;
  const action = pendingAuthAction;
  pendingAuthAction = null;

  const banner = document.getElementById('auth-modal-reason-banner');
  if (banner) banner.style.display = 'none';

  if (action.actionType === 'add_to_cart' && action.data && action.data.productId) {
    addToCartById(action.data.productId, action.data.quantityToAdd || 1, action.data.variant || null);
  } else if (action.actionType === 'view_cart') {
    showCart();
  } else if (action.actionType === 'checkout') {
    showPayment();
  } else if (action.actionType === 'checkout_payment') {
    if (action.data && action.data.paymentMethodInfo && action.data.shippingAddress) {
      processOrderPayment(action.data.paymentMethodInfo, action.data.shippingAddress);
    } else {
      showPayment();
    }
  } else if (action.actionType === 'view_orders') {
    showOrders();
  } else if (action.actionType === 'view_wishlist') {
    showWishlist();
  } else if (action.actionType === 'wishlist_toggle' && action.data && action.data.productId) {
    toggleWishlist(action.data.productId);
  } else if (action.actionType === 'buy_again' && action.data && action.data.orderId) {
    buyAgain(action.data.orderId);
  } else if (action.actionType === 'cancel_order' && action.data && action.data.orderId) {
    cancelOrder(action.data.orderId);
  }
}

function guestBrowseCatalog() {
  sessionStorage.setItem('shop_express_guest_mode', 'true');
  showProducts();
  updateAuthUI(null);
  showToast('Welcome, Guest! Feel free to browse our products. Sign in anytime to unlock Cart, Wishlist & Checkout.', false);
}

function switchWelcomeAuthTab(tab) {
  const tabSignin = document.getElementById('welcome-tab-signin');
  const tabSignup = document.getElementById('welcome-tab-signup');
  const formSignin = document.getElementById('welcome-signin-form');
  const formSignup = document.getElementById('welcome-signup-form');
  const authTitle = document.getElementById('welcome-auth-title');
  const alertBox = document.getElementById('welcome-auth-alert');
  if (alertBox) alertBox.style.display = 'none';

  if (tab === 'signin') {
    if (tabSignin) {
      tabSignin.style.borderBottom = '3px solid var(--accent-color)';
      tabSignin.style.color = 'var(--accent-color)';
      tabSignin.style.fontWeight = '700';
    }
    if (tabSignup) {
      tabSignup.style.borderBottom = '3px solid transparent';
      tabSignup.style.color = 'var(--text-secondary)';
      tabSignup.style.fontWeight = '600';
    }
    if (formSignin) formSignin.style.display = 'block';
    if (formSignup) formSignup.style.display = 'none';
    if (authTitle) authTitle.textContent = 'Sign In to Your Account';
  } else {
    if (tabSignup) {
      tabSignup.style.borderBottom = '3px solid var(--accent-color)';
      tabSignup.style.color = 'var(--accent-color)';
      tabSignup.style.fontWeight = '700';
    }
    if (tabSignin) {
      tabSignin.style.borderBottom = '3px solid transparent';
      tabSignin.style.color = 'var(--text-secondary)';
      tabSignin.style.fontWeight = '600';
    }
    if (formSignin) formSignin.style.display = 'none';
    if (formSignup) formSignup.style.display = 'block';
    if (authTitle) authTitle.textContent = 'Create Shop Express Account';
  }
}

function fillDemoCredentials(source = 'modal') {
  if (source === 'welcome') {
    const idInput = document.getElementById('welcome-signin-identifier');
    const passInput = document.getElementById('welcome-signin-password');
    if (idInput) idInput.value = 'alex@example.com';
    if (passInput) passInput.value = 'password123';
  } else {
    const emailInput = document.getElementById('signin-email');
    const passInput = document.getElementById('signin-password');
    if (emailInput) emailInput.value = 'alex@example.com';
    if (passInput) passInput.value = 'password123';
  }
  showToast('Demo credentials filled! Click Sign In.');
}

function openGoogleAuthModal() {
  const modal = document.getElementById('google-auth-modal');
  if (modal) modal.style.display = 'flex';
}

function closeGoogleAuthModal() {
  const modal = document.getElementById('google-auth-modal');
  if (modal) modal.style.display = 'none';
}

async function submitGoogleLogin(name, email) {
  try {
    const data = await apiRequest('/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        email,
        name,
        googleId: 'google_' + btoa(email)
      })
    });

    if (data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('shop_express_token', authToken);
      localStorage.setItem('shop_express_user', JSON.stringify(currentUser));
      updateAuthUI(currentUser);
      populatePreferencesForm(currentUser.preferences);

      closeGoogleAuthModal();
      const authModal = document.getElementById('auth-modal');
      if (authModal) authModal.style.display = 'none';
      const welcomeView = document.getElementById('welcome-view');
      if (welcomeView) welcomeView.style.display = 'none';

      showToast(`Signed in with Google as ${currentUser.name}! 🎉`);
      await syncUserCartFromBackend();
      if (typeof syncUserOrdersFromBackend === 'function') {
        await syncUserOrdersFromBackend();
      }
      fetchAndRenderRecommendations();

      if (pendingAuthAction) {
        executePendingAction();
      } else {
        showProducts();
      }
    }
  } catch (err) {
    showToast('Google Sign In failed: ' + err.message, true);
  }
}

function handleCustomGoogleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('google-name-input').value.trim();
  const email = document.getElementById('google-email-input').value.trim();
  if (name && email) {
    submitGoogleLogin(name, email);
  }
}

let currentOtpPhone = '';

function openPhoneOtpModal() {
  const modal = document.getElementById('phone-otp-modal');
  if (modal) modal.style.display = 'flex';
  const stepReq = document.getElementById('phone-step-request');
  const stepVer = document.getElementById('phone-step-verify');
  const alertBox = document.getElementById('phone-otp-alert');
  if (stepReq) stepReq.style.display = 'block';
  if (stepVer) stepVer.style.display = 'none';
  if (alertBox) alertBox.style.display = 'none';
}

function closePhoneOtpModal() {
  const modal = document.getElementById('phone-otp-modal');
  if (modal) modal.style.display = 'none';
}

function resetPhoneOtpForm() {
  const stepReq = document.getElementById('phone-step-request');
  const stepVer = document.getElementById('phone-step-verify');
  const alertBox = document.getElementById('phone-otp-alert');
  if (stepReq) stepReq.style.display = 'block';
  if (stepVer) stepVer.style.display = 'none';
  if (alertBox) alertBox.style.display = 'none';
}

function handleSendPhoneOtp(e) {
  e.preventDefault();
  const phoneInput = document.getElementById('otp-phone-input');
  const alertBox = document.getElementById('phone-otp-alert');
  const phone = phoneInput ? phoneInput.value.trim() : '';

  if (!/^\d{10}$/.test(phone)) {
    if (alertBox) {
      alertBox.textContent = 'Please enter a valid 10-digit mobile number.';
      alertBox.style.display = 'block';
    }
    return;
  }

  currentOtpPhone = phone;
  if (alertBox) alertBox.style.display = 'none';

  const stepReq = document.getElementById('phone-step-request');
  const stepVer = document.getElementById('phone-step-verify');
  const disp = document.getElementById('sent-phone-display');
  const codeInput = document.getElementById('otp-code-input');

  if (disp) disp.textContent = `+91 ${phone}`;
  if (codeInput) codeInput.value = '123456';
  if (stepReq) stepReq.style.display = 'none';
  if (stepVer) stepVer.style.display = 'block';

  showToast(`Demo OTP 123456 sent to +91 ${phone}!`);
}

async function handleVerifyPhoneOtp(e) {
  e.preventDefault();
  const alertBox = document.getElementById('phone-otp-alert');
  const codeInput = document.getElementById('otp-code-input');
  const otp = codeInput ? codeInput.value.trim() : '';

  if (!otp || otp.length !== 6) {
    if (alertBox) {
      alertBox.textContent = 'Please enter the 6-digit verification code.';
      alertBox.style.display = 'block';
    }
    return;
  }

  const verifyBtn = document.getElementById('verify-otp-btn');
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.textContent = 'Verifying...';
  }

  try {
    const data = await apiRequest('/auth/phone-login', {
      method: 'POST',
      body: JSON.stringify({ phone: currentOtpPhone, otp })
    });

    if (data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('shop_express_token', authToken);
      localStorage.setItem('shop_express_user', JSON.stringify(currentUser));
      updateAuthUI(currentUser);
      populatePreferencesForm(currentUser.preferences);

      closePhoneOtpModal();
      const authModal = document.getElementById('auth-modal');
      if (authModal) authModal.style.display = 'none';
      const welcomeView = document.getElementById('welcome-view');
      if (welcomeView) welcomeView.style.display = 'none';

      showToast(`Signed in successfully with +91 ${currentOtpPhone}! 👋`);
      await syncUserCartFromBackend();
      if (typeof syncUserOrdersFromBackend === 'function') {
        await syncUserOrdersFromBackend();
      }
      fetchAndRenderRecommendations();

      if (pendingAuthAction) {
        executePendingAction();
      } else {
        showProducts();
      }
    }
  } catch (err) {
    if (alertBox) {
      alertBox.textContent = err.message || 'Invalid verification code.';
      alertBox.style.display = 'block';
    }
    showToast(err.message || 'Phone verification failed', true);
  } finally {
    if (verifyBtn) {
      verifyBtn.disabled = false;
      verifyBtn.textContent = 'Verify & Sign In';
    }
  }
}

async function handleSignIn(identifier, password, source = 'modal') {
  const isWelcome = source === 'welcome';
  const errorAlert = document.getElementById(isWelcome ? 'welcome-auth-alert' : 'auth-error-alert');
  const submitBtn = document.getElementById(isWelcome ? 'welcome-signin-btn' : 'signin-submit-btn');
  if (errorAlert) errorAlert.style.display = 'none';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
  }

  try {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password, email: identifier })
    });

    if (data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('shop_express_token', authToken);
      localStorage.setItem('shop_express_user', JSON.stringify(currentUser));
      updateAuthUI(currentUser);
      populatePreferencesForm(currentUser.preferences);

      const authModal = document.getElementById('auth-modal');
      if (authModal) authModal.style.display = 'none';
      const welcomeView = document.getElementById('welcome-view');
      if (welcomeView) welcomeView.style.display = 'none';

      showToast(`Welcome back, ${currentUser.name}! 👋`);
      await syncUserCartFromBackend();
      if (typeof syncUserOrdersFromBackend === 'function') {
        await syncUserOrdersFromBackend();
      }
      fetchAndRenderRecommendations();

      if (pendingAuthAction) {
        executePendingAction();
      } else {
        showProducts();
      }
    }
  } catch (err) {
    if (errorAlert) {
      errorAlert.textContent = err.message || 'Invalid email or password.';
      errorAlert.style.display = 'block';
    }
    showToast(err.message || 'Sign in failed', true);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = isWelcome ? 'Sign In to Shop Express' : 'Sign In';
    }
  }
}

async function handleSignUp(name, email, password, confirmPassword, phone, preferences = null, source = 'modal') {
  const isWelcome = source === 'welcome';
  const errorAlert = document.getElementById(isWelcome ? 'welcome-auth-alert' : 'auth-error-alert');
  const submitBtn = document.getElementById(isWelcome ? 'welcome-signup-btn' : 'signup-submit-btn');
  if (errorAlert) errorAlert.style.display = 'none';

  if (password !== confirmPassword) {
    const msg = 'Passwords do not match. Please re-enter your password.';
    if (errorAlert) {
      errorAlert.textContent = msg;
      errorAlert.style.display = 'block';
    }
    showToast(msg, true);
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';
  }

  try {
    const payload = { name, email, password, confirmPassword, phone };
    if (preferences) payload.preferences = preferences;

    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (data.success) {
      authToken = data.token;
      currentUser = data.user;
      localStorage.setItem('shop_express_token', authToken);
      localStorage.setItem('shop_express_user', JSON.stringify(currentUser));
      updateAuthUI(currentUser);
      populatePreferencesForm(currentUser.preferences);

      const authModal = document.getElementById('auth-modal');
      if (authModal) authModal.style.display = 'none';
      const welcomeView = document.getElementById('welcome-view');
      if (welcomeView) welcomeView.style.display = 'none';

      showToast(`Account created! Welcome to Shop Express, ${currentUser.name}! 🎉`);
      fetchAndRenderRecommendations();

      if (pendingAuthAction) {
        executePendingAction();
      } else {
        showProducts();
      }
    }
  } catch (err) {
    if (errorAlert) {
      errorAlert.textContent = err.message || 'Account registration failed.';
      errorAlert.style.display = 'block';
    }
    showToast(err.message || 'Registration failed', true);
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = isWelcome ? 'Create Account' : 'Create Account';
    }
  }
}

function logoutUser(notify = true) {
  authToken = null;
  currentUser = null;
  localStorage.removeItem('shop_express_token');
  localStorage.removeItem('shop_express_user');
  localStorage.removeItem('shopping-cart');
  localStorage.removeItem('wishlist');
  localStorage.removeItem('orders');
  localStorage.removeItem('applied-coupon');
  sessionStorage.removeItem('shop_express_guest_mode');
  cart = [];
  wishlist = [];
  orders = [];
  appliedCoupon = null;
  discountPercent = 0;
  updateCartCount();
  updateWishlistCount();

  const profModal = document.getElementById('profile-modal');
  if (profModal) profModal.style.display = 'none';
  const authModal = document.getElementById('auth-modal');
  if (authModal) authModal.style.display = 'none';
  const googleModal = document.getElementById('google-auth-modal');
  if (googleModal) googleModal.style.display = 'none';
  const phoneModal = document.getElementById('phone-otp-modal');
  if (phoneModal) phoneModal.style.display = 'none';

  showWelcomeScreen();

  if (notify) showToast('Signed out successfully.');
}

async function handleSavePreferences(e) {
  e.preventDefault();
  if (!authToken) return;

  const ageRange = document.getElementById('pref-age-range').value;
  const genderEl = document.getElementById('pref-gender');
  const gender = genderEl ? genderEl.value : '';
  const clothingSize = document.getElementById('pref-clothing-size').value;
  const shoeSize = document.getElementById('pref-shoe-size').value;
  const selectedCategories = [];
  document.querySelectorAll('input[name="pref-cat"]:checked').forEach(c => selectedCategories.push(c.value));

  const preferences = {
    ageRange,
    gender,
    clothingSize,
    shoeSize,
    preferredCategories: selectedCategories
  };

  const saveBtn = document.getElementById('save-preferences-btn');
  if (saveBtn) saveBtn.textContent = 'Saving...';

  try {
    const data = await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify({ preferences })
    });

    if (data.success) {
      if (currentUser) currentUser.preferences = preferences;
      localStorage.setItem('shop_express_user', JSON.stringify(currentUser));
      document.getElementById('profile-modal').style.display = 'none';
      showToast('Shopping preferences updated! Curating new picks... ✨');
      fetchAndRenderRecommendations();
    }
  } catch (err) {
    showToast('Failed to save preferences: ' + err.message, true);
  } finally {
    if (saveBtn) saveBtn.textContent = 'Save Preferences';
  }
}

// 6. Dynamic Recommendation Engine from Backend
async function fetchAndRenderRecommendations() {
  try {
    const data = await apiRequest('/recommendations?limit=8');
    if (data && data.success && Array.isArray(data.recommendations) && data.recommendations.length > 0) {
      renderScoredRecommendations(data.recommendations);
      return;
    }
  } catch (_) {}
  renderRecommendations();
}

function renderScoredRecommendations(recs) {
  const section = document.getElementById('recommendations-section');
  const grid = document.getElementById('recommendations-grid');
  const subtitle = document.getElementById('recommendations-subtitle');
  const badge = document.getElementById('recommendations-badge');
  if (!section || !grid) return;

  const welcomeView = document.getElementById('welcome-view');
  if (welcomeView && welcomeView.style.display === 'block' && !authToken && !isGuestMode()) {
    section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  if (subtitle) {
    if (currentUser) {
      subtitle.textContent = `Personalized picks tailored for ${currentUser.name.split(' ')[0]} based on your preferences & activity`;
    } else {
      subtitle.textContent = "Personalized picks based on trending and top-rated items";
    }
  }

  if (badge) {
    badge.textContent = currentUser ? "✨ Tailored For You" : "🔥 Popular Picks";
  }

  grid.innerHTML = recs.slice(0, 4).map(product => {
    const inWishlist = isInWishlist(product.id);
    return `
    <div class="product-card" style="border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px var(--card-shadow); position: relative; cursor: pointer;" onclick="openProductModal(${product.id})">
      <span class="wishlist-heart ${inWishlist ? 'active' : ''}" title="${inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">${inWishlist ? '❤' : '🤍'}</span>
      
      <div>
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" class="product-img" loading="lazy" onerror="handleImageError(this)">
        </div>
        ${product.recommendationReason ? `<div style="display: inline-block; background: rgba(255, 153, 0, 0.12); color: var(--accent-color); border: 1px solid rgba(255, 153, 0, 0.3); padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; margin-bottom: 6px;">✨ ${escapeHtml(product.recommendationReason)}</div>` : ''}
        <div style="font-size: 11px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.5px;">${product.category} ${product.subcategory ? `· ${product.subcategory}` : ''}</div>
        <h3 style="font-size: 17px; font-weight: 600; margin: 0 0 6px 0; color: var(--text-primary); line-height: 1.3;">${escapeHtml(product.name)}</h3>
        
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
          <span style="color: #f39c12; font-size: 14px;">${renderStars(product.rating)}</span>
          <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${product.rating}</span>
          <span style="font-size: 12px; color: var(--text-secondary);">(${product.reviewCount || product.reviews})</span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); margin: 0 0 14px 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${escapeHtml(product.description)}</p>
      </div>

      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <div>
            <span style="font-size: 20px; font-weight: 700; color: var(--text-primary);">₹${product.price.toFixed(2)}</span>
            ${product.originalPrice && product.originalPrice > product.price ? `<span style="font-size: 13px; text-decoration: line-through; color: var(--text-secondary); margin-left: 6px;">₹${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          ${product.discount > 0 ? `<span style="background: #27ae60; color: white; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700;">${product.discount}% OFF</span>` : ''}
        </div>

        <button onclick="event.stopPropagation(); addToCartById(${product.id}, 1, ${product.variants && product.variants.length > 0 ? `'${product.variants[0]}'` : 'null'})" style="width: 100%; background: var(--accent-color); color: white; border: none; padding: 10px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>🛒</span> Add to Cart
        </button>
      </div>
    </div>
  `}).join('');
}

// 7. Event Wireups for Auth & Profile Modals
// 7. Event Wireups for Auth, Welcome Screen & Modals
function initAuthModalEvents() {
  const authBtn = document.getElementById('auth-button');
  if (authBtn) {
    authBtn.addEventListener('click', () => {
      if (currentUser) {
        populatePreferencesForm(currentUser.preferences);
        document.getElementById('profile-modal').style.display = 'flex';
      } else {
        const reasonBanner = document.getElementById('auth-modal-reason-banner');
        if (reasonBanner) reasonBanner.style.display = 'none';
        document.getElementById('auth-modal').style.display = 'flex';
      }
    });
  }

  const closeAuthBtn = document.getElementById('close-auth-modal');
  if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', () => {
      document.getElementById('auth-modal').style.display = 'none';
      const reasonBanner = document.getElementById('auth-modal-reason-banner');
      if (reasonBanner) reasonBanner.style.display = 'none';
    });
  }

  const authModal = document.getElementById('auth-modal');
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        authModal.style.display = 'none';
        const reasonBanner = document.getElementById('auth-modal-reason-banner');
        if (reasonBanner) reasonBanner.style.display = 'none';
      }
    });
  }

  const googleModal = document.getElementById('google-auth-modal');
  if (googleModal) {
    googleModal.addEventListener('click', (e) => {
      if (e.target === googleModal) googleModal.style.display = 'none';
    });
  }

  const phoneModal = document.getElementById('phone-otp-modal');
  if (phoneModal) {
    phoneModal.addEventListener('click', (e) => {
      if (e.target === phoneModal) phoneModal.style.display = 'none';
    });
  }

  const closeProfileBtn = document.getElementById('close-profile-modal');
  if (closeProfileBtn) {
    closeProfileBtn.addEventListener('click', () => {
      document.getElementById('profile-modal').style.display = 'none';
    });
  }

  const profileModal = document.getElementById('profile-modal');
  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) profileModal.style.display = 'none';
    });
  }

  // Auth Modal Tabs
  const tabSignin = document.getElementById('auth-tab-signin');
  const tabSignup = document.getElementById('auth-tab-signup');
  const formSignin = document.getElementById('signin-form');
  const formSignup = document.getElementById('signup-form');
  const modalTitle = document.getElementById('auth-modal-title');

  if (tabSignin && tabSignup) {
    tabSignin.addEventListener('click', () => {
      tabSignin.style.borderBottom = '3px solid var(--accent-color)';
      tabSignin.style.color = 'var(--accent-color)';
      tabSignin.style.fontWeight = '700';
      tabSignup.style.borderBottom = '3px solid transparent';
      tabSignup.style.color = 'var(--text-secondary)';
      tabSignup.style.fontWeight = '600';
      if (formSignin) formSignin.style.display = 'block';
      if (formSignup) formSignup.style.display = 'none';
      if (modalTitle) modalTitle.textContent = 'Sign In to Shop Express';
      const alertBox = document.getElementById('auth-error-alert');
      if (alertBox) alertBox.style.display = 'none';
    });

    tabSignup.addEventListener('click', () => {
      tabSignup.style.borderBottom = '3px solid var(--accent-color)';
      tabSignup.style.color = 'var(--accent-color)';
      tabSignup.style.fontWeight = '700';
      tabSignin.style.borderBottom = '3px solid transparent';
      tabSignin.style.color = 'var(--text-secondary)';
      tabSignin.style.fontWeight = '600';
      if (formSignin) formSignin.style.display = 'none';
      if (formSignup) formSignup.style.display = 'block';
      if (modalTitle) modalTitle.textContent = 'Create Shop Express Account';
      const alertBox = document.getElementById('auth-error-alert');
      if (alertBox) alertBox.style.display = 'none';
    });
  }

  // Modal Sign In Form
  if (formSignin) {
    formSignin.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = document.getElementById('signin-email').value.trim();
      const password = document.getElementById('signin-password').value;
      handleSignIn(identifier, password, 'modal');
    });
  }

  // Modal Sign Up Form
  if (formSignup) {
    formSignup.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirmEl = document.getElementById('signup-confirm-password');
      const confirmPassword = confirmEl ? confirmEl.value : password;
      const phone = document.getElementById('signup-phone').value.trim();

      const prefCats = [];
      document.querySelectorAll('input[name="signup-pref-cat"]:checked').forEach(c => prefCats.push(c.value));
      const clothingSizeEl = document.getElementById('signup-pref-clothing-size');
      const shoeSizeEl = document.getElementById('signup-pref-shoe-size');

      const ageEl = document.getElementById('signup-age');
      const genderEl = document.getElementById('signup-gender');
      const ageRange = ageEl ? ageEl.value : '25-34';
      const gender = genderEl ? genderEl.value : '';

      const preferences = {
        ageRange,
        gender,
        preferredCategories: prefCats.length > 0 ? prefCats : ['fashion', 'electronics'],
        clothingSize: clothingSizeEl ? clothingSizeEl.value : 'M',
        shoeSize: shoeSizeEl ? shoeSizeEl.value : '9'
      };

      handleSignUp(name, email, password, confirmPassword, phone, preferences, 'modal');
    });
  }

  // Welcome Screen Sign In Form
  const welcomeSigninForm = document.getElementById('welcome-signin-form');
  if (welcomeSigninForm) {
    welcomeSigninForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = document.getElementById('welcome-signin-identifier').value.trim();
      const password = document.getElementById('welcome-signin-password').value;
      handleSignIn(identifier, password, 'welcome');
    });
  }

  // Welcome Screen Sign Up Form
  const welcomeSignupForm = document.getElementById('welcome-signup-form');
  if (welcomeSignupForm) {
    welcomeSignupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('welcome-signup-name').value.trim();
      const email = document.getElementById('welcome-signup-email').value.trim();
      const phone = document.getElementById('welcome-signup-phone').value.trim();
      const password = document.getElementById('welcome-signup-password').value;
      const confirmPassword = document.getElementById('welcome-signup-confirm').value;

      const prefCats = [];
      document.querySelectorAll('input[name="welcome-pref-cat"]:checked').forEach(c => prefCats.push(c.value));
      const clothingSizeEl = document.getElementById('welcome-pref-clothing-size');
      const shoeSizeEl = document.getElementById('welcome-pref-shoe-size');
      const ageEl = document.getElementById('welcome-signup-age');
      const genderEl = document.getElementById('welcome-signup-gender');
      const ageRange = ageEl ? ageEl.value : '25-34';
      const gender = genderEl ? genderEl.value : '';

      const preferences = {
        ageRange,
        gender,
        preferredCategories: prefCats.length > 0 ? prefCats : ['fashion', 'electronics'],
        clothingSize: clothingSizeEl ? clothingSizeEl.value : 'M',
        shoeSize: shoeSizeEl ? shoeSizeEl.value : '9'
      };

      handleSignUp(name, email, password, confirmPassword, phone, preferences, 'welcome');
    });
  }

  const fillDemoBtn = document.getElementById('fill-demo-account-btn');
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => fillDemoCredentials('modal'));
  }

  const googleBtn = document.getElementById('google-signin-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', openGoogleAuthModal);
  }

  const phoneLoginBtn = document.getElementById('toggle-phone-login-btn');
  if (phoneLoginBtn) {
    phoneLoginBtn.addEventListener('click', openPhoneOtpModal);
  }

  const quickLogoutBtn = document.getElementById('quick-logout-btn');
  if (quickLogoutBtn) {
    quickLogoutBtn.addEventListener('click', () => logoutUser(true));
  }

  const prefForm = document.getElementById('preferences-form');
  if (prefForm) {
    prefForm.addEventListener('submit', handleSavePreferences);
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => logoutUser(true));
  }
}

function checkInitialAuthState() {
  if (authToken) {
    showProducts();
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash === 'cart') showCart();
    else if (initialHash === 'wishlist') showWishlist();
    else if (initialHash === 'orders') showOrders();
    else if (initialHash === 'checkout') showPayment();
  } else if (isGuestMode()) {
    showProducts();
    updateAuthUI(null);
  } else {
    showWelcomeScreen();
  }
}

// Global function exports for inline HTML event handlers
window.handleLogoClick = handleLogoClick;
window.showWelcomeScreen = showWelcomeScreen;
window.isGuestMode = isGuestMode;
window.promptAuthForAction = promptAuthForAction;
window.executePendingAction = executePendingAction;
window.guestBrowseCatalog = guestBrowseCatalog;
window.switchWelcomeAuthTab = switchWelcomeAuthTab;
window.fillDemoCredentials = fillDemoCredentials;
window.openGoogleAuthModal = openGoogleAuthModal;
window.closeGoogleAuthModal = closeGoogleAuthModal;
window.submitGoogleLogin = submitGoogleLogin;
window.handleCustomGoogleSubmit = handleCustomGoogleSubmit;
window.openPhoneOtpModal = openPhoneOtpModal;
window.closePhoneOtpModal = closePhoneOtpModal;
window.resetPhoneOtpForm = resetPhoneOtpForm;
window.handleSendPhoneOtp = handleSendPhoneOtp;
window.handleVerifyPhoneOtp = handleVerifyPhoneOtp;
window.logoutUser = logoutUser;
window.checkInitialAuthState = checkInitialAuthState;

// Initialization
loadAllState();
initAuthModalEvents();
restoreAuthSession();
renderProducts();
fetchProductsFromBackend();
fetchAndRenderRecommendations();
checkInitialAuthState();