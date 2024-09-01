import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(5),
  description: z.string(),
  purchasePrice: z.number().positive(),
  SalePrice: z.number().positive(),
  stockQuantity: z.number().int().positive(),
  idCategory: z.number().int().positive(),
  idSupplier: z.number().int().positive().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(5),
  description: z.string(),
  purchasePrice: z.number().positive(),
  SalePrice: z.number().positive(),
  stockQuantity: z.number().int().positive(),
  idCategory: z.number().int().positive(),
  idSupplier: z.number().int().positive().optional(),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
