// import Products from "../../models/productSchema";
// import User from "../../models/userSchema";

// export const addCarts  = async(req,res)=>{
//     const token = req.cookies?.userToken
//     if(!token){
//         return res.status(404).json({message:"user dont have token"})
//     }
//     const {id} = req.params;
//     const product = Products.find((item)=>item.Products._id == id)
//     if(!product){
//         return res.status(400).json({message:"no product found"})
//     }
//     const user = User.id
// }

// import User from "../../models/userSchema.js";
// import Products from "../../models/productSchema.js";
// import CustomError from "../../utils/customError.js";

// // 👉 Add product to user's cart
// export const addToCart = async (req, res, next) => {
//   try {
//     const userId = req.user.id; // ✅ from token (decoded in middleware)
//     const { productId } = req.params;

//     // 1. Find the product
//     const product = await Products.findById(productId);
//     if (!product) {
//       return next(new CustomError("Product not found", 404));
//     }

//     // 2. Find the user
//     const user = await User.findById(userId);
//     if (!user) {
//       return next(new CustomError("User not found", 404));
//     }

//     // 3. Check if product already exists in cart
//     const existingItem = user.cart.find(
//       (item) => item.productId.toString() === productId
//     );

//     if (existingItem) {
//       // If product already in cart → increase quantity
//       existingItem.quantity += 1;
//     } else {
//       // If new product → push to cart array
//       user.cart.push({
//         productId: product._id,
//         img: product.img,
//         item: product.item,
//         rate: product.rate,
//         cat: product.cat,
//         detail: product.detail,
//         price: product.price,
//         quantity: 1,
//       });
//     }

//     // 4. Save user
//     await user.save();

//     res.status(200).json({
//       message: "Product added to cart successfully",
//       cart: user.cart,
//     });
//   } catch (error) {
//     next(new CustomError(error.message, 500));
//   }
// };

// // 👉 Get user's cart
// export const getCart = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).populate("cart.productId");

//     if (!user) {
//       return next(new CustomError("User not found", 404));
//     }

//     res.status(200).json({ cart: user.cart });
//   } catch (error) {
//     next(new CustomError(error.message, 500));
//   }
// };

// // 👉 Remove item from cart
// export const removeFromCart = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const { productId } = req.params;

//     const user = await User.findById(userId);
//     if (!user) {
//       return next(new CustomError("User not found", 404));
//     }

//     user.cart = user.cart.filter(
//       (item) => item.productId.toString() !== productId
//     );

//     await user.save();

//     res.status(200).json({
//       message: "Product removed from cart",
//       cart: user.cart,
//     });
//   } catch (error) {
//     next(new CustomError(error.message, 500));
//   }
// };

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

//item already on the cart the item count will increase








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
