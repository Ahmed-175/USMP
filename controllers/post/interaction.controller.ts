import { Request, Response } from "express";
import Post from "../../models/post.model";
import User from "../../models/user.model";
import { Types } from "mongoose";

/**
 * Post Interaction Controllers - Authentication required
 * Like, Unlike, View, Share operations for posts
 */

// Like post
export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?._id;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }
    
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid post ID" 
      });
    }
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found" 
      });
    }
    
    // Check if already liked
    const alreadyLiked = post.likes.some(likeId => likeId.equals(userId));
    if (alreadyLiked) {
      return res.status(400).json({ 
        success: false, 
        message: "Post already liked" 
      });
    }
    
    // Add like
    post.likes.push(userId);
    post.likedCount = post.likes.length;
    await post.save();
    
    // Add to user's liked posts
    await User.findByIdAndUpdate(userId, {
      $push: { postsLiked: post._id }
    });
    
    res.json({
      success: true,
      message: "Post liked successfully",
      data: { likedCount: post.likedCount }
    });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while liking post" 
    });
  }
};

// Unlike post
export const unlikePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?._id;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }
    
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid post ID" 
      });
    }
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found" 
      });
    }
    
    // Check if already liked
    const alreadyLiked = post.likes.some(likeId => likeId.equals(userId));
    if (!alreadyLiked) {
      return res.status(400).json({ 
        success: false, 
        message: "Post not liked yet" 
      });
    }
    
    // Remove like
    post.likes = post.likes.filter(likeId => !likeId.equals(userId));
    post.likedCount = post.likes.length;
    await post.save();
    
    // Remove from user's liked posts
    await User.findByIdAndUpdate(userId, {
      $pull: { postsLiked: post._id }
    });
    
    res.json({
      success: true,
      message: "Post unliked successfully",
      data: { likedCount: post.likedCount }
    });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while unliking post" 
    });
  }
};

// Add unique view
export const addView = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?._id;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }
    
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid post ID" 
      });
    }
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found" 
      });
    }
    
    // Add unique view using the model method
    await post.addUniqueView(userId);
    
    res.json({
      success: true,
      message: "View added successfully",
      data: { viewCount: post.views.count }
    });
  } catch (error) {
    console.error("Error adding view:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while adding view" 
    });
  }
};

// Share post
export const sharePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { platform = "internal" } = req.body;
    const userId = (req as any).user?._id;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }
    
    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid post ID" 
      });
    }
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found" 
      });
    }
    
    // Add unique share using the model method
    await post.addUniqueShare(userId, platform);
    
    res.json({
      success: true,
      message: "Post shared successfully",
      data: { shareCount: post.shares.count }
    });
  } catch (error) {
    console.error("Error sharing post:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error while sharing post" 
    });
  }
};

