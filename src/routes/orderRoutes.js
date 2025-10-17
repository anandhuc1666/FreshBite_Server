import express from "express"
import verifyUser from "../middlewares/auth.js"
import trycatch from "../middlewares/tryCatch.js"
import { addOrder, getOrders } from "../controllers/user/addOrder.js"

const routes =express.Router()

routes
.post('/addOrder',verifyUser,trycatch(addOrder))
.get('/getOrder',verifyUser,trycatch(getOrders))

export default routes