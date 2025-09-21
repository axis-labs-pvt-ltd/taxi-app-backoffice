import { z } from "zod";

/**
 * Base fields (password kept out so we can vary its requirement)
 */
export const baseUserSchema = z.object({
  id: z.string().optional(), // or z.string().uuid().optional() if you want UUID validation
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
});

/**
 * Create: password required
 * - example: min length 8. Adjust rules (pattern, complexity) as needed.
 */
export const createUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128),
});

/**
 * Edit: password optional (when present, must respect same rules)
 */
export const editUserSchema = baseUserSchema.extend({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .optional(),
});

export const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .trim() // removes leading/trailing spaces
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .refine((val) => val.trim().length > 0, {
      message: "Password cannot be empty or only spaces",
    }),
});
