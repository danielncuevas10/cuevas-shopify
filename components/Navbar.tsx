"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartState, useCartDispatch } from "@/components/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCartState();
  const dispatch = useCartDispatch();
  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  const navLinks = [
    { name: "Men's", href: "/collections/mens" },
    { name: "Women's", href: "/collections/womens" },
    { name: "Unisex", href: "/collections/unisex" },
  ];

  return (
    <nav className="sticky top-0 left-0 w-full bg-white text-black z-50 shadow-sm py-3 font-montserrat">
      <div className="flex justify-between items-center px-4 py-2 md:px-8 lg:px-12 md:py-4 max-w-8xl mx-auto">
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center cursor-pointer h-10 w-10 transition-transform duration-300 relative z-110"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <span className="pl-3 font-bold uppercase tracking-tighter">
                <Image
                  src="/images/bag/close.svg"
                  alt="cart"
                  width={18}
                  height={18}
                />
              </span>
            ) : (
              <Image
                src="/images/navbar/dropdown.png"
                alt="menu"
                width={20}
                height={20}
                className="object-contain"
              />
            )}
          </button>

          <div
            className={`fixed left-0 top-0 w-72 h-full bg-white shadow-2xl py-12 flex flex-col z-100 transform transition-transform duration-500 ease-in-out will-change-transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mt-8 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-8 py-5 hover:bg-gray-50 text-sm font-light tracking-[0.3em] border-b border-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pb-12">
              <Link
                href="/"
                className="px-8 py-4 text-md uppercase font-bold tracking-widest text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                CUEVAS
              </Link>
            </div>
          </div>

          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-90"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase font-bold tracking-[0.2em] hover:opacity-50 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="font-bold uppercase tracking-[0.3em] text-sm absolute left-1/2 -translate-x-1/2"
        >
          Cuevas
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch({ type: "TOGGLE_CART" })}
            className="relative hover:opacity-50 cursor-pointer transition-all"
            aria-label="Open cart"
            type="button"
          >
            <Image
              src="/images/navbar/shopping-bag.png"
              alt="cart"
              width={18}
              height={18}
            />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-4.5 h-4.5 px-1 text-[10px] font-bold leading-4.5 rounded-full bg-[#C8102E] text-white text-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/5 z-55 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}
