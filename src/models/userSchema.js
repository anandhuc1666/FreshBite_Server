import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    img: String,
    item: String,
    rate: Number,
    cat: String,
    detail: String,
    price: Number,
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const favItemSchema = new mongoose.Schema({
   productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    img: String,
    item: String,
    rate: Number,
    cat: String,
    detail: String,
    price: Number,
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
    cart: {
      type: [cartItemSchema],
      default: [],
    },
    fav: {
      type: [favItemSchema],
      default: [],
    },
    order: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
