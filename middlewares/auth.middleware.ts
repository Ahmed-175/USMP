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

// CSRF middleware (double-submit cookie)
export const verifyCsrf = (req: Request, res: Response, next: NextFunction) => {
  const csrfCookie = req.cookies?.csrfToken;
  const csrfHeader = req.headers["x-csrf-token"];

  // For state-changing methods we require CSRF token
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    if (!csrfCookie || !csrfHeader)
      return res.status(403).json({ message: "CSRF token missing" });
    if (csrfCookie !== csrfHeader)
      return res.status(403).json({ message: "Invalid CSRF token" });
  }
  next();
};
