import { z } from "zod";

export const transactionSchema = z.object({
  category: z.enum([
    "Food & Dining",
    "Transportation",
    "Housing",
    "Health & Fitness",
    "Entertainment",
    "Personal care",
    "Education",
    "Investments",
    "Debt Payments",
    "Gifts and Donations",
    "Shopping",
    "Miscellaneous",
  ]),
  amount: z.number().min(1, "Amount must be greater than 0."),
  date: z
    .date()
    .refine(
      (date) => date <= new Date(),
      "Date must be a past day or present day."
    ),
  description: z
    .string()
    .min(3, "Description must be at least 3 character long.")
    .max(20, "Description must be at most 20 characters long."),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;
