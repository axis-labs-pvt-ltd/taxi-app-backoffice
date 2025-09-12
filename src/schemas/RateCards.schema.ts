import { z } from "zod";

export const rateCardSchema = z.object({
  id: z.string().optional(),

  name: z
    .string()
    .min(1, { message: "Name is required" })
    .refine((val) => val.trim().length > 0, {
      message: "Name cannot be empty or just spaces",
    }),

  dailyRate: z
    .number()
    .refine((val) => !isNaN(val), { message: "Daily rate must be a number" })
    .min(0, { message: "Daily rate cannot be negative" }),

  includedKmPerDay: z
    .number()
    .refine((val) => !isNaN(val), {
      message: "Included KM per day must be a number",
    })
    .min(0, { message: "Included KM per day cannot be negative" }),

  extraKmRate: z
    .number()
    .refine((val) => !isNaN(val), { message: "Extra KM rate must be a number" })
    .min(0, { message: "Extra KM rate cannot be negative" }),

  currency: z
    .string()
    .min(1, { message: "Currency is required" })
    .refine((val) => val.trim().length > 0, {
      message: "Currency cannot be empty or just spaces",
    }),
});
