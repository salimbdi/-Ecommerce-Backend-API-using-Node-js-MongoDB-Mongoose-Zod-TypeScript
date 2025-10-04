import { Order } from "./orders.model";
import { TOrder } from "./orders.model";

const createOrderIntoDb = async (orderData: TOrder) => {
 return  await Order.create(orderData);
 
};

const getAllOrdersFromDB = async (query: string | undefined) => {
const filter = query ? {email: query} : {};
return await Order.find(filter)
}

const getOrderById = async (id: string) => {
  return await Order.findById(id);
};

const updateOrder = async (id: string, payload: Partial<TOrder>) => {
  return await Order.findByIdAndUpdate(id, payload, { new: true });
};

const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrdersFromDB,
  getOrderById,
  updateOrder,
  deleteOrder,
};
