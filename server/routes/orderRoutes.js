import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// This endpoint receives the POST call from  CheckoutSuccess frontend page
router.post('/create', createOrder);

export default router;
