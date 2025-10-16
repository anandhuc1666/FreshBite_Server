import User from "../../models/userSchema.js";
import Product from "../../models/productSchema.js";
import CustomError from "../../utils/customError.js";

export const cartAdd = async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  
  const product = await Product.findById(productId);
  if (!product) {
    return next(new CustomError("product not found", 404));
  }
  
  const userId = req.user.id;
  console.log(userId);
  
  const user = await User.findById(userId);
    if (!user) {
    return next(new CustomError("user not found", 404));
  }
  const existingItem = user.cart.find((item)=>item.productId.toString() === productId)
  //item already on the cart the item count will increase
  if(existingItem){
       existingItem.quantity += 1;
        await user.save();
    return res.status(200).json({message:"item quantity increase"})
  }else{
  user.cart.push({
        productId: product._id,
        img: product.img,
        item: product.item,
        rate: product.rate,
        cat: product.cat,
        detail: product.detail,
        price: product.price,
        quantity: 1,
      });
    await user.save()
  res.status(200).json({ message: "product add the user cart",});
}
};

//get all user item 
export const getCart = async(req,res,next)=>{
const userId =req.user.id
const user = await User.findById(userId)
if(!user){
  return next(new CustomError("user not found",404))
}
const cartItems = user.cart;
if(!cartItems || cartItems.length === 0){
  return next(new CustomError("user cart array will be empty"))
}
res.status(200).json({
  message: "user cart items",
  cart: cartItems
})
}







//item is delete on the related id on the given url
export const deletCart = async(req,res,next)=>{
  const {productId} = req.params;
  const userId = req.user.id
  const user = await User.findById(userId)
  if(!user){
    return next(new CustomError("user not found",404))
  }
  const existItem = user.cart.find((item)=>item.productId.toString() === productId)
    if (!existItem) {
    return next(new CustomError("Item not found in cart", 404));
  }

    user.cart = user.cart.filter((item)=>item.productId.toString() !== productId)
    await user.save();

  res.status(200).json({
    message: "Item deleted from cart",
    cart: user.cart,
  });
  
}
