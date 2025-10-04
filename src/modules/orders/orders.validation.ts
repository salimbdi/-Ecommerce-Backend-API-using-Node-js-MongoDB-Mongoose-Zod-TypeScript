import { z } from "zod";

const orderValidationSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),
    
  productId: z
    .string()
    .min(1, "Product ID is required"),
    
  price: z
    .number()
    .positive("Price must be greater than 0"),
    
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),
});

export default orderValidationSchema;
