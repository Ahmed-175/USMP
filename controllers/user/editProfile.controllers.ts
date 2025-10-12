import { Request, Response } from "express";
import User from "../../models/user.model";

const editProfile = async (req: Request, res: Response) => {
  try {
    // Extract user info and user ID
    const { userInfo } = req.body;
    const { _id } = (req as any).user; // user is set by auth middleware

    // Find user by ID
    const user = await User.findById(_id);

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update allowed fields only
    // This ensures that no one can modify restricted fields like password or _id
    const allowedUpdates = [
      "avatar",
      "bio",
      "jobTitle",
      "skills",
      "banner",
      "search_keywords"
    ];

    for (const key of allowedUpdates) {
      if (userInfo[key] !== undefined) {
        (user as any)[key] = userInfo[key];
      }
    }

    // Save the updated user document
    const updatedUser = await user.save();

    // Return success response
    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
        jobTitle: updatedUser.jobTitle,
        skills: updatedUser.skills,
        banner: updatedUser.banner,
        search_keywords: updatedUser.search_keywords,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error: any) {
    console.log("Error in editProfile:", error.message);
    res.status(500).json({ message: "Server error while editing profile" });
  }
};

export default editProfile;
