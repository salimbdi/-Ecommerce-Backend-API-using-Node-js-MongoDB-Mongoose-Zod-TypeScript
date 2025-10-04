import { z } from "zod";

export const variantValidationSchema = z.object({
  type: z.string().min(1, "Variant type is required"),
  value: z.string().min(1, "Variant value is required"),
});

export const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, "Quantity must be >= 0"),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().min(1, "Name of Product is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tag cannot be empty")).nonempty("At least one tag is required"),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
