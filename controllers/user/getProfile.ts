import { Request, Response } from "express";
import User from "../../models/user.model";

const getProfile = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as any).user;

    const user = await User.findById(_id)
      .populate("followings")
      .populate("followers")
      .populate("posts")
      .populate("postsLiked")
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "Get User info successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        jobTitle: user.jobTitle,
        skills: user.skills,
        banner: user.banner,
        followings: user.followings,
        followers: user.followers,
        communities: user.communities,
        posts: user.posts,
        postsLiked: user.postsLiked,
        notifications: user.notifications,
      },
    });
  } catch (error: any) {
    console.log("Error in editProfile:", error.message);
    res.status(500).json({ message: "Server error while editing profile" });
  }
};

export default getProfile;
