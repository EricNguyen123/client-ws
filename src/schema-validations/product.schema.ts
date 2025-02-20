import z from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  price:  z.preprocess((val) => Number(val), z.number().int().positive("Price must be positive")),
  quantity: z.preprocess((val) => Number(val), 
              z.number().int().nonnegative("Quantity must be a non-negative integer")),
  quantity_alert: z.preprocess((val) => Number(val), 
                    z.number().int().nonnegative("Quantity alert must be a non-negative integer")),
  order_unit: z.preprocess((val) => Number(val), 
                z.number().int().positive("Order unit must be positive")),
  description: z.string().optional(),
  status: z.number(),
  multiplication_rate: z.preprocess((val) => Number(val), 
                        z.number().int().positive("Multiplication rate must be positive")),
  discount: z.preprocess((val) => Number(val), 
              z.number().min(0, "Discount cannot be negative")),
});

export type ProductBodyType = z.TypeOf<typeof ProductSchema>
