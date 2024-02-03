import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createBlog,
  deleteBlog,
  editBlog,
  getBlogById,
  getBlogs,
  getRecentBlog,
  getUserBlogs,
} from "../controller/user/blog.js";
import upload from "../multer/multer.js";

const router = express.Router();

router.post("/api/createBlog", auth, upload.single("image"), createBlog);
router.get("/api/getBlogs", getBlogs);
router.get("/api/getUserBlogs", auth, getUserBlogs);
router.get("/api/getBlog/:id", getBlogById);
router.get("/api/getRecentBlog", getRecentBlog);
router.delete("/api/deleteBlog/:id", auth, deleteBlog);
router.put("/api/editBlog/:id", auth, upload.single("image"), editBlog);
export default router;
