import Image from "next/image";
import { Button, Card, CardContent } from "../ui";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import Link from "next/link";

interface Props {
  product: Product;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const ProductCard = ({ product, toggleFavorite, isFavorite }: Props) => {
  return (
    <Card className="text-center bg-[var(--bg-card)] shadow-sm space-y-4 p-4 hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="text-[var(--text-secondary)] hover:text-red-500"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product.id);
            }}
            aria-label="Toggle favorite"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite(product.id) ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

        <Image
          src={product.images[0]}
          alt={product.description}
          width={200}
          height={200}
          className="mx-auto object-contain"
        />
        <CardContent>
          <h4 className="font-medium text-sm">{product.description}</h4>
          <p className="font-semibold text-xl">${product.price}</p>
        </CardContent>

        <Button size="lg" className="w-full rounded-lg text-sm">
          Buy Now
        </Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
