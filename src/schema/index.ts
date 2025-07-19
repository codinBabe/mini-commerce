import { z } from "zod";

export const reviewSchema = z.object({
  user: z.string().max(50).optional(),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters.")
    .max(1000, "Comment must be under 1000 characters."),
  rating: z
    .number()
    .min(1, "Rating is required.")
    .max(5, "Rating must be 5 or below."),
});
export type ReviewFormData = z.infer<typeof reviewSchema>;

export const addressSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone number required"),
  address: z.string().min(5, "Address is required"),
  type: z.enum(["HOME", "OFFICE"]),
});

export type AddressFormData = z.infer<typeof addressSchema>;

export const paymentSchema = z.object({
  cardName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().length(16, "Must be 16 digits"),
  expiry: z.string().min(5),
  cvv: z.string().length(3, "CVV must be 3 digits"),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;
