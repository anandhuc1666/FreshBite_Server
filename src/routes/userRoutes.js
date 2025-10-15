import express from "express";
import trycatch from "../middlewares/tryCatch.js";
import { cartAdd } from "../controllers/user/cartController.js";
import {
  getProductById,
  getProducts,
} from "../controllers/user/ProductController.js";
const routes = express.Router();

routes
  //Product
  .get("/product", trycatch(getProducts))
  .get("/product/:id", trycatch(getProductById))
 .post("/cart/add/:userId/:productId", cartAdd);
export default routes;
