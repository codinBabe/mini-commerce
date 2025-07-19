"use client";

import { use } from "react";
import {
  ProductGallery,
  ProductInfo,
  ProductReviews,
  ProductSpecs,
  RelatedProducts,
} from "@/components/products";
import { useProducts } from "@/hooks";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/ui/bread-crumb-nav";

interface Props {
  params: Promise<{ slug: string }>;
}

const ProductPage = ({ params }: Props) => {
  const { slug } = use(params);

  const { data: products, isLoading } = useProducts();
  if (isLoading) return <p>Loading...</p>;

  const product = products?.find((p) => p.slug === slug);
  if (!product) return notFound();

  return (
    <section>
      <div className="max-w-6xl mx-auto p-6 space-y-24">
        <Breadcrumb />
        {/* Top section: Image and info */}
        <div className="grid md:grid-cols-2 gap-10 mt-8">
          <ProductGallery images={product.images} alt={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>
      <div className="bg-[var(--bg-section)] px-4 py-24">
        <ProductSpecs features={product.features} />
      </div>
      <div className="max-w-6xl mx-auto p-6 space-y-24">
        <ProductReviews
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
        <RelatedProducts
          currentSlug={product.slug}
          category={product.category}
          brand={product.brand}
        />
      </div>
    </section>
  );
};

export default ProductPage;
