import Products from "../../models/productSchema.js";

export const datass = async (req, res) => {
  try {
    const product = await Products.find();

    res.status(200).json({ message: "product", product });
    console.log(productOnly);
  } catch (error) {
    console.log("500", error);
  }
};
