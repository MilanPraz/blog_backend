import express from "express";
import { userRegister } from "../controller/user/userRegister.js";
import { userLogin } from "../controller/user/userLogin.js";
import upload from "../multer/multer.js";
import { editProfile } from "../controller/user/user.js";

const router = express.Router();

router.post("/api/signup", userRegister);
router.post("/api/login", userLogin);
router.put("/api/editProfile", upload.single("image"), editProfile);

export default router;
