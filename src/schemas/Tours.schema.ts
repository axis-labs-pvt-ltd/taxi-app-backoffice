import { z } from "zod";

// Drop Point schema
const dropPointSchema = z.object({
  id: z.coerce.number(),
  index: z.number(),
  name: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  distance: z.string().optional(),
  duration: z.string().optional(),
  lat: z.number({ error: "Latitude is required" }),
  lng: z.number({ error: "Longitude is required" }),
});

// Day-wise itinerary schema
const daySchema = z.object({
  dayNumber: z.coerce.number().int().positive(),
  title: z.string().min(1, "Day title is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  dropPoints: z.array(dropPointSchema).optional(),
});

// Main tour schema
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
    .nonnegative({ message: "Nights cannot be negative" })
    .refine((val) => !isNaN(val), { message: "Nights must be a valid number" }),
  images: z.array(z.string()).optional(),
  itinerary: z.array(daySchema).optional(),
});

// ✅ Type inference (optional)
export type TourSchemaType = z.infer<typeof tourSchema>;
