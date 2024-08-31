import { z } from "zod";

export const createNewClientSchema = z.object({
    username: z.string().min(5),
    description: z.string().min(4).optional(),
    phone: z.string().min(4).optional(),
  });
  
  export type CreateNewUserDto = z.infer<typeof createNewClientSchema>;
  