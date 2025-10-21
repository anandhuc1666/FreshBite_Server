import User from "../../models/userSchema.js";
import bcrypt from "bcrypt"
import CustomError from "../../utils/customError.js";
import { gtUserToken } from "../../utils/jwt.js";


export const adminLogin = async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return next(new CustomError("plese fill the email and password"))
    }
    const findUser = await User.findOne({email:email})
    if(!findUser){
        return next(new customElements("user not found",404))
    }
    const matchPass = await bcrypt.compare(password, findUser.password)
    if(!matchPass){
        return next(new customElements("user password invalid"))
    }
    const userToken = gtUserToken(findUser._id);
      res.cookie("userToken", userToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).json({ message: "User loggin sucess", userToken });
    

}