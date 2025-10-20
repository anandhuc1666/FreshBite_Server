import User from "../../models/userSchema.js";
import bcrypt from "bcrypt";
import { gtUserToken } from "../../utils/jwt.js";
import CustomError from "../../utils/customError.js";

//create a new user-----------//
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Invalid Credentials", 400));
  }
  //check the email & password is 200--------//
  const user = await User.findOne({ email: email});
  if (!user) {
    
    return next(new CustomError("user not found",404))
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("password is invalid",400))
  }
  const userToken = gtUserToken(user._id);
  res.cookie("userToken", userToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "User loggin sucess", userToken });
};

//register a new user -------------//
export const register = async (req, res, next) => {
  const { name, email, password, number } = req.body;
  if (!name || !email || !password || !number) {
    return next(new CustomError("invalide credentials",404))
  }
  const checkUser = await User.findOne({ email: email });
  console.log(checkUser);
  if (checkUser) {
    return next(new CustomError("user are exsisted",400))
  }
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User({
    name: name,
    email: email,
    password: hashedPassword,
    number: number,
  });
  console.log(newUser)
  await newUser.save();
  res.status(201).json({ message: "new user is created" });
};

export const logOut = async(req,res)=>{
   res.clearCookie("userToken",{
    httpOnly: true,
    secure: true,
    sameSite: "lax",
   })
   console.log("delete")
   res.status(200).json({message:"user is delete"})
}