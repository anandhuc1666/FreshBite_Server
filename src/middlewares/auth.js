import CustomError from "../utils/customError"


const verifyUser = (req,res,next)=>{
   const token = req.cookies?.userToken
   if(!token){
    return next(new CustomError("token not found",404))
   }
}
export default verifyUser