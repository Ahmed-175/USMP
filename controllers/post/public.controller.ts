import { Request, Response } from "express";
import Post from "../../models/post.model";
import { Types } from "mongoose";

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "username avatar")
      .populate("community", "name")
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      data: { posts },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching posts",
    });
  }
};

// Get single post by ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || !Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID",
      });
    }

    const post = await Post.findById(id)
      .populate("author", "username avatar bio")
      .populate("community", "name description")
      .populate("likes", "username avatar")
      .populate("views.users", "username")
      .populate("shares.users", "username")
      .lean();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      data: { post },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching post",
    });
  }
};

// Search posts
export const searchPosts = async (req: Request, res: Response) => {
  try {
    const {
      q: query,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Build search filter
    const searchFilter = {
      status: "published",
      $or: [
        { content: { $regex: query.trim(), $options: "i" } },
        { title: { $regex: query.trim(), $options: "i" } },
        { tags: { $in: [new RegExp(query.trim(), "i")] } },
      ],
    };

    // Build sort object
    const sort: any = {};
    sort[sortBy as string] = sortOrder === "desc" ? -1 : 1;

    const posts = await Post.find(searchFilter)
      .populate("author", "username avatar")
      .populate("community", "name")
      .populate("category", "name")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalPosts = await Post.countDocuments(searchFilter);

    res.json({
      success: true,
      data: {
        posts,
        query: query.trim(),
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(totalPosts / limitNum),
          totalPosts,
          hasNext: pageNum < Math.ceil(totalPosts / limitNum),
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while searching posts",
    });
  }
};

// Get trending posts based on engagement score
export const getTrendingPosts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const timeFrame = (req.query.timeFrame as string) || "7d"; // 7d, 30d, 90d, all

    let dateFilter = {};
    const now = new Date();

    switch (timeFrame) {
      case "7d":
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        };
        break;
      case "30d":
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          },
        };
        break;
      case "90d":
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
          },
        };
        break;
      default:
        dateFilter = {};
    }

    const posts = await Post.find({
      status: "published",
      ...dateFilter,
    })
      .populate("author", "username avatar")
      .populate("community", "name")
      .populate("category", "name")
      .sort({ engagementScore: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    res.json({
      success: true,
      data: { posts },
    });
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching trending posts",
    });
  }
};
