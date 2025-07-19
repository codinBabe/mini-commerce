import { create } from "zustand";

type Filters = {
  brand: string[];
  features: string[];
  rating: number | null;
};

interface FilterState {
  filters: Filters;
  setBrand: (brands: string[]) => void;
  setFeatures: (features: string[]) => void;
  setRating: (rating: number | null) => void;
  resetFilters: () => void;
}

export const useFilters = create<FilterState>((set) => ({
  filters: {
    brand: [],
    features: [],
    rating: null,
  },
  setBrand: (brand) =>
    set((state) => ({ filters: { ...state.filters, brand } })),
  setFeatures: (features) =>
    set((state) => ({ filters: { ...state.filters, features } })),
  setRating: (rating) =>
    set((state) => ({ filters: { ...state.filters, rating } })),
  resetFilters: () =>
    set(() => ({
      filters: { brand: [], features: [], rating: null },
    })),
}));
