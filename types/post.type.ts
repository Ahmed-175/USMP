import { Types } from "mongoose";
import { Document } from "mongoose";

export interface IPost extends Document {
  content: string;
  images?: string[];
  video? : string[];
  community : Types.ObjectId;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
  likedCount: number;
  views: {
    users: Types.ObjectId[];
    count: number;
  };
  shares: {
    users: Types.ObjectId[];
    count: number;
  };
  comments: Types.ObjectId[];
  commentsCount: number;
  tags?: string[];
  engagementScore: number;
  createdAt: Date;
  updatedAt: Date;
  addUniqueView(userId?: Types.ObjectId, ipHash?: string): Promise<void>;
  addUniqueShare(userId: Types.ObjectId, platform: string): Promise<void>;
}
