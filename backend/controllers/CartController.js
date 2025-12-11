import { cartModel } from "../models/CartModel.js";
import TryCatch from "../utilities/TryCatch.js";

export const addCartProduct = TryCatch(async (req, res) => {
  const { quantity, productId } = req.body;
  const userId = req.user.userId;

  const exist = await cartModel.findOne({ product: productId, user: userId });
  if(exist){
    const cart = await cartModel.findOneAndUpdate(
    { product: productId, user: userId },
    { $set: { quantity: quantity } }
  );

  return res.status(201).json({cart,
    message: "product added successfully...",
  });
  }
  

  const cart = await cartModel.create({
    quantity,
    product: productId,
    user: userId,
  });

  return res.status(201).json({
    cart,
    message: "Product added Successfully...",
  });
});

export const removeCartProduct = TryCatch(async (req, res) => {
  const { id } = req.body;

  const cart = await cartModel.findByIdAndDelete({ _id: id });

  return res.status(200).json({ message: "Product removed Successfully" });
});

export const findCartProducts = TryCatch(async (req, res) => {
  const userId = req.user.userId;

  const cart = await cartModel.find({ user: userId });

  return res.status(200).json({
    cart,
    message: "user cart fetched successfully..",
  });
});

export const updateCartProduct = TryCatch(async (req,res) => {
  const { productId,  quantity } = req.body;
  const userId = req.user.userId;
  
  const cart = await cartModel.findOneAndUpdate(
    { product: productId, user: userId },
    { $set: { quantity: quantity } }
  );

  return res.status(200).json({
    message: "product updated successfully",
  });
});
