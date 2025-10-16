import express from "express"
import { cartAdd,deletCart } from "../controllers/user/addCarts.js";
import trycatch from "../middlewares/tryCatch.js";
import verifyUser from "../middlewares/auth.js";


const routes = express.Router()

routes
.post('/cartAdd/:productId',verifyUser,trycatch(cartAdd))
.delete('/cartDlt/:productId',verifyUser,trycatch(deletCart))
export default routes