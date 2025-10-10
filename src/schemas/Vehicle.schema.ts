import { z } from "zod";

export const vehicleSchema = z
  .object({
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
      })
      .regex(/^[A-Z]{2,3}-\d{4}$/, {
        message:
          "Plate Number must be in format KN-2256 or CBA-2365 (No spaces & Only English capital letters are allowed)",
      }),

    year: z
      .string()
      .min(1, { message: "Year is required" })
      .refine((value) => /^\d{4}$/.test(value), {
        message: "Year must be a valid 4-digit number",
      }),

    ownership: z.enum(["Own", "Third-Party"], {
      message: "Ownership type is required",
    }),

    ownerName: z.string().optional(),
    ownerPhone: z.string().optional(),
    ownerAddress: z.string().optional(),

    status: z.enum(["available", "booked", "not available"], {
      message: "Status is required",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.ownership === "Third-Party") {
      if (!data.ownerName || data.ownerName.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Owner name is required for Third-Party vehicles",
          path: ["ownerName"],
        });
      }

      if (!data.ownerPhone || data.ownerPhone.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Owner phone is required for Third-Party vehicles",
          path: ["ownerPhone"],
        });
      } else if (!/^\d{10}$/.test(data.ownerPhone)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Owner phone must be a valid 10-digit number",
          path: ["ownerPhone"],
        });
      }

      if (!data.ownerAddress || data.ownerAddress.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Owner address is required for Third-Party vehicles",
          path: ["ownerAddress"],
        });
      }
    }
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

export const updateMeterValuesSchema = z
  .object({
    startMeter: z
      .number()
      .min(0, { message: "Start meter cannot be negative" }),
    endMeter: z
      .number()
      .min(0, { message: "End meter cannot be negative" })
      .nullable()
      .optional(),
  })
  .refine(
    (data) =>
      data.endMeter === null ||
      data.endMeter === undefined ||
      data.endMeter > data.startMeter,
    {
      path: ["endMeter"],
      message: "End meter must be greater than start meter",
    }
  );
