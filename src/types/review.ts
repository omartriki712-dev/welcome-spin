import { z } from "zod";
import { userSchema } from "./user";

export const reviewSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  user: userSchema.pick({ firstName: true, lastName: true }).optional(),
  content: z.string().trim().min(10, "Review must be at least 10 characters").max(1000, "Review must be less than 1000 characters"),
  createdAt: z.string().datetime().optional(),
});

export type Review = z.infer<typeof reviewSchema>;

export const reviewInputSchema = reviewSchema.pick({
  content: true,
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;
