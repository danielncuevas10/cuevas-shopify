"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCartDispatch } from "./CartContext";

const buttonClassName =
  "flex items-center justify-center w-10 h-10 bg-white rounded-full hover:scale-110 active:scale-95 transition-transform cursor-pointer";

export default function AddToCartButton({
  variantId,
  title,
  price,
  image,
  disabled,
  handle,
  requiresSelection,
}: {
  variantId: string;
  title: string;
  price?: string | number;
  image?: string;
  disabled?: boolean;
  handle?: string;
  requiresSelection?: boolean;
}) {
  const dispatch = useCartDispatch();

  // Products with several variants (e.g. sizes) can't be added blindly:
  // send the customer to the product page to pick one.
  if (requiresSelection && handle) {
    return (
      <Link
        href={`/product/${handle}`}
        style={{ willChange: "transform" }}
        className={buttonClassName}
        aria-label={`Elegir talla de ${title}`}
      >
        <Image
          src="/images/bag/toAdd.svg"
          alt="Agregar al carrito"
          width={22}
          height={22}
        />
      </Link>
    );
  }

  function handleAdd() {
    if (!variantId) return;

    let numericPrice = 0;

    if (typeof price === "string") {
      const cleaned = price.replace(/[^0-9.]/g, "");
      numericPrice = parseFloat(cleaned) || 0;
    } else if (typeof price === "number") {
      numericPrice = price;
    }

    let currency = "USD";
    if (typeof price === "string") {
      if (price.includes("MX$") || price.includes("MXN")) {
        currency = "MXN";
      }
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        variantId,
        item: {
          title,
          price: numericPrice,
          image,
          quantity: 1,
        },
      },
    });
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      style={{ willChange: "transform" }}
      className={buttonClassName}
      aria-disabled={disabled}
    >
      <Image
        src="/images/bag/toAdd.svg"
        alt="Agregar al carrito"
        width={22}
        height={22}
      />
    </button>
  );
}
