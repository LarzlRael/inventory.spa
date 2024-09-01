import { z } from 'nestjs-zod/z';

export const createNewOrderProductSchema = z.object({
  name: z.string().min(5),
  description: z.string(),
  purchasePrice: z.number().positive().default(0).optional(),
  SalePrice: z.number().positive().default(0).optional(),
  stockQuantity: z.number().int().positive(),
  idCategory: z.number().int().positive(),
  quantity: z.number().int().positive(),
  idSupplier: z.number().int().positive().optional(),
});

export const createOrderSchema = z.object({
  products: z.array(createNewOrderProductSchema),
  date: z.dateString(),
});

export type CreatesOrderDto = z.infer<typeof createOrderSchema>;
