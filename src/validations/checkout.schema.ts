import { z } from "zod";

export const checkoutSchema = z.object({
    address: z.string().min(1, { message: 'Address is required' }),
    phone: z
        .string()
        .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits' }),
});



export type CheckoutFormData = z.infer<typeof checkoutSchema>;