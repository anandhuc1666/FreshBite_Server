import { disconnect } from "mongoose";
import Product from "../../models/productSchema.js";
import CustomError from "../../utils/customError.js";
//get all product from the mongodb product collection
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};

//get one product from the mongodb
 product collection
export const getProductById = async (req, res, next) => {
   const {id} = req.params;
   console.log(id)
    const product = await Product.findById(id)
if(!product){
    return next(new CustomError("product not found",404))
}
res.status(200).json({message:"product found",product}) 
};

//find the catecary from thr params 
export const catecary = async(req,res,next)=>{
  const {id} = req.params; 
  if(!id){
    return next(new CustomError("user item not availabel",404))
  }
  const product = await Product.find({cat:id})
  res.status(200).json({message:"your selected items",product})
}
