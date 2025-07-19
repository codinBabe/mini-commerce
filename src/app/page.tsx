import {
  CategorySection,
  DiscountSection,
  FeaturedSection,
  Hero,
  ProductTabs,
  SaleBanner,
  SpotlightProducts,
} from "@/components/home";
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <CategorySection />
      <ProductTabs />
      <SpotlightProducts />
      <DiscountSection />
      <SaleBanner />
    </>
  );
}
