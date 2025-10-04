import { Schema, model } from "mongoose";

export type TOrder = {
  email: string;
  productId: string; // reference to Product
  price: number;
  quantity: number;
};

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      required: true,
    },
    productId: {
      type: String, // you could also use Schema.Types.ObjectId
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

export const Order = model<TOrder>("Order", orderSchema);
