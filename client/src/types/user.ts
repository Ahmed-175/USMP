export interface User {
 _id : string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  jobTitle?: string;
  skills?: string[];
  banner?: string;
  followings?: string[];
  followers?: string[];
  communities?: string[];
  posts?: string[];
  postsLiked?:string[];
  notifications?: string[];
}