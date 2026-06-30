import dotenv from "dotenv"
dotenv.config();

import connectDB from "./config/db.js";
import Product from "./models/Product.js";


connectDB();

const getProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    const products = data.products.map((product) => ({
      title: product.title,
      description: product.description,
      category: product.category,
      brand: product.brand || "Unknown",
      price: product.price,
      stock: product.stock,
      image: product.images,
      ratings: product.rating,
      tags: product.tags
    }));

    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Products seeded successfully!");
    process.exit(0);

  } catch (error) {
    return console.log("Fialed to fetch products", error.message);
  }
}

getProducts();




