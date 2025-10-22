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
  }
  res
    .status(200)
    .json({ message: `product catecary is ${catecaryId}`, items: products });
};

export const spacificProduct = async (req, res, next) => {
  const { productId } = req.params;
  const product = await Products.findById(productId);
  if (!product || product === 0) {
    return next(new CustomError("product not found", 404));
  }
  console.log(product);
  res
    .status(200)
    .json({ message: `products is ${product.item}`, product: product });
};

export const newProduct = async (req, res, next) => {
  const { item, img, rate, detail, img1, img2, img3, area, price } = req.body;
  const product = await Products.insertOne({
    item: item,
    img: img,
    img1: img1,
    detail: detail,
    img2: img2,
    img3: img3,
    price: price,
    rate: rate,
    area: area,
  });
  if (!product) {
    return next(new CustomError("product not be created", 404));
  }
  res
    .status(200)
    .json({ message: `${product.item} is added the product section` });
  await product.save();
};

export const deltProduct = async (req, res, next) => {
  const { productId } = req.params;
  const dltProduct = await Products.findByIdAndDelete(productId);
  if (!dltProduct) {
    return next(new CustomError("product not available", 404));
  }
  res.status(200).json({ message: "item is deleted" });
  await dltProduct.save();
};

export const updateProduct = async (req, res, next) => {
  const { updateId } = req.params;
  const { item, img, rate, detail, img1, img2, img3, area, price } = req.body;
  const productFind = await Products.findByIdAndUpdate(updateId, {
    item: item,
    img: img,
    img1: img1,
    detail: detail,
    img2: img2,
    img3: img3,
    price: price,
    rate: rate,
    area: area,
  });
  if(!productFind){
   return next(new CustomError("product not update",404))
  }
  res.status(200).json({message:"product is updated",update:productFind})
  await productFind.save();
};