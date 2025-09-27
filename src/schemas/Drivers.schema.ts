import { z } from "zod";

export const driverAddressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
});

// Driver Emergency Contact Schema (all fields optional)
export const driverEmergencyContactSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  relationship: z.string().optional(),
});

// Create Driver Schema
export const createDriveSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  type: z.string().min(1, { message: "Driver type is required" }),
  mobileNo: z.string().min(1, { message: "Mobile number is required" }),
  drivingLicenseExpireDate: z
    .string()
    .min(1, { message: "License expiration date is required" })
    .transform((val) => new Date(val))
    .refine((date) => date > new Date(), {
      message: "License expiration date must be in the future",
    }),
  status: z.string().min(1, { message: "Status is required" }),
  licenseNo: z.string().min(1, { message: "License no is required" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .or(z.literal("").transform(() => undefined))
    .optional(),
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .refine(
      (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age =
          today.getFullYear() -
          birthDate.getFullYear() -
          (today <
          new Date(
            today.getFullYear(),
            birthDate.getMonth(),
            birthDate.getDate()
          )
            ? 1
            : 0);

        return age >= 18;
      },
      { message: "Driver must be at least 18 years old" }
    ),
  salary: z
    .number()
    .nonnegative({ message: "Salary cannot be negative" })
    .optional(),
  joinDate: z.string().optional(),
  address: driverAddressSchema.optional(),
  emergencyContact: driverEmergencyContactSchema.optional(),
});
