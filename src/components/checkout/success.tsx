"use client";
import { useEffect } from "react";
import { CheckCircle, Package, Home, ShoppingBag } from "lucide-react";
import { Button, Card, CardContent } from "@/components/ui";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const CheckoutSuccess = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "UNKNOWN";

  useEffect(() => {
    // Scroll to top on success page
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 pb-10">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="bg-success/10 rounded-full p-6">
          <CheckCircle className="h-16 w-16 text-success" />
        </div>
      </div>

      {/* Success Message */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Order Confirmed!</h1>
        <p className="text-xl text-muted-foreground">
          Thank you for your purchase. Your order has been successfully placed.
        </p>
      </div>

      {/* Order Details Card */}
      <Card className="text-left">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Order Details</h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-mono font-medium">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success font-medium">Confirmed</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span>
                {new Date(
                  Date.now() + 3 * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              📧 A confirmation email has been sent to your email address with
              your order details and tracking information.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          What&apos;s next?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="font-medium mb-1">1. Processing</div>
            <div className="text-muted-foreground">
              We&apos;re preparing your order
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="font-medium mb-1">2. Shipped</div>
            <div className="text-muted-foreground">
              You&apos;ll receive tracking info
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <div className="font-medium mb-1">3. Delivered</div>
            <div className="text-muted-foreground">Enjoy your purchase!</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/product">
            <ShoppingBag className="h-4 w-4 mr-2" />
            View More Products
          </Link>
        </Button>
      </div>

      {/* Support Message */}
      <div className="pt-8 border-t">
        <p className="text-sm text-muted-foreground">
          Have questions about your order? Contact our support team at{" "}
          <a
            href="mailto:support@minicommerce.com"
            className="text-primary hover:underline"
          >
            support@minicommerce.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
