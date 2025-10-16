import express from "express";
import trycatch from "../middlewares/tryCatch.js";
import {
  getProductById,
  getProducts,
} from "../controllers/user/ProductController.js";
const routes = express.Router();

routes
  //Product
  .get("/product", trycatch(getProducts))
  .get("/product/:id", trycatch(getProductById))
export default routes;
