// import CustomError from "../utils/customError"


// const verifyUser = (req,res,next)=>{
//    const token = req.cookies?.userToken
//    if(!token){
//     return next(new CustomError("token not found",404))
//    }
// }
// export default verifyUser


import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

const verifyUser = (req, res, next) => {
  const token = req.cookies?.userToken;

  if (!token) {
    return next(new CustomError("Token not found", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.ACESS_SECRET);
    req.user = { id: decoded.id }; // store user id for later use
    console.log(req.user)
    next();
  } catch (error) {
    return next(new CustomError("Invalid token", 401));
  }
};

export default verifyUser;
