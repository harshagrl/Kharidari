import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    stock: 50,
    rating: 4.5,
    numReviews: 120,
  },
  {
    name: "Smart Watch",
    description:
      "Feature-rich smartwatch with fitness tracking, heart rate monitor, and smartphone connectivity.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Electronics",
    stock: 30,
    rating: 4.7,
    numReviews: 89,
  },
  {
    name: "Laptop Backpack",
    description:
      "Durable laptop backpack with padded compartments and USB charging port.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Accessories",
    stock: 75,
    rating: 3.8,
    numReviews: 45,
  },
  {
    name: "Running Shoes",
    description:
      "Comfortable running shoes with cushioned sole and breathable mesh upper.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Clothing",
    stock: 100,
    rating: 4.6,
    numReviews: 200,
  },
  {
    name: "Coffee Maker",
    description:
      "Programmable coffee maker with thermal carafe and auto-shutoff feature.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500",
    category: "Home & Kitchen",
    stock: 40,
    rating: 4.4,
    numReviews: 67,
  },
  {
    name: "Yoga Mat",
    description:
      "Non-slip yoga mat with carrying strap, perfect for all types of yoga practice.",
    price: 29.99,
    image:
      "https://m.media-amazon.com/images/I/61d049-EBiL._AC_UF894,1000_QL80_.jpg",
    category: "Sports",
    stock: 60,
    rating: 3.6,
    numReviews: 34,
  },
  {
    name: "Bluetooth Speaker",
    description:
      "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    category: "Electronics",
    stock: 45,
    rating: 4.5,
    numReviews: 156,
  },
  {
    name: "Desk Lamp",
    description:
      "LED desk lamp with adjustable brightness and color temperature settings.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    category: "Home & Kitchen",
    stock: 55,
    rating: 3.9,
    numReviews: 78,
  },
  {
    name: "Water Bottle",
    description:
      "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    category: "Accessories",
    stock: 80,
    rating: 4.6,
    numReviews: 92,
  },
  {
    name: "Wireless Mouse",
    description:
      "Ergonomic wireless mouse with precision tracking and long battery life.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    category: "Electronics",
    stock: 70,
    rating: 3.5,
    numReviews: 123,
  },
  {
    name: "T-Shirt",
    description:
      "100% cotton t-shirt with comfortable fit and various color options.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Clothing",
    stock: 150,
    rating: 3.4,
    numReviews: 234,
  },
  {
    name: "Phone Case",
    description:
      "Protective phone case with shock absorption and raised edges for screen protection.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500",
    category: "Accessories",
    stock: 200,
    rating: 3.7,
    numReviews: 189,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
