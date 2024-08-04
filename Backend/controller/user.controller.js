import { createTokenAndSaveCookie } from "../jwt/generatedToken.js";
import User from "../model/user.js";
import bcryptjs from "bcryptjs";
export const Signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullName,
      email,
      password: hashPassword,
      role: role || "customer",
    });
    await createdUser.save();
    res.status(201).json({
      message: "User created Successfully",
      user: {
        _id: createdUser._id,
        fullName: createdUser.fullName,
        email: createdUser.email,
        role: createdUser.role,
      },
    });
  } catch (error) {
    console.log("Error" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    } else {
      createTokenAndSaveCookie(user._id, res);
      res.status(200).json({
        message: "Login Successfully",
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      });
    }
  } catch (error) {
    console.log("Error" + error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logout Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const getuser = async(req,res)=>{
  res.json({ user: req.user });
}