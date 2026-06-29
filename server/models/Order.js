import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({
  user: ObjectId,
  items: [{
    product: ObjectId,
    quantity: Number
  }],
  totalAmount: Number
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;