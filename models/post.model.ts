import mongoose, { Schema, Types } from "mongoose";
import { IPost } from "../types/post.type";

const postSchema = new Schema<IPost>(
  {
    content: { type: String, required: true },
    images: [{ type: String }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    community: { type: Schema.Types.ObjectId, ref: "Community" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likedCount: { type: Number, default: 0 },
    views: {
      users: [{ type: Schema.Types.ObjectId, ref: "User" }],
      count: { type: Number, default: 0 },
    },
    shares: {
      users: [{ type: Schema.Types.ObjectId, ref: "User" }],
      count: { type: Number, default: 0 },
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    commentsCount: { type: Number, default: 0 },
    tags: [{ type: String, lowercase: true, trim: true }],
    engagementScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

postSchema.index({ content: 1, engagementScore: 1 });


postSchema.methods.addUniqueView = async function (userId?: Types.ObjectId) {
  let updated = false;
  if (
    userId &&
    !this.views.users.some((id: Types.ObjectId) => id.equals(userId))
  ) {
    this.views.users.push(userId);
    updated = true;
  }

  if (updated) {
    this.views.count = this.views.users.length;
    await this.save();
  }
};

postSchema.methods.addUniqueShare = async function (userId: Types.ObjectId) {
  const alreadyShared = this.shares.users.some((id: Types.ObjectId) =>
    id.equals(userId)
  );

  if (!alreadyShared) {
    this.shares.users.push(userId);
    this.shares.count = this.shares.users.length;
    await this.save();
  }
};

postSchema.pre("save", function (next) {
  this.engagementScore =
    this.likedCount * 2 +
    this.commentsCount * 3 +
    this.shares.count * 4 +
    this.views.count * 0.5;

  next();
});

export default mongoose.model<IPost>("Post", postSchema);
