import { Request, Response } from "express";
import { OrderServices } from "./orders.service";
import orderValidationSchema from "./orders.validation";
import { Product } from "../product/product.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const validation = orderValidationSchema.safeParse(req.body);

    if (!validation.success) {
      const errors = validation.error.issues.map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    const { productId, quantity } = validation.data;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.inventory.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity in stock",
      });
    }

    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    const newOrder = await OrderServices.createOrderIntoDb(validation.data);
    await product.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};


const getAllOrders = async (req: Request, res: Response) => {
    const email = req.query.email;
    try {
        const orders = await OrderServices.getAllOrdersFromDB(email as string | undefined);
        if(orders.length  === 0) {
            return res.status(200).json({
                success: true,
                message: "No orders found for this email",
                data: []
            })
        }

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders
        })

        
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message ||  "Something went wrong",
            error: err
        })
    } 
    
 };

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderServices.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderServices.updateOrder(req.params.id, req.body);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderServices.deleteOrder(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
