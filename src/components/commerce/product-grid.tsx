import { Product } from "@/types";
import ProductCard from "./product-card";

interface Props {
  products: Product[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const ProductGrid = ({ products, toggleFavorite, isFavorite }: Props) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400 text-sm">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
