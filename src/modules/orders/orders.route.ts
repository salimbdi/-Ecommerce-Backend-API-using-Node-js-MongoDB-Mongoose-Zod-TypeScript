import express from "express";
import { OrderController } from "./orders.controller";
import { authMiddleware } from "../../middleware/authmiddleware";
const router = express.Router();

router.post("/creatorder" , authMiddleware ,  OrderController.createOrder);
router.get("/", authMiddleware ,  OrderController.getAllOrders);
router.get("/:id", authMiddleware ,  OrderController.getOrderById);
router.put("/:id", authMiddleware ,  OrderController.updateOrder);
router.delete("/:id", authMiddleware ,  OrderController.deleteOrder);

export const OrderRoutes = router;
