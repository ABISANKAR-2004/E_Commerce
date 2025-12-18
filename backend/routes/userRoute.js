import {
  createUser,
  deleteUser,
  sendOTP,
  verifyOtp,
  updatePassword,
  loginUser,
  getUser,
} from "../controllers/UserController.js";
import express from "express";
import { isUser } from "../middlewares/isAuth.js";


const router = express.Router();

router.get("/getuser",isUser,getUser)
router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/sendotp", sendOTP);
router.post("/verifyotp", verifyOtp);
router.put("/updatepwd", updatePassword);
router.delete("/delete", isUser, deleteUser);

export default router;
