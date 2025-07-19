"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Label,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { useCart, useCheckoutStore } from "@/store";
import { PaymentFormData, paymentSchema } from "@/schema";
import { formatPrice, toast } from "@/hooks";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Payment = ({ onBack }: { onBack: () => void }) => {
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const { items, getTax, getShipping, getSubtotal, getTotal, clearCart } =
    useCart();
  const setPayment = useCheckoutStore((s) => s.setPayment);
  const address = useCheckoutStore((s) => s.address);
  const shippingMethod = useCheckoutStore((s) => s.shippingMethod);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({ resolver: zodResolver(paymentSchema) });

  const onSubmit = async (data: PaymentFormData) => {
    setPayment(data);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const orderId = Math.random().toString(36).substring(2, 15).toUpperCase();

    clearCart();
    router.push(`/checkout/success?orderId=${orderId}`);

    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${orderId} has been confirmed.`,
    });
  };

  return (
    <main className="w-full max-w-6xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Card className="w-auto border border-[var(--bg-card)] shadow">
          <CardContent className="space-y-8">
            <h2 className="text-xl font-medium mt-4">Summary</h2>
            {/* Cart Items */}
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-[var(--bg-card)] p-2 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="w-10 h-10 object-contain"
                    />
                    <span>{item.product.name}</span>
                  </div>
                  <span className="font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            {/* address and shipping method */}
            <div className="space-y-4">
              {address && (
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p>{address.address}</p>
                </div>
              )}

              {shippingMethod && (
                <div>
                  <p className="font-medium text-sm">Shipping Method</p>
                  <p>{shippingMethod}</p>
                </div>
              )}
            </div>

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

        <Card>
          <CardContent>
            <h2 className="text-lg font-bold mb-4">Payment</h2>
            <Tabs defaultValue="credit-card" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="credit-card">Credit Card</TabsTrigger>
                <TabsTrigger value="paypal">PayPal</TabsTrigger>
                <TabsTrigger value="paypal-credit">PayPal Credit</TabsTrigger>
              </TabsList>
              <TabsContent value="credit-card">
                <Image
                  src={"/images/debit-card.png"}
                  alt="Card"
                  width={300}
                  height={200}
                  className="my-6 object-contain"
                />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input
                      {...register("cardName")}
                      className="border border-[var(--text-secondary)]"
                      placeholder="Cardholder Name"
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-sm">
                        {errors.cardName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("cardNumber")}
                      className="border border-[var(--text-secondary)]"
                      placeholder="Card Number"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <Input
                      {...register("expiry")}
                      className="border border-[var(--text-secondary)]"
                      placeholder="Exp. Date"
                    />

                    <Input
                      {...register("cvv")}
                      className="border border-[var(--text-secondary)]"
                      placeholder="CVV"
                    />
                    {errors.expiry && (
                      <p className="text-red-500 text-sm">
                        {errors.expiry.message}
                      </p>
                    )}
                  </div>
                  {/* same as billing address checkbox */}
                  <div className="flex items-center space-x-2 font-medium text-sm my-8">
                    <Checkbox
                      id="sameAsBilling"
                      className="bg-black text-white shadow-md"
                      checked={sameAsBilling}
                      onCheckedChange={(checked) =>
                        setSameAsBilling(!sameAsBilling)
                      }
                    />
                    <Label htmlFor="sameAsBilling">
                      Same as billing address
                    </Label>
                  </div>

                  <div className="w-full flex gap-2">
                    <Button
                      className="w-1/2"
                      size={"lg"}
                      variant="outline"
                      onClick={onBack}
                    >
                      Back
                    </Button>
                    <Button className="w-1/2" size={"lg"} type="submit">
                      Pay
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="paypal">
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Pay securely using your PayPal account.
                  </p>
                  <Button variant="outline" size="lg" className="w-full">
                    Connect to PayPal
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="paypal-credit">
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Use PayPal Credit for flexible payments.
                  </p>
                  <Button variant="outline" size="lg" className="w-full">
                    Apply for PayPal Credit
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
export default Payment;
