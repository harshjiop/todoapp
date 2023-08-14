import express from "express";
import cors from "cors";
import userrouts from "./routes/userRouts.js";
import todorouts from "./routes/todoRouts.js";
import connectTodb from "./conn/connect.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    // origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectTodb();
app.use("/", userrouts);
app.use("/todo", todorouts);
export default app;
