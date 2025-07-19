"use client";

import { useProducts } from "@/hooks";
import { Product } from "@/types";
import { ProductCard } from "../commerce";

export default function RelatedProducts({
  currentSlug,
  category,
  brand,
}: {
  currentSlug: string;
  category: string;
  brand: string;
}) {
  const { data: products } = useProducts();

  if (!products) return null;

  const related = products
    .filter(
      (p) =>
        p.slug !== currentSlug && (p.category === category || p.brand === brand)
    )
    .slice(0, 4); // limit to 4

  if (related.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Related Products</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={() => false}
            toggleFavorite={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
