import express from "express";
import {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart
} from "../controllers/cartController.js"


const router = express.Router();

router.post('/get', getCart);
router.post('/add', addToCart);
router.put('/update', updateQuantity);
router.post('/remove', removeFromCart);
router.post('/clear', clearCart);

export default router;


