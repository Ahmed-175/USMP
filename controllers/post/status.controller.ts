import { Request, Response } from "express";
import Post from "../../models/post.model";
import { Types } from "mongoose";

/**
 * Post Status Management Controllers - Authentication required
 * Publish, Archive, and other status-related operations
 */

// Publish post
export const publishPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user is the author
    if (!post.author.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You can only publish your own posts",
      });
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("community", "name")
      .populate("category", "name")
      .lean();

    res.json({
      success: true,
      message: "Post published successfully",
      data: { post: updatedPost },
    });
  } catch (error) {
    console.error("Error publishing post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while publishing post",
    });
  }
};

// Archive post
export const archivePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user is the author
    if (!post.author.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You can only archive your own posts",
      });
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("community", "name")
      .populate("category", "name")
      .lean();

    res.json({
      success: true,
      message: "Post archived successfully",
      data: { post: updatedPost },
    });
  } catch (error) {
    console.error("Error archiving post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while archiving post",
    });
  }
};

// Unarchive post (restore from archived to draft)
export const unarchivePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user is the author
    if (!post.author.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You can only unarchive your own posts",
      });
    }

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("community", "name")
      .lean();

    res.json({
      success: true,
      message: "Post unarchived successfully",
      data: { post: updatedPost },
    });
  } catch (error) {
    console.error("Error unarchiving post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while unarchiving post",
    });
  }
};

