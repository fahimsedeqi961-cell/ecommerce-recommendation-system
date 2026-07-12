import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);



router.get("/me", async (req, res) => {
  try {
    const token = req.cookies.token; // Grabs  HTTP-Only cookie automatically

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // Decode the token using  secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");

    // Fetch the user data from  DB model safely (excluding password)
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
});



export default router;