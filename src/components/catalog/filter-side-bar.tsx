"use client";

import { useState } from "react";
import { useFilters } from "@/store";
import {
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Label,
} from "../ui";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FilterSidebar({ filters }: { filters: string[] }) {
  const { filters: filterState, setBrand } = useFilters();
  const selectedBrands = filterState.brand;

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (brand: string, checked: boolean) => {
    if (checked) {
      setBrand([...selectedBrands, brand]);
    } else {
      setBrand(selectedBrands.filter((b) => b !== brand));
    }
  };

  return (
    <aside className="space-y-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center gap-x-20 w-full p-2 text-lg font-medium border-b border-b-[var(--color-gray-200)]">
          <span>Brand</span>
          <span className="ml-2">
            {isOpen ? (
              <ChevronUp className="inline" />
            ) : (
              <ChevronDown className="inline" />
            )}
          </span>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-2 mt-2">
          {filters.map((brand) => (
            <div key={brand}>
              <Label className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) =>
                    handleToggle(brand, checked === true)
                  }
                  className="h-4 w-4 bg-black text-white"
                />
                <span>{brand}</span>
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Repeat similar block for other dropdown filters */}
    </aside>
  );
}
