import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Remove existing products
    console.log("Deleting existing products...");
    await Product.deleteMany({});

    const url = "https://dummyjson.com/products?limit=100";

    // Fetch products from DummyJSON
    console.log("Fetching products...");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers.get("content-type"));

    const data = await response.json();
    const externalProducts = data.products;

    // Transform data
    const transformedProducts = externalProducts.map((prod) => {
      const rawCategory = (prod.category || "").toLowerCase();

      let cleanCategory = rawCategory;

      if (
        rawCategory.includes("smartphones") ||
        rawCategory.includes("mobile") ||
        rawCategory.includes("laptops")
      ) {
        cleanCategory = "electronics";
      } else if (
        rawCategory.includes("mens-watches") ||
        rawCategory.includes("womens-watches") ||
        rawCategory.includes("motorcycle")
      ) {
        cleanCategory = "wearables gaming gears";
      } else if (
        rawCategory.includes("furniture") ||
        rawCategory.includes("home-decoration")
      ) {
        cleanCategory = "furniture";
      } else if (rawCategory.includes("beauty")) {
        cleanCategory = "beauty";
      } else if (rawCategory.includes("fragrances")) {
        cleanCategory = "fragrances";
      }

      return {
        title: prod.title,
        description: prod.description,
        category: cleanCategory,
        brand: prod.brand || "Unknown Brand",
        price: Number(prod.price),
        stock: Number(prod.stock),
        ratings: Number(prod.rating),

        // Schema expects [String]
        image:
          prod.images && prod.images.length > 0
            ? prod.images
            : [prod.thumbnail],

        // Schema expects [String]
        tags: [
          cleanCategory,
          ...(prod.tags ?? [])
        ].map((tag) => tag.toLowerCase()),
      };
    });

    // Insert products
    await Product.insertMany(transformedProducts);

    console.log(
      `${transformedProducts.length} products inserted successfully!`
    );

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();