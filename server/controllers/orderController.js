import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Validate that the request contains products
    if (!products || products.length === 0) {
      return res.status(400).json({ success: false, message: "Cannot create an order with an empty cart." });
    }

    // Save the new transaction record to feed  recommendation engine data
    const newOrder = new Order({
      userId,
      products
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully! Recommendation metrics updated.",
      order: newOrder
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({ success: false, message: "Internal server order error.", error: error.message });
  }
};
