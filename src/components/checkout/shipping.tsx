"use client";

import {
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  Calendar,
} from "@/components/ui";
import { useCheckoutStore } from "@/store";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const shippingOptions = [
  {
    label: "Free",
    value: "free",
    text: "Regular shipment",
    defaultDate: "17 Oct, 2023",
  },
  {
    label: "$8.50",
    value: "express",
    text: "Get your delivery as soon as possible",
    defaultDate: "1 Oct, 2023",
  },
  {
    label: "Schedule",
    value: "schedule",
    text: "Pick a date when you want to get your delivery",
    defaultDate: null,
  },
];

const Shipping = ({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) => {
  const shippingMethod = useCheckoutStore((s) => s.shippingMethod);
  const setShippingMethod = useCheckoutStore((s) => s.setShippingMethod);

  const shippingDate = useCheckoutStore((s) => s.shippingDate);
  const setShippingDate = useCheckoutStore(
    (s) => s.setShippingDate as (date: Date | null) => void
  );

  const [showCalendar, setShowCalendar] = useState(false);
  type ShippingMethod = "free" | "express" | "schedule";

  const getDisplayDate = (value: ShippingMethod) => {
    if (value === "schedule") {
      return shippingDate
        ? format(shippingDate, "dd MMM, yyyy")
        : "Select Date";
    }
    const option = shippingOptions.find((opt) => opt.value === value);
    return option?.defaultDate ?? "";
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setShippingDate(date);
      setShowCalendar(false);
    }
  };

  return (
    <div className="space-y-6">
      <RadioGroup
        className="space-y-4"
        value={shippingMethod}
        onValueChange={(val) => {
          setShippingMethod(val as "free" | "express" | "schedule");
          if (val !== "schedule") setShippingDate(null);
        }}
        aria-label="Shipping Method"
      >
        {shippingOptions.map((option) => (
          <Label
            key={option.value}
            className={`border p-4 rounded-md flex items-center justify-between cursor-pointer border-[var(--text-secondary)]`}
          >
            <RadioGroupItem
              value={option.value}
              checked={shippingMethod === option.value}
              onChange={() => setShippingMethod(option.value as ShippingMethod)}
              className="mr-4"
            />
            <div
              className={`flex-1 flex items-center gap-2 ${
                option.value === shippingMethod
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              <p>{option.label}</p>
              <p className="text-xs">{option.text}</p>
            </div>
            <p
              className={`text-sm flex items-center gap-1 ${
                option.value === shippingMethod
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)]"
              }`}
              onClick={() => {
                if (option.value === "schedule") setShowCalendar(!showCalendar);
              }}
            >
              {getDisplayDate(option.value as ShippingMethod)}
              {option.value === "schedule" && (
                <ChevronDown className="w-4 h-4" />
              )}
            </p>
          </Label>
        ))}
      </RadioGroup>

      {/* Calendar Picker */}
      {shippingMethod === "schedule" && showCalendar && (
        <div className="mt-4 border rounded-md p-4 w-fit">
          <Calendar
            mode="single"
            selected={shippingDate ?? undefined}
            onSelect={handleDateSelect}
          />
        </div>
      )}

      <div className="flex justify-end gap-2 mt-10">
        <Button
          size={"lg"}
          variant="outline"
          className="w-1/5"
          onClick={onBack}
        >
          Back
        </Button>
        <Button size={"lg"} className="w-1/5" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Shipping;
