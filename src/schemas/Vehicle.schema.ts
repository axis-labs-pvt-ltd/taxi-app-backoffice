import { z } from "zod";

export const vehicleSchema = z.object({
  type: z
    .string()
    .min(1, { message: "Vehicle type is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Vehicle type cannot be empty or just spaces",
    }),
  plateNumber: z
    .string()
    .min(1, { message: "Plate Number is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Plate Number cannot be empty or just spaces",
    }),
  brand: z
    .string()
    .min(1, { message: "Brand is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Brand cannot be empty or just spaces",
    }),
  model: z
    .string()
    .min(1, { message: "Model is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Model cannot be empty or just spaces",
    }),
  pricePerKm: z.string(),

  capacity: z.string(),
  status: z.enum(["available", "booked", "not available"], {
    message: "Status is required",
  }),
});
