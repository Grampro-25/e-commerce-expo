// Realistic fake product data for e-commerce app
export const fakeProducts = [
    // Electronics - Smartphones
    {
        name: "iPhone 15 Pro Max",
        title: "iPhone 15 Pro Max",
        category: "electronics",
        price: 1199.99,
        originalPrice: 1299.99,
        description: "The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system. 256GB storage.",
        image: "https://images.unsplash.com/photo-1592286927505-2c3f8c800c7a?w=500",
        rating: { rate: 4.8, count: 2847 },
        stock: 45,
        isFeatured: true
    },
    {
        name: "Samsung Galaxy S24 Ultra",
        title: "Samsung Galaxy S24 Ultra",
        category: "electronics",
        price: 1099.99,
        description: "Powerful Android flagship with S Pen, 200MP camera, and stunning AMOLED display. 512GB storage.",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        rating: { rate: 4.7, count: 1923 },
        stock: 38
    },
    {
        name: "Google Pixel 8 Pro",
        title: "Google Pixel 8 Pro",
        category: "electronics",
        price: 899.99,
        originalPrice: 999.99,
        description: "Pure Android experience with incredible AI-powered camera and Google Tensor G3 chip.",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
        rating: { rate: 4.6, count: 1456 },
        stock: 8,
        isFeatured: true
    },

    // Electronics - Laptops
    {
        name: "MacBook Pro 16\" M3",
        title: "MacBook Pro 16\" M3",
        category: "electronics",
        price: 2499.99,
        description: "Professional laptop with M3 Max chip, stunning Liquid Retina XDR display, and all-day battery life.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
        rating: { rate: 4.9, count: 3421 },
        stock: 22,
        isFeatured: true
    },
    {
        name: "Dell XPS 15",
        title: "Dell XPS 15",
        category: "electronics",
        price: 1799.99,
        originalPrice: 1999.99,
        description: "Premium Windows laptop with Intel Core i7, NVIDIA RTX graphics, and stunning InfinityEdge display.",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
        rating: { rate: 4.5, count: 987 },
        stock: 15
    },
    {
        name: "Microsoft Surface Laptop 5",
        title: "Microsoft Surface Laptop 5",
        category: "electronics",
        price: 1299.99,
        description: "Sleek ultrabook with touchscreen, perfect for work and creativity. Intel Evo platform.",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
        rating: { rate: 4.4, count: 756 },
        stock: 31
    },

    // Electronics - Headphones
    {
        name: "Sony WH-1000XM5",
        title: "Sony WH-1000XM5",
        category: "electronics",
        price: 349.99,
        originalPrice: 399.99,
        description: "Industry-leading noise cancelling headphones with exceptional sound quality and 30-hour battery.",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500",
        rating: { rate: 4.8, count: 4532 },
        stock: 67
    },
    {
        name: "AirPods Pro (2nd Gen)",
        title: "AirPods Pro (2nd Gen)",
        category: "electronics",
        price: 249.99,
        description: "Premium wireless earbuds with active noise cancellation, spatial audio, and MagSafe charging.",
        image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500",
        rating: { rate: 4.7, count: 8921 },
        stock: 5,
        isFeatured: true
    },

    // Fashion - Men's Clothing
    {
        name: "Classic Denim Jacket",
        title: "Classic Denim Jacket",
        category: "men's clothing",
        price: 79.99,
        description: "Timeless blue denim jacket with vintage wash. Perfect for layering in any season.",
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500",
        rating: { rate: 4.5, count: 342 },
        stock: 48
    },
    {
        name: "Premium White Oxford Shirt",
        title: "Premium White Oxford Shirt",
        category: "men's clothing",
        price: 59.99,
        originalPrice: 89.99,
        description: "Classic white button-down shirt made from 100% premium cotton. Essential wardrobe staple.",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
        rating: { rate: 4.6, count: 567 },
        stock: 92
    },
    {
        name: "Slim Fit Chinos",
        title: "Slim Fit Chinos",
        category: "men's clothing",
        price: 69.99,
        description: "Modern slim-fit chinos in versatile khaki. Comfortable stretch fabric for all-day wear.",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
        rating: { rate: 4.4, count: 423 },
        stock: 73
    },
    {
        name: "Leather Jacket",
        title: "Leather Jacket",
        category: "men's clothing",
        price: 299.99,
        originalPrice: 399.99,
        description: "Genuine leather biker jacket with quilted shoulders. Rugged yet sophisticated style.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        rating: { rate: 4.8, count: 892 },
        stock: 18,
        isFeatured: true
    },

    // Fashion - Women's Clothing
    {
        name: "Floral Summer Dress",
        title: "Floral Summer Dress",
        category: "women's clothing",
        price: 89.99,
        description: "Beautiful floral print maxi dress perfect for summer occasions. Lightweight and flowing.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        rating: { rate: 4.7, count: 1234 },
        stock: 42
    },
    {
        name: "Elegant Black Blazer",
        title: "Elegant Black Blazer",
        category: "women's clothing",
        price: 129.99,
        originalPrice: 179.99,
        description: "Tailored black blazer for professional and formal occasions. Premium quality fabric.",
        image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=500",
        rating: { rate: 4.6, count: 678 },
        stock: 34,
        isFeatured: true
    },
    {
        name: "High-Waisted Jeans",
        title: "High-Waisted Jeans",
        category: "women's clothing",
        price: 79.99,
        description: "Trendy high-waisted skinny jeans with stretch comfort. Classic dark wash.",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
        rating: { rate: 4.5, count: 987 },
        stock: 61
    },
    {
        name: "Cashmere Sweater",
        title: "Cashmere Sweater",
        category: "women's clothing",
        price: 159.99,
        description: "Luxurious 100% cashmere crewneck sweater. Incredibly soft and warm.",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
        rating: { rate: 4.9, count: 543 },
        stock: 27
    },

    // Jewelry
    {
        name: "Diamond Stud Earrings",
        title: "Diamond Stud Earrings",
        category: "jewelery",
        price: 499.99,
        originalPrice: 599.99,
        description: "Elegant 14K white gold diamond stud earrings. 0.5 carat total weight, clarity SI1.",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
        rating: { rate: 4.8, count: 432 },
        stock: 12,
        isFeatured: true
    },
    {
        name: "Gold Chain Necklace",
        title: "Gold Chain Necklace",
        category: "jewelery",
        price: 299.99,
        description: "Classic 18K gold plated chain necklace. Timeless design that pairs with any outfit.",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
        rating: { rate: 4.6, count: 789 },
        stock: 28
    },
    {
        name: "Silver Bracelet Set",
        title: "Silver Bracelet Set",
        category: "jewelery",
        price: 149.99,
        originalPrice: 199.99,
        description: "Set of 3 sterling silver bracelets. Mix and match for a layered look.",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500",
        rating: { rate: 4.5, count: 234 },
        stock: 3
    },
    {
        name: "Rose Gold Watch",
        title: "Rose Gold Watch",
        category: "jewelery",
        price: 249.99,
        description: "Elegant rose gold watch with leather strap. Japanese quartz movement, water resistant.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
        rating: { rate: 4.7, count: 1021 },
        stock: 19
    },

    // Home & Living
    {
        name: "Smart LED Light Bulbs (4-Pack)",
        title: "Smart LED Light Bulbs (4-Pack)",
        category: "electronics",
        price: 49.99,
        originalPrice: 69.99,
        description: "WiFi enabled color-changing LED bulbs. Control with voice or app. 16 million colors.",
        image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500",
        rating: { rate: 4.4, count: 2341 },
        stock: 156
    },
    {
        name: "Robot Vacuum Cleaner",
        title: "Robot Vacuum Cleaner",
        category: "electronics",
        price: 399.99,
        originalPrice: 499.99,
        description: "Smart robot vacuum with mapping technology, app control, and auto-empty base.",
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500",
        rating: { rate: 4.6, count: 1876 },
        stock: 24,
        isFeatured: true
    },

    // Fitness & Sports
    {
        name: "Wireless Running Earbuds",
        title: "Wireless Running Earbuds",
        category: "electronics",
        price: 129.99,
        description: "Sport earbuds with secure fit, sweat resistance, and 8-hour battery life.",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
        rating: { rate: 4.5, count: 1567 },
        stock: 89
    },
    {
        name: "Yoga Mat Premium",
        title: "Yoga Mat Premium",
        category: "sports",
        price: 49.99,
        description: "Extra thick 6mm yoga mat with non-slip surface. Includes carrying strap.",
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
        rating: { rate: 4.7, count: 934 },
        stock: 67
    },

    // Accessories
    {
        name: "Designer Sunglasses",
        title: "Designer Sunglasses",
        category: "women's clothing",
        price: 189.99,
        originalPrice: 249.99,
        description: "Luxury sunglasses with polarized lenses and UV400 protection. Includes designer case.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
        rating: { rate: 4.6, count: 543 },
        stock: 36
    },
    {
        name: "Leather Crossbody Bag",
        title: "Leather Crossbody Bag",
        category: "women's clothing",
        price: 149.99,
        description: "Genuine leather crossbody bag with adjustable strap. Multiple compartments.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
        rating: { rate: 4.8, count: 876 },
        stock: 41,
        isFeatured: true
    },
    {
        name: "Leather Wallet",
        title: "Leather Wallet",
        category: "men's clothing",
        price: 59.99,
        originalPrice: 79.99,
        description: "Premium leather bifold wallet with RFID blocking. 8 card slots and bill compartment.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
        rating: { rate: 4.5, count: 1234 },
        stock: 94
    }
];

export default fakeProducts;
