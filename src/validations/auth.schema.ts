import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Username cannot exceed 10 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password cannot exceed 12 characters'),
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Username cannot exceed 10 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(12, 'Password cannot exceed 12 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;