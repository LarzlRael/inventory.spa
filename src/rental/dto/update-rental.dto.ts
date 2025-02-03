import { z } from 'nestjs-zod/z';
export const rentalItemSchema = z.object({
  idProduct: z.number().int(),
  quantity: z.number().int(),
});

export const rentalItemsSchema = z.object({
  clientName: z.string().min(5),
  products: z.array(rentalItemSchema),
  idClient: z.number().int(),
});

export type RentalItemDto = z.infer<typeof rentalItemSchema>;
export type RentalItemsDto = z.infer<typeof rentalItemsSchema>;
