import jwt, { JwtPayload } from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET || "access-secret";

export const createAccessToken = (payload: object): string => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "30d" });
};

export const verifyAccessToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
  } catch {
    return null;
  }
};
