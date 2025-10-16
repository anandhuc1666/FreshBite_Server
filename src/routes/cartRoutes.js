import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add/:productId", verifyUser, addToCart);
router.get("/", verifyUser, getCart);
router.delete("/remove/:productId", verifyUser, removeFromCart);

export default router;
