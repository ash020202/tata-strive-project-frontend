import { z } from 'zod';

export const reservationSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  guests: z.string().min(1, 'Please select number of guests'),
  occasion: z.string().optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;