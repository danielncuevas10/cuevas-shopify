"use client";
import { useState } from "react";

export default function SizeSelector({
  variantData,
  allSizes,
  onSelect,
}: {
  variantData: any[];
  allSizes: string[];
  onSelect: (size: string) => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handlePress = (size: string) => {
    setSelectedSize(size);
    onSelect(size);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allSizes.map((size) => {
        const variant = variantData.find((v) => v.size === size);
        const isAvailable = variant
          ? variant.available && variant.quantity > 0
          : false;
        const isSelected = selectedSize === size;

        return (
          <button
            key={size}
            type="button"
            disabled={!isAvailable}
            onClick={() => handlePress(size)}
            className={`
              border h-12 w-16 px-6 text-xs tracking-widest transition-all duration-300
              ${
                !isAvailable
                  ? "border-gray-100 text-gray-300 bg-gray-50 line-through cursor-not-allowed"
                  : isSelected
                  ? "border-black bg-black text-white"
                  : "border-black text-black hover:bg-black hover:text-white cursor-pointer"
              }
            `}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
