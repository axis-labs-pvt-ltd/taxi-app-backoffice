import { z } from "zod";

export const vehicleSchema = z.object({
  modelId: z
    .string()
    .min(1, { message: "Vehicle model is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Vehicle model cannot be empty or just spaces",
    }),
  plateNumber: z
    .string()
    .min(1, { message: "Plate Number is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Plate Number cannot be empty or just spaces",
    }),
  status: z.enum(["available", "booked", "not available"], {
    message: "Status is required",
  }),
});

export const assignVehicleSchema = z.object({
  vehicleId: z
    .string()
    .min(1, { message: "Vehicle is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Vehicle cannot be empty or just spaces",
    }),
});

export const updateTotalDistanceSchema = z.object({
  actualTotalDistance: z
    .number()
    .refine((val) => !isNaN(val), {
      message: "Actual distance rate must be a number",
    })
    .min(0, { message: "Actual distance cannot be negative" }),
});
