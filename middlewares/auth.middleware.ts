// middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  const decoded = verifyAccessToken(token);
  if (!decoded)
    return res.status(401).json({ message: "Invalid or expired token" });

  // Attach user id to request
  (req as any).user = { _id: decoded._id };
  next();
};