// import Products from "../../models/productSchema";
// import User from "../../models/userSchema";
// import { gtUserToken } from "../../utils/jwt";


// export const addCart = async(req,res)=>{
//     //take the all product in side the producrt 
//     const {id} =req.params
//     const product = Products.findById(id)
    
//    const user = User.find()

// }
import express from "express";
import verifyUser from "../../middlewares/auth";
import User from "../../models/userSchema";
import Products from "../../models/productSchema";

const router = express.Router();

router.post("/cart/add/:productId", verifyUser, async (req, res, next) => {
  try {
    const userId = req.user.id; // ✅ comes from decoded token
    const { productId } = req.params;

    const product = await Products.findById(productId);
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }

    const user = await User.findById(userId);
    const existing = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      user.cart.push({ productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (err) {
    next(err);
  }
});

export default router;
