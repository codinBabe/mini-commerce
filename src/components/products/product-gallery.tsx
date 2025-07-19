"use client";
import Image from "next/image";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

const ProductGallery = ({ images, alt }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className=" p-2">
        <Image
          src={selectedImage}
          alt={alt}
          width={400}
          height={400}
          className="mx-auto object-contain"
        />
      </div>
      <div className="flex gap-2 justify-center">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`border rounded-md p-1 ${
              selectedImage === img ? "border-black" : "border-gray-300"
            }`}
          >
            <Image
              src={img}
              alt={`${alt} thumbnail ${idx + 1}`}
              width={60}
              height={60}
              className="object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
