import z from "zod";

export const extraServiceSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Service name is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Service name cannot be empty or just spaces",
    }),
  price: z.union([
    z.number().nonnegative({ message: "Price cannot be negative" }),
    z
      .number()
      .min(1, { message: "Price is required" })
      .transform((val, ctx) => {
        const num = Number(val);
        if (isNaN(num)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Price must be a valid number",
          });
          return z.NEVER;
        }
        if (num < 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Price cannot be negative",
          });
          return z.NEVER;
        }
        return num;
      }),
  ]),
  isFree: z.boolean(),
});
