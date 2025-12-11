import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    min: 1
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const cartModel= mongoose.model('CartModel',cartSchema);