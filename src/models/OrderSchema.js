import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
    },
    detail: {
      type: String,
      required: true,
    },
    img1: {
      type: String,
      required: true,
    },
    img2: {
      type: String,
    },
    img3: {
      type: String,
    },
    area: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true });
const Orders = mongoose.model("OrderSchema", OrderSchema);
export default Orders;
