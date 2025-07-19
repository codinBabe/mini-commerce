"use client";

import { FilterSidebar } from "@/components/catalog";
import { ProductGrid } from "@/components/commerce";
import Breadcrumb from "@/components/ui/bread-crumb-nav";
import Pagination from "@/components/ui/pagination";
import { useProducts } from "@/hooks";
import { useFilters } from "@/store";
import { useParams } from "next/navigation";

export default function CataloguePage() {
  const { category } = useParams();
  const { data: products = [] } = useProducts();
  const { filters } = useFilters();

  // Filter logic
  const filtered = products.filter((p) => {
    return (
      p.category === category &&
      (filters.brand.length === 0 || filters.brand.includes(p.brand)) &&
      (filters.features.length === 0 ||
        filters.features.every((f) => p.features.includes(f)))
    );
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb />
      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar filters={[...new Set(products.map((p) => p.brand))]} />
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <p>Selected Products: {filtered.length}</p>
            <select className="border p-2 text-sm rounded">
              <option>By Rating</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <ProductGrid
            products={filtered}
            toggleFavorite={() => {}}
            isFavorite={() => false}
          />
          <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
        </div>
      </div>
    </main>
  );
}
