import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

const LOCAL_KEY = "mini-commerce-products";

const fetchProducts = async (): Promise<Product[]> => {
  const cached = localStorage.getItem(LOCAL_KEY);
  if (cached) return JSON.parse(cached);
  const res = await fetch("/data/products.json");
  const data = await res.json();
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  return data;
};

export const useProducts = () =>
  useQuery({ queryKey: ["products"], queryFn: fetchProducts });
