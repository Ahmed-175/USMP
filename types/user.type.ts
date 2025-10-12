import { Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  jobTitle?: Types.ObjectId | string;
  skills: Types.ObjectId[];
  banner: string;
  followings: Types.ObjectId[];
  followers: Types.ObjectId[];
  communities: Types.ObjectId[];
  posts: Types.ObjectId[];
  postsLiked: Types.ObjectId[];
  notifications: Types.ObjectId[];
  search_keywords: string[];
  parametars_posts_liked_tags: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}
