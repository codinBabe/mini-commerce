"use client";

import { Loader2 } from "lucide-react";
import { useProducts } from "@/hooks";
import { useFavorites } from "@/store";
import { EmptyState, ProductGrid } from "../commerce";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui";

const ProductTabs = () => {
  const { data: products, isLoading } = useProducts();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const tabStyle =
    "px-4 text-sm font-medium whitespace-nowrap data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black pb-1 text-[var(--text-secondary)] hover:text-black transition-colors";

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <Tabs defaultValue="new" className="space-y-6">
        {/* Tabs Header */}
        <TabsList className="flex items-start justify-start gap-4 pb-2 overflow-x-auto md:overflow-x-hidden">
          <TabsTrigger value="new">New Arrival</TabsTrigger>
          <TabsTrigger value="bestseller">Bestseller</TabsTrigger>
          <TabsTrigger value="featured">Featured Products</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        {/* NEW ARRIVALS */}
        <TabsContent value="new">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : (
            <ProductGrid
              products={products ?? []}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          )}
        </TabsContent>

        {/* BESTSELLER */}
        <TabsContent value="bestseller">
          <EmptyState label="No bestseller products yet." />
        </TabsContent>

        {/* FEATURED */}
        <TabsContent value="featured">
          <EmptyState label="No featured products yet." />
        </TabsContent>

        {/* FAVORITES */}
        <TabsContent value="favorites">
          {products ? (
            <ProductGrid
              products={products.filter((p: { id: string }) =>
                favorites.includes(p.id)
              )}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ) : (
            <EmptyState label="No favorites yet." />
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductTabs;
