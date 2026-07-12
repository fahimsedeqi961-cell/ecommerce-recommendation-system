import express from "express"
import { getProductById, getProducts } from "../controllers/productController.js";
import { getFrequentlyBoughtTogether } from "../controllers/recommendationController.js"
const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/recommendations/:productId", getFrequentlyBoughtTogether);



export default router;

