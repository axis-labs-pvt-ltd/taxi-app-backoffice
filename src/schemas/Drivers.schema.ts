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
    .min(1, { message: "License expiration date is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  salary: z
    .number()
    .nonnegative({ message: "Salary cannot be negative" })
    .optional(),
  joinDate: z.string().optional(),
  address: driverAddressSchema.optional(),
  emergencyContact: driverEmergencyContactSchema.optional(),
});
