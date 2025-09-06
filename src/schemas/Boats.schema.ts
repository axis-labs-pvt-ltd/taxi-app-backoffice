import { z } from "zod";

export const boatSchema = z.object({
  boatName: z
    .string()
    .min(1, { message: "Boat Name is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Boat Name cannot be empty or just spaces",
    }),
  registrationNumber: z
    .string()
    .min(1, { message: "Registration No is required" })
    .refine((value) => value.trim().length > 0, {
      message: "Registration No cannot be empty or just spaces",
    }),
  type: z.enum(["Multi-day Boat", "FRP Boat"], {
    message: "Boat type is required",
  }),
  capacityKg: z.string().optional(),
});
