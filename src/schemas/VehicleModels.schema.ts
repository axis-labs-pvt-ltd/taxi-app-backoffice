import { z } from "zod";

export const vehicleModelOptionsSchema = z.object({
  passengerCount: z
    .number()
    .min(1, { message: "Passenger count must be at least 1" }),

  luggageCapacity: z
    .string()
    .min(1, { message: "Luggage capacity is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Luggage capacity cannot be empty or just spaces",
    }),

  transmission: z
    .string()
    .min(1, { message: "Transmission type is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Transmission cannot be empty or just spaces",
    }),

  airCondition: z.boolean().refine((value) => typeof value === "boolean", {
    message: "Air condition must be true or false",
  }),
});

export const createVehicleModelSchema = z.object({
  id: z.string().optional(),

  options: vehicleModelOptionsSchema,

  modelName: z
    .string()
    .min(1, { message: "Model name is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Model name cannot be empty or just spaces",
    }),

  type: z
    .string()
    .min(1, { message: "Type is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Type cannot be empty or just spaces",
    }),

  brand: z
    .string()
    .min(1, { message: "Brand is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Brand cannot be empty or just spaces",
    }),

  rateCardId: z
    .string()
    .min(1, { message: "Rate card ID is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Rate card ID cannot be empty or just spaces",
    }),
});

export type CreateVehicleModelSchemaType = z.infer<
  typeof createVehicleModelSchema
>;
