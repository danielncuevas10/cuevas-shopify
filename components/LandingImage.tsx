"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const HERO_CONTENT = [
  {
    id: 1,
    mobileSrc: "/images/landing/landing1-mobile.png",
    desktopSrc: "/images/landing/landing1-desktop.png",
    title: "Nueva Colleción de Verano",
    link: "/collections/new-collection",
  },
  {
    id: 2,
    mobileSrc: "/images/landing/landing4-mobile.png",
    desktopSrc: "/images/landing/landing4-desktop.png",
    title: "Esenciales de la Copa del Mundo",
    link: "/collections/mens",
  },
  {
    id: 3,
    mobileSrc: "/images/landing/landing5-mobile.png",
    desktopSrc: "/images/landing/landing5-desktop.png",
    title: "Esenciales Diarios",
    link: "/collections/unisex",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_CONTENT.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = HERO_CONTENT[currentIndex];

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-gray-100">
      <Link href={currentHero.link}>
        <div className="relative w-full h-full cursor-pointer">
          <div className="hidden md:block relative w-full h-full">
            <Image
              src={currentHero.desktopSrc}
              alt={currentHero.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="block md:hidden relative w-full h-full">
            <Image
              src={currentHero.mobileSrc}
              alt={currentHero.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/10 md:bg-black/30 z-10 transition-opacity duration-300 md:group-hover:bg-black/60" />
        </div>
      </Link>

      <div className="absolute bottom-12 left-8 md:left-16 text-[#F4F5F0] space-y-4 z-20">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight font-montserrat">
          {currentHero.title}
        </h1>

        <div className="flex gap-6 pt-4">
          <Link
            href="/collections/womens"
            className="border-b border-[#F4F5F0] pb-1 uppercase text-sm font-bold hover:opacity-50 transition"
          >
            Comprar Mujer
          </Link>
          <Link
            href="/collections/mens"
            className="border-b border-[#F4F5F0] pb-1 uppercase text-sm font-bold hover:opacity-50 transition"
          >
            Comprar Hombre
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 right-8 flex gap-2">
        {HERO_CONTENT.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 w-8 transition-all ${
              i === currentIndex ? "bg-gray-600" : "bg-[#F4F5F0]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
