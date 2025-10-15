import { z } from "zod";

export const addCostsSchema = z.object({
  costs: z
    .array(
      z.object({
        costCategoryId: z
          .string()
          .min(1, { message: "Cost category is required" }),
        amount: z
          .number()
          .positive({ message: "Amount must be greater than 0" }),
      })
    )
    .min(1, { message: "At least one cost must be added" }),
});
