"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Parallax() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[80vh] overflow-hidden bg-gray-100 top-15"
    >
      <Link href="/collections/new-collection" className="block h-full">
        <motion.div
          style={{ y }}
          className="relative w-full h-[120%] -top-[10%] will-change-transform"
        >
          <div className="hidden md:block relative w-full h-full">
            <Image
              src="/images/collections/men/parallax-desktop.png"
              alt="New Summer Collection"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="block md:hidden relative w-full h-full">
            <Image
              src="/images/collections/men/parallax-phone.png"
              alt="New Summer Collection"
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-black/20 z-10 transition-colors duration-500 hover:bg-black/40" />
        </motion.div>
      </Link>

      <div className="absolute bottom-12 left-8 md:left-16 text-[#F4F5F0] space-y-4 z-20">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight font-montserrat">
          New Summer Collection
        </h1>

        <div className="flex gap-6 pt-4">
          <Link
            href="/collections/womens"
            className="border-b border-[#F4F5F0] pb-1 uppercase text-sm font-bold hover:opacity-50 transition"
          >
            Shop Woman
          </Link>
          <Link
            href="/collections/mens"
            className="border-b border-[#F4F5F0] pb-1 uppercase text-sm font-bold hover:opacity-50 transition"
          >
            Shop Men
          </Link>
        </div>
      </div>
    </section>
  );
}
