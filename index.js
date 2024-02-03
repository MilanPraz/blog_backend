import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./database/connection.js";
import userRoute from "./router/userRoute.js";
import blogRoute from "./router/blogRoute.js";
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(express.static("uploads"));
dotenv.config();

connection();

//routers
app.use(userRoute);
app.use(blogRoute);

app.get("/", (req, res) => {
  res.send("hello world");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("Server Listening to PORT", PORT);
});
