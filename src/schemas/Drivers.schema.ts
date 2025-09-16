import { z } from "zod";

// Driver Address Schema (all fields optional)
export const driverAddressSchema = z.object({
  street: z
    .string()
    .min(1, { message: "Street address is required" })
    .optional(),
  city: z.string().min(1, { message: "City is required" }).optional(),
  state: z.string().min(1, { message: "State is required" }).optional(),
  zipCode: z.string().min(1, { message: "Zip code is required" }).optional(),
});

// Driver Emergency Contact Schema (all fields optional)
export const driverEmergencyContactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Emergency contact name is required" })
    .optional(),
  phone: z
    .string()
    .min(1, { message: "Emergency contact phone is required" })
    .optional(),
  relationship: z
    .string()
    .min(1, { message: "Relationship is required" })
    .optional(),
});

// Create Driver Schema
export const createDriveSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required" }),
  type: z.string().min(1, { message: "Driver type is required" }),
  mobileNo: z.string().min(1, { message: "Mobile number is required" }),
  drivingLicenseExpireDate: z
    .string()
    .min(1, { message: "License expiration date is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  salary: z
    .number()
    .nonnegative({ message: "Salary cannot be negative" })
    .optional(),
  joinDate: z.string().min(1, { message: "Join date is required" }).optional(),
  address: driverAddressSchema.optional(),
  emergencyContact: driverEmergencyContactSchema.optional(),
});
