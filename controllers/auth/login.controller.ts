import { Request, Response } from "express";
import { createAccessToken } from "../../utils/jwt.util";
import User from "../../models/user.model";
import { accessCookieOptions } from "../../scripts/CookiesOptions";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email , password);
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = createAccessToken({ _id: user._id });

    res.cookie("accessToken", accessToken, accessCookieOptions);
    return res.json({
      success :true , 
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default login;
