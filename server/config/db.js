import mongoose from "mongoose"


async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Databse Connected successfully");
  }
  catch (error) {
    console.log("Database Connection Fialed", error.message);
    process.exit(1);
  }
}

export default connectDB;