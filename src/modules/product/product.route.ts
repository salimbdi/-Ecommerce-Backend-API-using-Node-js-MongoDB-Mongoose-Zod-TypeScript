import express from "express";
import { ProductController } from "./product.controller";
import { authMiddleware, authorizeRoles } from "../../middleware/authmiddleware";

const router = express.Router();

// Only admin can create products
router.post("/createProduct", authMiddleware, authorizeRoles("admin"), ProductController.createProduct);

// Anyone (public) can see products
router.get("/", ProductController.getAllproduct);

// Anyone (public) can view a single product
router.get("/:productid",authMiddleware, ProductController.getsinglproduct);

// Only admin can update or delete
router.put("/update/:productid", authMiddleware, authorizeRoles("admin"), ProductController.updateProduct);
router.delete("/delete/:productid", authMiddleware, authorizeRoles("admin"), ProductController.deleteProduct);

export const ProductRouter = router;
