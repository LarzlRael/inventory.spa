import { z } from 'nestjs-zod/z';

export const categorySchema = z.object({
  name: z.string().min(5),
  description: z.string(),
});

// class is required for using DTO as a type
/* export class SignInDto extends createZodDto(CredentialsSchema) {} */
export type CategoryDto = z.infer<typeof categorySchema>;
