import z from "zod";

export const extraServiceSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Service name is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Service name cannot be empty or just spaces",
    }),
  price: z.coerce
    .number()
    .nonnegative({ message: "Price cannot be negative" })
    .refine((val) => !isNaN(val), { message: "Price must be a valid number" }),
  isFree: z.boolean(),
});
