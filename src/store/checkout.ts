import { create } from "zustand";

export type Address = {
  name: string;
  phone: string;
  address: string;
  type: "HOME" | "OFFICE";
};

export type ShippingOption = "free" | "express" | "schedule";

export type PaymentInfo = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

interface CheckoutState {
  address: Address | null;
  shippingMethod: ShippingOption;
  payment: PaymentInfo | null;
  shippingDate: Date | null;
  setAddress: (address: Address) => void;
  setShippingMethod: (method: ShippingOption) => void;
  setPayment: (payment: PaymentInfo) => void;
  setShippingDate: (date: Date) => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  address: null,
  shippingMethod: "free",
  payment: null,
  shippingDate: null,
  setAddress: (address) => set({ address }),
  setShippingMethod: (method) => set({ shippingMethod: method }),
  setPayment: (payment) => set({ payment }),
  setShippingDate: (date) => set({ shippingDate: date }),
}));
