export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTax: () => number;
  getShipping: () => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}
