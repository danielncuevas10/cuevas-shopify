"use client";

import React from "react";
import { useCartDispatch } from "./CartContext";

export default function AddToCartButtonRed({
  variantId,
  title,
  price,
  image,
  disabled,
  size,
}: {
  variantId: string;
  title: string;
  price?: string | number;
  image?: string;
  disabled?: boolean;
  size?: string;
}) {
  const dispatch = useCartDispatch();

  function handleAdd() {
    if (!variantId) return;
    dispatch({
      type: "ADD_ITEM",
      payload: {
        variantId,
        item: { title, price, image, quantity: 1, size },
      },
    });
    dispatch({ type: "OPEN_CART" });
  }

  return (
    <main className="px-5 py-2 cursor-pointer">
      <button
        onClick={handleAdd}
        disabled={disabled}
        className="mt-4 w-full p-12 md:px-5 py-4 bg-[#C8102E] text-white rounded disabled:opacity-50 uppercase font-semibold tracking-wide cursor-pointer"
        aria-disabled={disabled}
      >
        Agregar al Carrito
      </button>
    </main>
  );
}
