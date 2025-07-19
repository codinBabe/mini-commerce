"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import { Button } from "../ui";
import { cn } from "@/lib";

const highlights = [
  {
    id: "h1",
    image: "/images/popular-product.png",
    title: "Popular Products",
    description:
      "The most rugged and capable Apple Watch ever, designed for extreme sports and adventure.",
    bg: "#ffffff",
    darkBg: false,
  },
  {
    id: "h2",
    image: "/images/apple-ipad.png",
    title: "iPad Pro",
    description:
      "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    bg: "#F9F9F9",
    darkBg: false,
  },
  {
    id: "h3",
    image: "/images/samsung-galaxy.png",
    title: "Samsung Galaxy",
    description:
      "The most powerful iPhone ever, with a stunning Super Retina XDR display and advanced camera system.",
    bg: "#EAEAEA",
    darkBg: false,
  },
  {
    id: "h4",
    image: "/images/macbook-air-mobile.png",
    title: "MacBook Air",
    description:
      "Supercharged by the M2 chip, MacBook Air is thinner, faster and even more powerful than before.",
    bg: "#2C2C2C",
    darkBg: true, // Dark background
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const SpotlightProducts = () => {
  return (
    <section className="px-4 py-10">
      <div className="lg:hidden">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          arrows={false}
          showDots
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
        >
          {highlights.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center gap-6 p-6 rounded-lg"
              style={{ backgroundColor: item.bg }}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className="object-contain"
              />

              <div
                className={cn(
                  "text-center space-y-4",
                  item.darkBg ? "text-white" : "text-black"
                )}
              >
                <h2 className="text-3xl md:text-5xl font-light">
                  {item.title}
                </h2>
                <p
                  className={cn(
                    "text-sm leading-relaxed max-w-md mx-auto text-[var(--text-secondary)]"
                  )}
                >
                  {item.description}
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(
                    item.darkBg
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white"
                  )}
                >
                  Shop Now
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="hidden lg:grid grid-cols-4 gap-6">
        {highlights.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-6 p-6 rounded-lg"
            style={{ backgroundColor: item.bg }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={250}
              height={250}
              className="object-contain"
            />
            <div
              className={cn(
                "space-y-4",
                item.darkBg ? "text-white" : "text-black"
              )}
            >
              <h2 className="text-3xl font-light">{item.title}</h2>
              <p className="text-sm text-[var(--text-secondary)]">
                {item.description}
              </p>
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "text-sm",
                  item.darkBg
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-black text-black hover:bg-black hover:text-white"
                )}
              >
                Shop Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpotlightProducts;
