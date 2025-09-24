import { z } from "zod";

export const tourSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  longDescription: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  price: z.coerce
    .number()
    .positive({ message: "Price must be greater than 0" })
    .refine((val) => !isNaN(val), { message: "Price must be a valid number" }),
  rating: z.coerce
    .number()
    .nonnegative({ message: "Rating cannot be negative" })
    .refine((val) => !isNaN(val), { message: "Rating must be a valid number" }),
  days: z.coerce
    .number()
    .nonnegative({ message: "Days cannot be negative" })
    .refine((val) => !isNaN(val), { message: "Days must be a valid number" }),
  nights: z.coerce
    .number()
    .nonnegative({ message: "Night cannot be negative" })
    .refine((val) => !isNaN(val), { message: "Night must be a valid number" }),
  // images: z
  //   .array(z.string().url("Invalid image URL"))
  //   .min(1, "At least one image is required")
  //   .max(4, "Maximum 4 images allowed"),
});
