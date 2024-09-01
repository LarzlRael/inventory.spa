import { z } from 'zod';

export const createNewOrderProductSchema = z.object({
  name: z.string().min(5),
  description: z.string(),
  purchasePrice: z.number().positive().default(0).optional(),
  SalePrice: z.number().positive().default(0).optional(),
  stockQuantity: z.number().int().positive(),
  idCategory: z.number().int().positive(),
});



export const createProductsOrderSchema = z.object({
  
  products: z.array(createNewOrderProductSchema),
  date: z.date(),
});

export type CreatesOrderDto = z.infer<typeof createProductsOrderSchema>;
