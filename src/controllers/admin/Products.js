import Products from "../../models/productSchema.js";
import CustomError from "../../utils/customError.js";

export const product = async (req, res, next) => {
  const products = await Products.find();
  if (!products) {
    return next(new CustomError("product not found", 404));
  }
  res.status(200).json({ message: "products", products: products });
};

export const productCatecary = async (req, res, next) => {
  const { catecaryId } = req.params;
  if (!catecaryId) {
    return next(new CustomError("products not found", 404));
  }
  const products = await Products.find({ cat: catecaryId });
  if (!products || products.length === 0) {
    return next(new CustomError(`sorry ${catecaryId} not available`, 404));
  } else {
    next(new CustomError(`sorry ${catecaryId} not available`, 404));
  }
  res
    .status(200)
    .json({ message: `product catecary is ${catecaryId}`, items: products });
};
export const spacificProduct = async(req,res,next)=>{
   const {productId} = req.params;
   const product = await Products.findById(productId)
   if(!product || product===0){
      return next(new CustomError("product not found",404))
   }
   console.log(product);
    res.status(200).json({message:`products is ${product.name}`,product:product})
}
