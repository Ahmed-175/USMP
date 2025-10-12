import { Request, Response } from "express";

 const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", { path: "/" });
    return res.json({ message: "Logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export default logout