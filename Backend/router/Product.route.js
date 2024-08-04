import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByGreaterPrice,
  getProductsByLessPrice,
  updateProduct,
} from "../controller/Product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

// only admin access
router.post("/addProduct", authMiddleware, adminMiddleware, addProduct);
router.post("/updateProduct", authMiddleware, adminMiddleware, updateProduct);
router.post("/deleteProduct", authMiddleware, adminMiddleware, deleteProduct);

// customer access
router.get("/getallProduct", getAllProducts);
router.get("/featuredProduct", getFeaturedProducts);
router.get("/lessPrice", getProductsByLessPrice);
router.get("/greatePrice", getProductsByGreaterPrice);

export default router;
