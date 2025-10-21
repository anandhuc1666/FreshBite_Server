import User from "../../models/userSchema.js";
import CustomError from "../../utils/customError.js";

export const customer = async (req, res, next) => {
  const users = await User.find();
  if (!users || users.length === 0) {
    return next(new CustomError("user not found", 404));
  }
  const usersData = users.map((items) => ({
    _id: items._id,
    name: items.name,
    email: items.email,
    phone: items.phone,
    status: items.status,
  }));
  res.status(200).json({message:"users lists",
    users:usersData})
};
export const findUser = async(req,res,next)=>{
    const {userId}=req.params;
    const user = await User.findById(userId)
    if(!user){
        return next(new CustomError("user not found",404))
    }
    const newUser = ({
        _id:user._id,
        name:user.name,
        email:user.email,
        phone:user.number,
        status:user.status
    })
    if(!newUser){
        return next(new CustomError("user data not found",404))
    }
    console.log(newUser)
    res.status(200).json({message:`user ${newUser.name} data`,user:newUser})
}