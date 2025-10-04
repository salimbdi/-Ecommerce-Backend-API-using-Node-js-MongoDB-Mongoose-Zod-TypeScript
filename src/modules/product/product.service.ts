import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create product
const createProductintoDb = async (productData: TProduct) => {
  return await Product.create(productData);
};

// get all with pagination + search
const getAllproduct = async (page: number, limit: number, searchTerm?: string) => {
  const skip = (page - 1) * limit;
  const query = searchTerm
    ? { name: { $regex: searchTerm, $options: "i" } }
    : {};

  const [data, total] = await Promise.all([
    Product.find(query).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  return { data, total, page, limit };
};

// get single product
const getsinglproduct = async (id: string) => {
  return await Product.findById(id);
};

// update product
const updateProduct = async (id: string, updateData: Partial<TProduct>) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

// ✅ delete product
const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export const ProductServices = {
  createProductintoDb,
  getAllproduct,
  getsinglproduct,
  updateProduct,
  deleteProduct,
};
