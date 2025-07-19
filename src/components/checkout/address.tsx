"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Button,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Separator,
} from "@/components/ui";
import { useCheckoutStore } from "@/store";
import { AddressFormData, addressSchema } from "@/schema";
import { Pencil, X, Plus } from "lucide-react";

const DEFAULT_ADDRESSES = [
  {
    name: "2118 Thornridge",
    phone: "(209) 555-0104",
    address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    type: "HOME" as const,
  },
  {
    name: "Headoffice",
    phone: "(704) 555-0127",
    address: "2715 Ash Dr. San Jose, South Dakota 83475",
    type: "OFFICE" as const,
  },
];

export default function AddressStep({ onNext }: { onNext: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const setAddress = useCheckoutStore((s) => s.setAddress);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setShowForm(false);
  };

  const handleUseSelected = () => {
    if (selectedIndex !== null) {
      setAddress(DEFAULT_ADDRESSES[selectedIndex]);
      onNext();
    }
  };

  const onSubmit = (data: AddressFormData) => {
    setAddress(data);
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Select Address</h2>

      <RadioGroup
        className="space-y-4"
        value={selectedIndex?.toString()}
        onValueChange={(val) => setSelectedIndex(Number(val))}
      >
        {DEFAULT_ADDRESSES.map((addr, i) => (
          <div
            key={i}
            className="flex items-start gap-2 p-6 rounded-md bg-[var(--bg-card)] transition cursor-pointer"
          >
            <Label
              className="flex-1 flex items-start gap-4 cursor-pointer"
              onClick={() => handleSelect(i)}
            >
              <RadioGroupItem value={i.toString()} />
              <div className="space-y-2 font-normal -mt-2">
                <span className="text-lg">{addr.name}</span>
                <span className="text-xs bg-black text-white px-2 py-0.5 rounded ml-4">
                  {addr.type}
                </span>

                <p>{addr.address}</p>
                <p>{addr.phone}</p>
              </div>
            </Label>
            <div className="flex gap-4 mt-1 text-black">
              <Pencil className="w-4 h-4" />
              <X className="w-4 h-4" />
            </div>
          </div>
        ))}
      </RadioGroup>

      <div className="relative flex flex-col items-center justify-center">
        <Separator className="my-4 border border-dashed border-[var(--text-secondary)]" />
        <span
          onClick={() => setShowForm(!showForm)}
          className="absolute top-1 left-[48%] w-6 h-6 flex items-center gap-2 p-1 bg-black rounded-full cursor-pointer"
        >
          <Plus className="text-white" />
        </span>
        <p className="text-sm">Add New Address</p>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div>
            <Label>Name</Label>
            <Input
              {...register("name")}
              className="w-full bg-[var(--bg-input)]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              {...register("phone")}
              className="w-full bg-[var(--bg-input)]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label>Address</Label>
            <Input
              {...register("address")}
              className="w-full bg-[var(--bg-input)]"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div className="flex gap-4">
            <RadioGroup
              className="flex gap-4"
              value={watch("type")}
              onValueChange={(val) =>
                setValue("type", val as "OFFICE" | "HOME")
              }
            >
              <RadioGroupItem value="HOME" id="address-type-home" />
              <Label htmlFor="address-type-home">Home</Label>
              <RadioGroupItem value="OFFICE" id="address-type-office" />
              <Label htmlFor="address-type-office">Office</Label>
            </RadioGroup>
          </div>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}

          <Button size={"lg"} type="submit" className="w-1/5 mt-4">
            Save & Continue
          </Button>
        </form>
      )}

      {!showForm && (
        <div className="flex justify-end">
          <Button size={"lg"} onClick={handleUseSelected} className="w-1/5">
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
