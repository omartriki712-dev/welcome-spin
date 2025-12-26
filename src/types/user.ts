import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().trim().min(1, "First name is required").max(50, "First name must be less than 50 characters"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name must be less than 50 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters"),
  hasReviewed: z.boolean().default(false),
  createdAt: z.string().datetime().optional(),
});

export type User = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginCredentials = z.infer<typeof loginSchema>;

export const signupSchema = userSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
});

export type SignupData = z.infer<typeof signupSchema>;
