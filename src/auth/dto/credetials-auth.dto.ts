import { z } from 'zod';

export const createNewUserSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(4),
});

export const signInSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(4),
});

export type CreateNewUserDto = z.infer<typeof createNewUserSchema>;
export type SignInDto = z.infer<typeof signInSchema>;
