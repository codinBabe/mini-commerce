"use client";

import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Computer,
  GamepadIcon,
  Headphones,
  Smartphone,
  Watch,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";

const CategorySection = () => {
  const categories = [
    { id: 1, text: "Phones", value: "phones", icon: Smartphone },
    { id: 2, text: "Smart Watches", value: "smartwatches", icon: Watch },
    { id: 3, text: "Cameras", value: "camera", icon: Camera },
    { id: 4, text: "Headphones", value: "headphones", icon: Headphones },
    { id: 5, text: "Computers", value: "computers", icon: Computer },
    { id: 6, text: "Accessories", value: "accessories", icon: GamepadIcon },
  ];

  return (
    <section className="bg-[var(--bg-section)] my-10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-lg font-semibold">Browse By Category</p>
          <div>
            <Button size="icon" variant="ghost">
              <ChevronLeft />
            </Button>
            <Button size="icon" variant="ghost">
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog/${category.value}`}
              className="bg-[var(--bg-secondary)] rounded-2xl p-6 flex flex-col items-center justify-center"
            >
              <category.icon className="w-8 h-8 mb-2" />
              <p className="text-sm font-medium">{category.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
