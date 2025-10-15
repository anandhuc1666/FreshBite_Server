import Product from "../../models/productSchema.js";
import CustomError from "../../utils/customError.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};
export const getProductById = async (req, res, next) => {
   const {id} = req.params;
   console.log(id)
    const product = await Product.findById(id)
if(!product){
    return next(new CustomError("product not found",404))
}
res.status(200).json({message:"product found",product})

};
