import Product from "../../models/productSchema.js";
import CustomError from "../../utils/customError.js";
import User from "../../models/userSchema.js";

export const cartAdd = async (req, res, next) => {
  try {
    const { userId, id } = req.params  ; 

    const user = await User.findById(userId);
    if (!user) {
      return next(new CustomError("User not found", 400));
    }

    const product = await Product.findById(id);
    if (!product) {
      return next(new CustomError("Product not found", 404));
    }

    // ✅ Add product id to cart array
    user.cart.push(product._id);
    await user.save();

    res.status(200).json({
      message: "Product added to cart",
      cart: user.cart
    });
  } catch (err) {
    console.error(err);
    next(new CustomError("Something went wrong", 500));
  }
};
