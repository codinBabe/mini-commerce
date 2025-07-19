"use client";

import { useState } from "react";

import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui";
import {
  BatteryMedium,
  Camera,
  CheckCircle,
  Cpu,
  ShieldCheck,
  Smartphone,
  Truck,
  XCircle,
} from "lucide-react";
import { useCart } from "@/store";
import { toast } from "@/hooks/use-toast";
import { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const {
    name,
    price,
    originalPrice,
    rating,
    reviewCount,
    description,
    inStock,
    features,
  } = product;
  const colors = ["#000000", "#781DBC", "#E10000", "#E1B000", "#E8E8E8"];
  const storages = ["128GB", "256GB", "512GB", "1TB"];

  const [selectedStorage, setSelectedStorage] = useState(storages[0]);

  const getFeature = (keyword: string) => {
    return features.find((f) =>
      f.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-4xl font-bold">{name}</h1>

      {/* Price Display */}
      <div className="flex items-center gap-2 text-xl">
        <span className="font-medium md:text-3xl">{formatPrice(price)}</span>
        {originalPrice !== undefined && originalPrice > price && (
          <span className="text-[#A0A0A0] line-through">
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>

      {/* Colors */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Select color :</span>
        {colors.map((color, idx) => (
          <span
            key={idx}
            className="w-8 h-8 rounded-full cursor-pointer"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Storage Options */}
      <div className="flex flex-wrap gap-2">
        {storages.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedStorage(size)}
            className={`px-8 py-2 border rounded-md text-sm ${
              selectedStorage === size
                ? "border-black font-semibold"
                : "border-[#D5D5D5] text-[#6f6f6f]"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-3 gap-3 text-sm text-[#4E4E4E] pt-2">
        <div className="bg-[#F4F4F4] rounded-md flex items-start justify-center gap-1 p-2 text-center">
          {/* icon with fill 4E4E4E */}
          <Smartphone className="h-6 w-6 " />
          <div>
            <p className="font-medium text-[#A7A7A7]">Screen size</p>
            <p className="">{getFeature('"') || '6.7"'}</p>
          </div>
        </div>
        <div className="bg-[#F4F4F4] rounded-md flex items-start justify-center gap-1 p-2 text-center">
          <Cpu className="h-6 w-6 " />
          <div>
            <p className="font-medium text-[#A7A7A7]">CPU</p>
            <p className="">{getFeature("bionic") || "-"}</p>
          </div>
        </div>
        <div className="bg-[#F4F4F4] rounded-md flex items-start justify-center gap-1 p-2 text-center">
          <Cpu className="h-6 w-6 " />
          <div>
            <p className="font-medium text-[#A7A7A7]">Cores</p>
            <p className="">{getFeature("core") || "6"}</p>
          </div>
        </div>
        <div className="bg-[#F4F4F4] rounded-md flex items-start justify-center gap-1 p-2 text-center">
          <Camera className="h-6 w-6 " />
          <div>
            <p className="font-medium text-[#A7A7A7]">Main camera</p>
            <p className="">{getFeature("mp") || "48–12 MP"}</p>
          </div>
        </div>
        <div className="bg-[#F4F4F4] rounded-md flex items-start justify-center gap-1 p-2 text-center">
          <Camera className="h-6 w-6 mb-1 " />
          <div>
            <p className="font-medium text-[#A7A7A7]">Front-camera</p>
            <p className="">{getFeature("front") || "12 MP"}</p>
          </div>
        </div>
        <div className="bg-[#F4F4F4] rounded-md flex items-start justify-center gap-1 p-2 text-center">
          <BatteryMedium className="h-6 w-6 mb-1 " />
          <div>
            <p className="font-medium text-[#A7A7A7]">Battery</p>
            <p className="">{getFeature("mah") || "4323 mAh"}</p>
          </div>
        </div>
      </div>

      {/* Description w/ Collapsible */}
      <Collapsible>
        <CollapsibleContent className="text-sm text-[var(--text-secondary)] data-[state=closed]:line-clamp-2">
          {description} Incredible photosas in week, yes and in bright lighting
          the new system with two cameras
        </CollapsibleContent>
        <CollapsibleTrigger className="text-[#2c2c2c] text-sm font-medium">
          more...
        </CollapsibleTrigger>
      </Collapsible>

      {/* Buttons */}
      <div className="w-full flex gap-2">
        <Button variant="outline" size={"sm"} className="w-1/2 p-2">
          Add to Wishlist
        </Button>
        <Button
          disabled={!inStock}
          size={"sm"}
          className="w-1/2 p-2"
          onClick={handleAddToCart}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>

      {/* Delivery & Guarantee Badges */}
      <div className="grid grid-cols-3 gap-2 mt-4 text-center text-sm text-black">
        <div className="flex items-center gap-2">
          <div className="bg-[#F6F6F6] rounded p-3 mb-1">
            <Truck className="h-5 w-5 mb-1" />
          </div>
          <div>
            <p className="text-[#717171]">Free Delivery</p>
            <p className="font-medium">1–2 day</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#F6F6F6] rounded p-3 mb-1">
            {inStock ? (
              <CheckCircle className="h-5 w-5 mb-1" />
            ) : (
              <XCircle className="h-5 w-5 mb-1" />
            )}
          </div>
          <div>
            <p className="text-[#717171]">
              {inStock ? "In Stock" : "Out of Stock"}
            </p>
            <p className="font-medium">Today</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#F6F6F6] rounded p-3 mb-1">
            <ShieldCheck className="h-5 w-5 mb-1" />
          </div>
          <div>
            <p className="text-[#717171]">Guaranteed</p>
            <p className="font-medium">1 year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
