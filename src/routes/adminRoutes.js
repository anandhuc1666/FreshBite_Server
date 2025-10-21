import trycatch from "../middlewares/tryCatch.js";
import login from "../controllers/admin/adminLogin.js"
import {deltProduct, newProduct, product, productCatecary, spacificProduct} from "../controllers/admin/Products.js"
import {customer, findUser} from "../controllers/admin/Ausers.js"
import express from "express"
const routes = express.Router()
//admin login routes
routes
.post('/login',trycatch(login))
.get('/products',trycatch(product))
.get('/users',trycatch(customer))
.get('/user/:userId',trycatch(findUser))
.get('/catecary/:catecaryId',trycatch(productCatecary))
.get('/products/:productId',trycatch(spacificProduct))
.post('/product/addNew',trycatch(newProduct))
.delete('/product/:productId',trycatch(deltProduct))

export default routes

