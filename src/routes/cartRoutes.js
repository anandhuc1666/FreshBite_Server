// import express from "express";
// import verifyUser from "../middlewares/verifyUser.js";
// import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

// const router = express.Router();

// router.post("/add/:productId", verifyUser, addToCart);
// router.get("/", verifyUser, getCart);
// router.delete("/remove/:productId", verifyUser, removeFromCart);

// export default router;


import express from "express"
import { cartAdd } from "../controllers/user/addCarts.js";
import trycatch from "../middlewares/tryCatch.js";
import verifyUser from "../middlewares/auth.js";

const routes = express.Router()

routes
.post('/cartAdd/:id',verifyUser,trycatch(cartAdd))

export default routes