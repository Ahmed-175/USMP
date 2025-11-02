import { Request, Response } from "express";
import User from "../../models/user.model";

const upload = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as any).user;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    user.avatar = req.file.filename;
    await user.save();

    res.status(200).json({
      message: "File uploaded and user updated successfully!",
      file: {
        originalName: req.file.originalname,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size,
      },
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Server error during upload",
      error: error.message,
    });
  }
};

export default upload;
