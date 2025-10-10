import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./configs/connectDB";

dotenv.config();
const app : Application = express();
const PORT = process.env.PORT || 3001 ;



app.get("/health" , (req :Request , res : Response)  => {
res.status(200).json({health : "ok"})
})


app.listen(PORT , ()=> {
     console.log(`server running on http://localhost:${PORT}`)
     connectDB();
})