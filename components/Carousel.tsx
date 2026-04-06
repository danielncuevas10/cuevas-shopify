"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useSpring } from "framer-motion";
import AddToCartButton from "./AddToCartButton";

type Product = {
  id: string;
  handle?: string;
  title: string;
  image?: string;
  price?: string | number;
  currency?: string;
  variantId?: string | null;
  available?: boolean;
};

export default function ResponsiveCarousel({
  products,
}: {
  products: Product[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const width = e.currentTarget.offsetWidth;
    const scrollLeft = e.currentTarget.scrollLeft;
    setActiveIndex(Math.round(scrollLeft / width));
  };
  const ref = useRef<HTMLDivElement | null>(null);

  const scale = useSpring(1, { stiffness: 300, damping: 20 });

  if (!products || products.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={handleScroll}
        className="
          flex gap-1 lg:gap-3 overflow-x-auto snap-x snap-mandatory touch-pan-x py-2
          [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]
        "
      >
        {products.map((p) => (
          <article
            key={p.id}
            className="snap-start shrink-0 w-84 lg:w-xl bg-white"
          >
            <div className="relative aspect-square bg-gray-100 overflow-hidden group rounded-md">
              <Link
                href={`/product/${p.handle}`}
                className="block h-full w-full"
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-104"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-gray-500">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-black/5 z-10 transition-opacity duration-300 md:group-hover:bg-black/0" />
              </Link>

              <div className="absolute top-3 left-3 z-10">
                {p.variantId ? (
                  <motion.div style={{ scale }}>
                    <AddToCartButton
                      variantId={p.variantId}
                      title={p.title}
                      price={p.price}
                      image={p.image}
                      disabled={!p.available}
                    />
                  </motion.div>
                ) : (
                  <span className="bg-white/80 px-2 py-1 text-xs rounded shadow-sm">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="p-3">
              <div className="font-montserrat text-sm tracking-wider text-black">
                {p.title}
              </div>
              <div className="font-montserrat text-sm font-semibold mt-1">
                {p.price}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2 md:hidden">
        {products.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-10 bg-gray-700" : "w-6 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
