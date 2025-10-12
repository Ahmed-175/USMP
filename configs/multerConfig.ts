import fs from "fs";
import path from "path";
import multer from "multer";

// Helper function to ensure directory exists
const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const storageAvatars = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join("assets/avatars/");
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const storageBanner = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join("assets/banners/");
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
