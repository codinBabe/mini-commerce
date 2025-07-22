"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ProductSpecsProps {
  features: string[];
}

const ProductSpecs = ({ features }: ProductSpecsProps) => {
  const [open, setOpen] = useState(false);

  const specs = [
    { label: "Screen diagonal", value: get("screen") || '6.7"' },
    { label: "The screen resolution", value: "2796×1290" },
    { label: "The screen refresh rate", value: "120 Hz" },
    { label: "The pixel density", value: "460 ppi" },
    { label: "Screen type", value: get("oled") || "OLED" },
    {
      label: "Additionally",
      value:
        "Dynamic Island, Always-On display, HDR Ready, Wide color (P3), Haptic Touch",
    },
    { label: "CPU", value: get("bionic") || "A16 Bionic" },
    { label: "Number of cores", value: get("core") || "6" },
  ];

  function get(keyword: string) {
    return features.find((f) =>
      f.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Details</h2>
      <p className="text-sm text-[var(--text-secondary)]">
        Just as a book is judged by its cover, the first thing you notice when
        you pick up a modern smartphone is the display. Nothing surprising,
        because advanced technologies allow you to practically level the display
        frames and cutouts for the front camera and speaker, leaving no room for
        bold design solutions. And how good that in such realities Apple
        everything is fine with displays. Both critics and mass consumers always
        praise the quality of the picture provided by the products of the
        Californian brand. And last year&apos;s 6.7-inch Retina panels, which
        had ProMotion, caused real admiration for many.
      </p>

      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Content>
          <table className="w-full text-sm text-left mt-4">
            <tbody>
              {specs.map(({ label, value }) => (
                <tr key={label}>
                  <td className="py-2 font-medium w-1/3">{label}</td>
                  <td className="py-2 text-gray-700">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Collapsible.Content>
        <Collapsible.Trigger className="mx-auto mt-4 flex items-center gap-1 text-sm font-medium border px-3 py-1 rounded-md hover:bg-gray-50 transition">
          View More{" "}
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </Collapsible.Trigger>
      </Collapsible.Root>
    </div>
  );
};

export default ProductSpecs;
