import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user.type";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    jobTitle: {
      type: Types.ObjectId,
      ref: "Job",
      default: null,
    },
    skills: {
      type: [Types.ObjectId],
      ref: "Skill",
      default: [],
    },
    followings: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    followers: {
      type: [Types.ObjectId],
      ref: "User",
      default: [],
    },
    communities: {
      type: [Types.ObjectId],
      ref: "Community",
      default: [],
    },
    posts: {
      type: [Types.ObjectId],
      ref: "Post",
      default: [],
    },
    postsLiked: {
      type: [Types.ObjectId],
      ref: "Post",
      default: [],
    },
    notifications: {
      type: [Types.ObjectId],
      ref: "Notification",
      default: [],
    },
    search_keywords: {
      type: [String],
      default: [],
    },
    parametars_posts_liked_tags: {
      type: [Types.ObjectId],
      ref: "Tag",
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error while hashing the password:", error);
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Error comparing password:", error);
    return false;
  }
};

const User = model<IUser>("User", userSchema);

export default User;
