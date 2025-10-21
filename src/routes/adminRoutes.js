import trycatch from "../middlewares/tryCatch.js";
import login from "../controllers/admin/adminLogin.js"
import product from "../controllers/admin/Products.js"
import express from "express"
const routes = express.Router()
//admin login routes
routes
.post('/login',trycatch(login))
.get('/products',trycatch(product))

export default routes

