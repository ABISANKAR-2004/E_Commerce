import TryCatch from "../utilities/TryCatch.js";

import { productModel } from "../models/ProductModel.js";

export const createProduct = TryCatch(async (req, res) => {
  const { title, description, price, images, category } = req.body;

  const product = await productModel.create({
    title,
    description,
    
    price,
    images,
    
    category,
  });
  return res.status(201).json({
    product,
    message: "Product created successfully",
  });
});

export const deleteProduct = TryCatch(async (req, res) => {
  const { id } = req.body;

  const product = await productModel.findByIdAndDelete({_id:id });
  return res.status(200).json({
    message: "Product Deleted Successfully..",
  });
});

export const findProduct = TryCatch(async (req, res) => {
  const { id } = req.body;

  const product = await productModel.findById({_id:id });

  return res.status(200).json({
    product,
    message: "This is the product",
  });
});

export const getAllProducts = TryCatch(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 8;

  const skip = (page - 1) * limit;

  const totalProducts = await productModel.countDocuments();

  const products = await productModel
    .find({})
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
  });
});


export const updateProduct = TryCatch(async (req, res) => {
  const { id, data } = req.body;

  const product = await productModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json({
    message: "Product updated successfully",
    
  });
});
