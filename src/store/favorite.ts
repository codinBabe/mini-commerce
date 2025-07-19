import { create } from "zustand";
import { persist } from "zustand/middleware";

type FavoriteState = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useFavorites = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const { favorites } = get();
        const exists = favorites.includes(id);
        set({
          favorites: exists
            ? favorites.filter((fid) => fid !== id)
            : [...favorites, id],
        });
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "mini-commerce-favorites",
    }
  )
);
