"use client";

import { Address, Payment, Shipping } from "@/components/checkout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { CreditCard, MapPin, TruckElectric } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const [tab, setTab] = useState("address");

  return (
    <main className="px-4 py-10 max-w-5xl mx-auto">
      <Tabs value={tab} onValueChange={setTab} className="space-y-10">
        <TabsList className="w-full flex items-center justify-between">
          <TabsTrigger value="address" className="flex items-center gap-2">
            <MapPin
              className={`h-6 w-6 ${
                tab === "address" ? "bg-black" : "bg-[var(--text-secondary)]"
              } rounded-full text-white p-1`}
            />
            <div className="text-left">
              <p>Step 1</p>
              <p className="-mt-1">Address</p>
            </div>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <TruckElectric
              className={`h-6 w-6 ${
                tab === "shipping" ? "bg-black" : "bg-[var(--text-secondary)]"
              } rounded-full text-white p-1`}
            />
            <div className="text-left">
              <p>Step 2</p>
              <p className="-mt-1">Shipping</p>
            </div>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard
              className={`h-6 w-6 ${
                tab === "payment" ? "bg-black" : "bg-[var(--text-secondary)]"
              } rounded-full text-white p-1`}
            />
            <div className="text-left">
              <p>Step 3</p>
              <p className="-mt-1">Payment</p>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="address">
          <Address onNext={() => setTab("shipping")} />
        </TabsContent>
        <TabsContent value="shipping">
          <Shipping
            onNext={() => setTab("payment")}
            onBack={() => setTab("address")}
          />
        </TabsContent>
        <TabsContent value="payment">
          <Payment onBack={() => setTab("shipping")} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
