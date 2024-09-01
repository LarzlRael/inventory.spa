import { z } from 'nestjs-zod/z';
export const newSupplierSchema = z.object({
  name: z.string(),
  contactName: z.string(),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
});



export type NewSupplierDto = z.infer<typeof newSupplierSchema>;


