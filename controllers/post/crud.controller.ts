import { Request, Response } from "express";
import Post from "../../models/post.model";
import User from "../../models/user.model";
import { Types } from "mongoose";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content, images, video, community, tags } = req.body;
    const userId = (req as any).user?._id;
    if (!content && !images && video) {
      return res.status(401).json({
        message: "to create post at least write content",
        success: false,
      });
    }
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Post content is required",
      });
    }

    if (content.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Post content cannot exceed 2000 characters",
      });
    }

    const postData: any = {
      content: content.trim(),
      author: userId,
    };

    if (images && Array.isArray(images)) {
      postData.images = images;
    }

    if (community && Types.ObjectId.isValid(community)) {
      postData.community = community;
    }

    if (tags && Array.isArray(tags)) {
      postData.tags = tags
        .map((tag: string) => tag.toLowerCase().trim())
        .filter(Boolean);
    }

    const post = new Post(postData);
    await post.save();

    // Add post to user's posts array
    await User.findByIdAndUpdate(userId, {
      $push: { posts: post._id },
    });

    const populatedPost = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("community", "name")
      .lean();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: { post: populatedPost },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating post",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId  } = req.params;
    const { content, tags } = req.body;
    const userId = (req as any).user?._id;

    if (!postId || !Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing post ID.",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    if (!existingPost.author.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own posts.",
      });
    }

    if (content !== undefined) {
      if (typeof content !== "string" || content.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Post content cannot be empty.",
        });
      }

      if (content.trim().length > 2000) {
        return res.status(400).json({
          success: false,
          message: "Post content cannot exceed 2000 characters.",
        });
      }
    }

    let formattedTags: string[] | undefined;
    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        return res.status(400).json({
          success: false,
          message: "Tags must be an array.",
        });
      }

      formattedTags = tags
        .map((tag: string) => tag.toLowerCase().trim())
        .filter((tag) => tag.length > 0 && tag.length <= 30);

      if (formattedTags.length > 10) {
        return res.status(400).json({
          success: false,
          message: "Cannot have more than 10 tags.",
        });
      }
    }
    const updateData: Record<string, any> = {};
    if (content !== undefined) updateData.content = content.trim();
    if (formattedTags !== undefined) updateData.tags = formattedTags;

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("author", "username avatar")
      .populate("community", "name")
      .lean();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully.",
      data: { post: updatedPost },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating post.",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = (req as any).user?._id;


    if (!userId || !postId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    // Find the post and verify ownership
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check if user is the author of the post
    if (!existingPost.author.equals(userId)) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);

    // Remove post from user's posts array
    await User.findByIdAndUpdate(userId, {
      $pull: { posts: postId },
    });

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting post",
    });
  }
};
