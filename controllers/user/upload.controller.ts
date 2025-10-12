import { Request, Response } from "express";

const upload = async (req: Request, res: Response) => {
  res.json({
    message: "File uploaded successfully!",
    file: req.file,
  });
};

export default upload;
