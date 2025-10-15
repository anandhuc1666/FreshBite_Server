import jwt from "jsonwebtoken";

export const gtUserToken = (userId) =>
  jwt.sign({ id: userId }, process.env.ACESS_SECRET, { expiresIn: "60m" });
