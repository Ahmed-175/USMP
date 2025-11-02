import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./configs/connectDB";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.routes";
import userRoutes from "./routes/userRoutes.routes";
import postRoutes from "./routes/postRoutes.routes";
import path from "path";
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3001;
const COOKIE_SECRET = process.env.COOKIE_SECRET || "secet-fake";
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser(COOKIE_SECRET));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ health: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/avatar", express.static(path.join(path.resolve(), "assets/avatars")));

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  connectDB();
});
