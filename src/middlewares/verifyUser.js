import jwt from "jsonwebtoken";
import CustomError from "../utils/customError.js";

const verifyUser = (req, res, next) => {
  try {
    // 1. Get token from cookie
    const token = req.cookies?.userToken;
    if (!token) {
      return next(new CustomError("Token not found", 401));
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.ACESS_SECRET);

    // 3. Attach user info to request
    req.user = decoded; // now you can access req.user.id

    // 4. Continue to next middleware/controller
    next();
  } catch (err) {
    return next(new CustomError("Invalid or expired token", 401));
  }
};

export default verifyUser;
