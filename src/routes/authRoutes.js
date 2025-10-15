import express from "express";
import { login, logOut, register } from "../controllers/user/authController.js";
import trycatch from "../middlewares/tryCatch.js";
const routes = express.Router();

routes
  //Auth
  .post("/login", trycatch(login))
  .post("/register", trycatch(register))
  .post("/logput",trycatch(logOut))

export default routes;
