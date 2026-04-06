"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCartState, useCartDispatch } from "./CartContext";

export default function CartDrawer() {
  const { items, isOpen } = useCartState();
  const dispatch = useCartDispatch();
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce(
    (s, it) => s + Number(it.price || 0) * it.quantity,
    0
  );

  async function handleCheckout() {
    setLoading(true);
    try {
      const lineItems = items.map((i) => ({
        variantId: i.variantId,
        quantity: i.quantity,
      }));
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems }),
      });
      const json = await res.json();
      if (json?.url) {
        window.location.href = json.url;
      } else {
        console.error("Checkout error", json);
        alert("Checkout failed — check console");
      }
    } catch (err) {
      console.error(err);
      alert("Checkout request failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-700"
          onClick={() => dispatch({ type: "CLOSE_CART" })}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-30 md:top-15 right-0 px-5 py-2 w-full md:w-126 bg-white border-l z-40 flex flex-col shadow-2xl transition-all duration-700 rounded-t-2xl 
    /* Calculate height: 100vh minus the top offset */
    h-[calc(100vh-7.5rem)] md:h-[calc(100vh-3.75rem)] 
    ${
      isOpen
        ? "translate-y-0 md:translate-x-0"
        : "translate-y-full md:translate-x-full"
    }`}
      >
        <button
          onClick={() => dispatch({ type: "CLOSE_CART" })}
          className="flex justify-end text-black w-full py-4 cursor-pointer hover:opacity-40"
        >
          <Image
            src="/images/bag/close.svg"
            alt="user"
            width={20}
            height={20}
          />
        </button>

        <h3 className="font-bold mb-2 text-black uppercase text-center py-2">
          Tu carrito
        </h3>

        <div className="flex-1 overflow-y-auto px-5 no-scrollbar flex flex-col">
          {items.length >= 1 ? (
            <div className="mt-4 w-full py-2 bg-[#F5F5F5] rounded-sm text-black mb-10">
              <div className="p-2 flex content-start">
                <Image
                  src="/images/bag/attention.svg"
                  alt="user"
                  width={20}
                  height={20}
                />
                <p className="px-2 text-gray-700">
                  <span className="font-bold text-black">
                    Tus artículos no están reservados
                  </span>
                  , realiza tu compra rápidamente para asegurarte de no
                  perdértelos.
                </p>
              </div>
            </div>
          ) : null}

          {items.length === 0 ? (
            <div className="h-3/4 flex items-center justify-center">
              <div className="text-sm text-black flex flex-col items-center">
                <Image
                  src="/images/bag/empty.svg"
                  alt="user"
                  width={120}
                  height={200}
                  className="opacity-70"
                />
                <p className="py-5 uppercase font-bold text-l">
                  Tu carrito está vacío
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto px-5 no-scrollbar">
              <ul className="space-y-3 text-black">
                {items.map((it) => (
                  <li
                    key={it.variantId}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="flex">
                        {it.image && (
                          <Image
                            src={it.image}
                            alt={it.title}
                            width={120}
                            height={50}
                            className="rounded"
                          />
                        )}
                        <div className="text-sm font-medium text-black px-5 flex flex-col">
                          <span className="uppercase">{it.title}</span>

                          {it.size && (
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                              Talla:{" "}
                              <span className="text-black font-bold">
                                {it.size}
                              </span>
                            </span>
                          )}

                          <div className="flex items-center gap-2">
                            <div className="text-sm font-bold pt-2">
                              {it.price
                                ? `$${Number(it.price).toLocaleString()}`
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 px-7">
                        <button
                          onClick={() => {
                            if (it.quantity === 1) {
                              dispatch({
                                type: "REMOVE_ITEM",
                                payload: { variantId: it.variantId },
                              });
                            } else {
                              dispatch({
                                type: "SET_QUANTITY",
                                payload: {
                                  variantId: it.variantId,
                                  quantity: it.quantity - 1,
                                },
                              });
                            }
                          }}
                          className="text-m text-black tracking-tighter"
                        >
                          --
                        </button>

                        <span className="w-6 text-center text-m text-black">
                          {it.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch({
                              type: "SET_QUANTITY",
                              payload: {
                                variantId: it.variantId,
                                quantity: it.quantity + 1,
                              },
                            })
                          }
                          className="text-m text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="p-5 mt-2 bg-white border-t border-gray-100">
                <div className="flex justify-between font-bold text-black uppercase tracking-widest text-xs mb-4">
                  Subtotal: ${subtotal.toLocaleString()}
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="mt-4 w-full py-3 bg-[#C8102E] text-white rounded disabled:opacity-50 uppercase font-semibold tracking-wide cursor-pointer hover:opacity-80"
                >
                  {loading ? "Procesando compra..." : "Finalizar compra"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
