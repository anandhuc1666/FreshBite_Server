import Products from "../../models/productSchema.js";
import User from "../../models/userSchema.js";
import CustomError from "../../utils/customError.js";
import Orders from "../../models/OrderSchema.js";

export const totalProduct = async (req, res, next) => {
  const allOrders = await Orders.find();
  const productIds = allOrders.map((order) => order.productId);
  if (!productIds) {
    return next(new CustomError("product not found", 404));
  }
  const usersId = allOrders.map((user) => user.userId);
  if (!usersId) {
    return next(new CustomError("user not available", 404));
  }
  const users = await User.find({ _id: { $in: usersId } });
  const products = await Products.find({ _id: { $in: productIds } });

  // all user and product details
  const orderDetails = allOrders.map((order) => {
    const user = users.find(
      (p) => p._id.toString() === order.userId.toString()
    );
    const product = products.find(
      (p) => p._id.toString() === order.productId.toString()
    );
    const UpdateTym = order.createdAt;
    const date = new Date(UpdateTym);
    const dateset = date.toLocaleDateString();
    return {
      orderId: order ? order._id : null,
      userName: user ? user.name : "",
      productName: product ? product.item : "Not Found",
      price: product ? product.price : null,
      quantity: order ? order.quantity : null,
      total: product.price * order.quantity,
      Date: dateset,
    };
  });
  if (!orderDetails) {
    return next(new CustomError("order not available", 404));
  }
  const list = [{ ...allOrders.length, orderDetails }];
  res.status(200).json({ message: `total orders: ${allOrders.length}`, list });
};

export const revenue = async (req, res, next) => {
  
};
