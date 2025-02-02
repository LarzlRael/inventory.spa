import { z } from 'nestjs-zod/z';
export const inventorySchema = z.object({
  movementType: z.string().min(5),
  quantity: z.number().int(),
  reason: z.string().min(5),
});

export type InventoryDto = z.infer<typeof inventorySchema>;
