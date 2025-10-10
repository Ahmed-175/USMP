import { Request, Response } from "express";
import User from "../../models/user.model";
import { signUpSchema } from "../../utils/joiSchema.util";
import { createAccessToken } from "../../utils/jwt.util";

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = signUpSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        message: "Validation error",
        details: error.details.map((err) => err.message),
      });
      return;
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ message: "This email is already in use." });
      return;
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ message: "This username is already taken." });
      return;
    }

    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
      return;
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = createAccessToken({ _id: newUser._id });
    res.cookie("accessToken", token);
    res.status(201).json({
      message: "Registration successful.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.error("Error in sign-up processing:", error.message);
    res
      .status(500)
      .json({ message: "Error during sign-up. Please try again." });
  }
};

export default signUp;
