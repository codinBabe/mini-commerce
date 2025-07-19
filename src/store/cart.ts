import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { CartState, CartItem, Product } from "../types";

const TAX_RATE = 0.075;
const SHIPPING_RATE = 15;

export const useCart = create<CartState>()(
  persist(
    immer((set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number = 1) => {
        set((state) => {
          const existingItem: CartItem | undefined = state.items.find(
            (item: CartItem) => item.product.id === product.id
          );

          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            state.items.push({ product, quantity });
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => {
          state.items = state.items.filter(
            (item: CartItem) => item.product.id !== productId
          );
        });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const item: CartItem | undefined = state.items.find(
            (item: CartItem) => item.product.id === productId
          );
          if (item) {
            item.quantity = quantity;
          }
        });
      },

      clearCart: () => {
        set((state) => {
          state.items = [];
        });
      },

      getTax: () => {
        return get().getSubtotal() * TAX_RATE;
      },

      getShipping: () => {
        return get().getSubtotal() > 0 ? SHIPPING_RATE : 0;
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping();
      },
    })),
    {
      name: "mini-commerce-cart",
      version: 1,
    }
  )
);
