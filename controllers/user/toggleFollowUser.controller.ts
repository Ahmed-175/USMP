import { Request, Response } from "express";
import User from "../../models/user.model";

const toggleFollowUser = async (req: Request, res: Response) => {
  try {
    const { _id } = (req as any).user;

    const targetUserId = req.params.id;

    if (_id.toString() === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(_id);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.followings.includes(targetUserId as any);

    if (isFollowing) {
      currentUser.followings = currentUser.followings.filter(
        (id) => id.toString() !== targetUserId
      );
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== _id.toString()
      );
      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // If not following, follow
      currentUser.followings.push(targetUserId as any);
      targetUser.followers.push(_id as any);
      await currentUser.save();
      await targetUser.save();

      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.error("Error in toggleFollowUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default toggleFollowUser;
