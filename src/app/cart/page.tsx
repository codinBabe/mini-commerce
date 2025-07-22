"use client";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  Button,
  Separator,
  Input,
  Label,
} from "@/components/ui";
import { useCart } from "@/store";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/hooks";

export default function Cart() {
  const {
    items,
    updateQuantity,
    removeItem,
    getTax,
    getShipping,
    getSubtotal,
    getTotal,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-md">
          Looks like you haven&apos;t added any products to your cart yet. Start
          shopping to fill it up!
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="w-full max-w-6xl mx-auto px-4 py-10 md:py-20 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.product.id} className="overflow-hidden">
              <CardContent className="flex items-center justify-between gap-4 p-5 border-b border-[#a3a3a3]">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-card flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}

                <div>
                  <h3 className="font-semibold text-foreground line-clamp-1">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.product.category}
                  </p>
                  <p>{item.product.id}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium border rounded p-1">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Price */}
                <div className="">
                  <p className="font-semibold text-price">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(item.product.price)} each
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(item.product.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="">
          <Card className="sticky top-24 border border-[rgb(235,235,235)] shadow">
            <CardContent className="p-10 lg:p-16 space-y-8">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <form>
                <div className="space-y-3">
                  <Label
                    htmlFor="promo-code"
                    className="text-[var(--text-secondary)]"
                  >
                    Discount code / Promo code
                  </Label>
                  <Input
                    placeholder="Enter code"
                    className="border border-[#9f9f9f] p-2"
                  />
                  <Label
                    htmlFor="bonus-card"
                    className="text-[var(--text-secondary)]"
                  >
                    Your bonus card number
                  </Label>
                  <div className="flex items-center space-x-2 border border-[#9f9f9f] rounded-lg p-2">
                    <Input placeholder="Enter card number" className="flex-1" />
                    <Button size="sm" variant="outline" type="submit">
                      Apply
                    </Button>
                  </div>
                </div>
              </form>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-medium">
                    {formatPrice(getSubtotal())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium text-success">
                    {formatPrice(getTax())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Estimated shipping & Handling
                  </span>
                  <span className="font-medium">
                    {formatPrice(getShipping())}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-price">{formatPrice(getTotal())}</span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full mt-6 font-medium">
                <Link href="/checkout">Checkout</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
