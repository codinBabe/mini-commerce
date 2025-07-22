"use client";
import { Suspense } from "react";

import { CheckoutSuccess } from "@/components/checkout";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccess />
    </Suspense>
  );
}
