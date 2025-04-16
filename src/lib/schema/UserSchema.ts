import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long.")
    .max(20, "Name must be at most 20 characters long."),
});

export type UserSchema = z.infer<typeof userSchema>;
