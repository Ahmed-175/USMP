import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./configs/connectDB";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.routes";
dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3001;
const COOKIE_SECRET = process.env.COOKIE_SECRET || "secet-fake"

app.use(
  cors({
    origin: ["http://localhost:5617"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser(COOKIE_SECRET));

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ health: "ok"});
});

app.use("/api/auth" , authRoutes)

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
  connectDB();
});
