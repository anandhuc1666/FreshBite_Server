import Products from "../../models/productSchema.js";
// import CustomError from "../../utils/customError.js";

const product = async(req,res)=>{
 const products = await Products.find()
 console.log(products)
}
export default product