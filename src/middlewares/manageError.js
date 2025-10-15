import CustomError from "../utils/customError.js";

const manageErr = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: "fail", message: err.message });
  }
  return res
    .status(500)
    .json({ status: "fail", message: err.message || "internel server issue" });
};

export default manageErr;