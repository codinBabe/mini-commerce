"use client";

import { useProducts } from "@/hooks";
import { ProductCard } from "../commerce";
import { useFavorites } from "@/store";
import { Product } from "@/types";

const DiscountSection = () => {
  const { data: products, isLoading } = useProducts();
  const { toggleFavorite, isFavorite } = useFavorites();

  const discountedProducts = products?.slice(0, 4) || [];

  return (
    <section className="px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-medium mb-8">
        Discounts up to <span className="text-[var(--accent)]">-50%</span>
      </h2>

      {isLoading ? (
        <p className="text-center">Loading deals...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {discountedProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default DiscountSection;
