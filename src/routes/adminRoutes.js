import trycatch from "../middlewares/tryCatch.js";
import login from "../controllers/admin/adminLogin.js"
import {deltProduct, newProduct, product, productCatecary, spacificProduct, updateProduct} from "../controllers/admin/Products.js"
import {customer, findUser} from "../controllers/admin/Ausers.js"
import express from "express"
import { revenue, totalProduct } from "../controllers/admin/dashbord.js";
import { datass } from "../controllers/admin/newCollect.js";
const routes = express.Router()
//admin login routes
routes
.post('/login',trycatch(login))
.get('/products',trycatch(product))
.get('/users',trycatch(customer))
.get('/user/:username',trycatch(findUser))
.get('/catecary/:catecaryId',trycatch(productCatecary))
.get('/products/:productId',trycatch(spacificProduct))
.post('/product/addNew',trycatch(newProduct))
.delete('/product/:productId',trycatch(deltProduct))
.patch('/product/:updateId',trycatch(updateProduct))
.get('/product/totalOrder',trycatch(totalProduct))
.get('/product/revenue',trycatch(revenue))
.get('/nonproduct',datass)

export default routes

