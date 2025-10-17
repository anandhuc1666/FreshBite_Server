import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    productId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
    },
    userId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      required: true,
      type: Number,
    },
  },
  { timestamps: true }
);
const Orders = mongoose.model("OrderSchema", OrderSchema);
export default Orders;
