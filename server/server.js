


import express from "express";
import cors from "cors"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"


import dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;




const corsOptions = {
  origin: "http://localhost:5174",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));



app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());
app.use(cookieParser());



connectDB();


app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);



app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
})