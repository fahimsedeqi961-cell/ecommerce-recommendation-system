import User from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"



export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "This email is already registered" });
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Registered Successfully!",
      data: {
        id: newUser._id,
        name: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.log("Registration error:", error)
    res.status(500).json({
      message: "Internal server registry error",
      error: error.message
    })
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find the user 
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password credentials." });
    }

    // if passowrd matched atach token 
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000
    })

    res.json({
      success: true,
      message: "Login successfull!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Internal server login error." })
  }
};


// Logout 
export const logout = async (req, res) => {
  // Overwrites the token cookie with an empty string and instantly expires it
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0), // Sets expiration date to past to clear it instantly
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Logout error", error)
    return re.status(500).json({ message: "Internal server logout error" })
  }
};
