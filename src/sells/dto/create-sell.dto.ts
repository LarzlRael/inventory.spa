import { z } from 'nestjs-zod/z';
export const sellProductSchema = z.object({
  idProduct: z.number().int(),
  quantity: z.number().int(),
});

export const createSellSchema = z.object({
  clientName: z.string().min(5),
  products: z.array(sellProductSchema),
});

export type SellProductDto = z.infer<typeof sellProductSchema>;
export type CreateSellDto = z.infer<typeof createSellSchema>;
