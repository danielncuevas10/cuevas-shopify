"use client";
import { useState, useEffect } from "react";
import SizeSelector from "./SizeSelector";
import AddToCartButtonRed from "./AddToCartButtonRed";

export default function ProductActions({
  product,
  variantData,
  allSizes,
}: {
  product: any;
  variantData: any[];
  allSizes: string[];
}) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizeOption = product.options.find(
    (opt: any) => opt.name.toLowerCase() === "size"
  );

  const isOneSize = !sizeOption || variantData.length === 1;

  useEffect(() => {
    if (isOneSize && product.variants.edges[0]) {
      const unisizeVariant = product.variants.edges[0].node;
      setSelectedVariant(unisizeVariant);
      setSelectedSize("Unisize");
    }
  }, [isOneSize, product.variants.edges]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    const variant = product.variants.edges.find((edge: any) =>
      edge.node.selectedOptions.some((opt: any) => opt.value === size)
    );
    setSelectedVariant(variant?.node);
  };

  return (
    <div className="flex flex-col gap-3 w-max mx-auto">
      {!isOneSize && variantData.length > 0 && (
        <div className="py-5">
          <SizeSelector
            variantData={variantData}
            allSizes={allSizes}
            onSelect={(size) => {
              setSelectedSize(size);
              const variant = product.variants.edges.find((edge: any) =>
                edge.node.selectedOptions.some((opt: any) => opt.value === size)
              );
              setSelectedVariant(variant?.node);
            }}
          />
        </div>
      )}

      <AddToCartButtonRed
        variantId={
          selectedVariant?.id ||
          (isOneSize ? product.variants.edges[0].node.id : "")
        }
        size={selectedSize || (isOneSize ? "Unisize" : "")}
        title={product.title}
        price={
          selectedVariant?.price.amount ||
          product.priceRange.minVariantPrice.amount
        }
        image={product.featuredImage?.url}
        disabled={!selectedVariant && !isOneSize}
      />
    </div>
  );
}
