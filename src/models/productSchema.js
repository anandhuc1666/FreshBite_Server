import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
const Products = mongoose.model("Products", productSchema);
export default Products;