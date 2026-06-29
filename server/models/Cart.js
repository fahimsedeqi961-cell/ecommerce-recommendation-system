import mongoose, { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
  user: ObjectId,
  items: [
    {
      product: ObjectId,
      quantity: Number
    }
  ]
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;