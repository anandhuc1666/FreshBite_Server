import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

const verifyUser = (req, res, next) => {
  const token = req.cookies?.userToken;

  if (!token) {
    return next(new CustomError("Token not found", 401));
  }

  try {
    jwt.verify(token, process.env.ACESS_SECRET, (err, decode) => {
      if (err) {
        return next(new CustomError("user id not found", 404));
      }
      req.user = decode; // store user id 
      next();
    });
  } catch (error) {
    return next(new CustomError("Invalid token", 401));
  }
};

export default verifyUser;
