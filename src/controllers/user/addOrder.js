import Orders from "../../models/OrderSchema.js";
import User from "../../models/userSchema.js";

export const addOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const Oderuser = user.order;
    if (!user) return res.status(404).json({ message: "User not found" });
    // const { cart } = req.body;
    // if (!cart || cart.length === 0) {
    //   return res.status(400).json({ message: "Cart is empty" });
    // }
    // console.log(cart);
    const createdOrders = await Orders.insertMany(
      user?.cart?.map((item) => {
        return {
          productId: item.productId,
          userId: userId,
          quantity: item.quantity,
        };
      })
    );

    // Also add to user order history
    Oderuser.push(...createdOrders);

    // Clear the user cart after order
    user.cart = [];

    await user.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: createdOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order", error });
  }
};

export const getOrders = async (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  const orders = await Orders.find({ userId: userId })
  res.status(200).json({ message: "success", orders });
};
