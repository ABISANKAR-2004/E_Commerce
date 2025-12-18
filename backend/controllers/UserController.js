import jwt from "jsonwebtoken"
import { userModel } from "../models/UserModel.js";
import TryCatch from "../utilities/TryCatch.js";
import { pwdHash, comparePwd } from "../utilities/hashing.js";
import sendOtp from "../utilities/sendOtp.js";
import { OtpModel } from "../models/OtpModel.js";

// CREATE USER (SIGNUP)
export const createUser = TryCatch(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const resultPwd = await pwdHash(password);

  const user = await userModel.create({
    name,
    email,
    phone,
    password: resultPwd,
  });

  return res.status(201).json({
    user,
    message: "User Created Successfully",
  });
});


// DELETE USER
export const deleteUser = TryCatch(async (req, res) => {
  const  userId  = req.user.userId;

  await userModel.deleteOne({ _id: userId });

  return res.status(200).json({
    message: "User Deleted Successfully",
  });
});


// SEND OTP
export const sendOTP = TryCatch(async (req, res) => {
  const { email } = req.body;

  const subject = "AIT STORE";
  const otp = Math.floor(Math.random() * 1000000);

  const prevOtp = await OtpModel.findOne({ email });
  if (prevOtp) await prevOtp.deleteOne();

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Enter a correct email ID" });
  }

  const userName = user.name;

  await sendOtp({ email, userName, subject, otp });
  await OtpModel.create({ email, otp });

  return res.status(200).json({
    message: "OTP sent to your email",
  });
});


// VERIFY OTP
export const verifyOtp = TryCatch(async (req, res) => {
  const { email, otp } = req.body;
  
  const storedOtp = await OtpModel.findOne({ email });
  
  if (!storedOtp) {
    return res.status(404).json({
      message: "OTP not found",
    });
  }

  if (storedOtp.otp === Number(otp)) {
    return res.status(200).json({
      message: "OTP matched successfully",
    });
  }

  return res.status(401).json({
    message: "OTP mismatched",
  });
});


// UPDATE PASSWORD
export const updatePassword = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User Not Found",
    });
  }

  const resultPwd = await pwdHash(password);

  await userModel.updateOne(
    { email },
    { $set: { password: resultPwd } }
  );

  return res.status(200).json({
    message: "Password Updated Successfully",
  });
});

export const getUser = TryCatch( async(req, res) => {
    const {userId} = req.user;

    const user = await userModel.findById({_id:userId});

    return res.status(200).json({user,message:"user found"});
})

// ------------------------------------------------------------

// LOGIN USER
export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "First Sign Up Your Account",
    });
  }

  const isMatch = await comparePwd(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid password credentials",
    });
  }
  const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,
    {expiresIn:"7d"}
  )

  return res.status(200).json({token,
    message: "Logged In Successfully",
  });
});
