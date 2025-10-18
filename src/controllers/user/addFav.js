import User from "../../models/userSchema.js";
import Product from "../../models/productSchema.js";
import CustomError from "../../utils/customError.js";

// add item the perticuler user fav array
export const addFav = async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return next(new CustomError("user not found", 404));
  }
  const product = await Product.findById(productId);
  const favUser = user.fav;
  const existeItem = favUser.find(
    (item) => item.productId.toString() === productId
  );
  if (existeItem) {
    return res.status(404).json({ message: "product on the fav" });
  } else {
    user.fav.push({
      productId: product._id,
      img: product.img,
      item: product.item,
      rate: product.rate,
      cat: product.cat,
      detail: product.detail,
      price: product.price,
      quantity: 1,
    });
    await user.save(),
      res.status(200).json({ message: "user fav item add", product });
  }
};
//show user all fav on the list

export const getFav = async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new CustomError("user not found", 404));
  }
  const UserFav = user.fav;
  if (!UserFav || UserFav.length === 0) {
    return next(new CustomError("user fav empty", 404));
  }
  res.status(200).json({
    message: "user fav items",
    fav: UserFav,
  });
};
//delete the related product id on the list

export const favDelt = async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const user = await User.findById(userId);
  console.log(user.fav);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.fav) return res.status(400).json({ message: "Fav list is empty" });
  const takeFave = user.fav.find(
    (item) => item.productId.toString() === productId
  );
  if (!takeFave) {
    return next(new CustomError("user fav not found!", 404));
  }
  user.fav = user.fav.filter((item) => item.productId.toString() !== productId);
  if (!user.fav) {
    return next(new CustomError("user cannot be delete the item's"));
  }
  res.status(200).json({ message: "user fave item deleted" });
  await user.save();
};
