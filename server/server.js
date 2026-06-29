import dotenv from "dotenv"
dotenv.config();


import express from "express";
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"




const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);

})