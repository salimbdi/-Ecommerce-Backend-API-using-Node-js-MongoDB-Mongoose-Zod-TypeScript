import { Response, Request } from "express";
import productValidationSchema from "./product.validation";
import { ProductServices } from "./product.service";

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const zodParser = productValidationSchema.parse(req.body);
    const result = await ProductServices.createProductintoDb(zodParser);
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// get all products
const getAllproduct = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchTerm = (req.query.search as string) || "";

    const { data, total } = await ProductServices.getAllproduct(
      page,
      limit,
      searchTerm
    );

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      totalResults: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// get single product
const getsinglproduct = async (req: Request, res: Response) => {
  try {
    const { productid } = req.params;
    const result = await ProductServices.getsinglproduct(productid);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productid } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateProduct(productid, updateData);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

// ✅ delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productid } = req.params;
    const result = await ProductServices.deleteProduct(productid);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }
};

export const ProductController = {
  createProduct,
  getAllproduct,
  getsinglproduct,
  updateProduct,
  deleteProduct,
};
