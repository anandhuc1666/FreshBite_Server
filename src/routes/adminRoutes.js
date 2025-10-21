import trycatch from "../middlewares/tryCatch.js";
import login from "../controllers/admin/adminLogin.js"
import express from "express"
const routes = express.Router()
//admin login routes
routes.post('/login',trycatch(login))

export default routes

