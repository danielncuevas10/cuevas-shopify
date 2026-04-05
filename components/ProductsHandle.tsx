"use client";
import { motion, useSpring } from "framer-motion";
import { useState } from "react";

export default function ProductGallery({ images }: { images: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const springValue = useSpring(1, { stiffness: 300, damping: 30 });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const width = e.currentTarget.offsetWidth;
    const scrollLeft = e.currentTarget.scrollLeft;
    setActiveIndex(Math.round(scrollLeft / width));
  };

  return (
    <div className="relative flex flex-col">
      <div
        onScroll={handleScroll}
        className="
          grid grid-cols-2 md:grid-cols-1 md:sticky md:h-fit gap-4 
          max-sm:flex max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory 
          [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]
        "
      >
        {images.slice(1).map((img, index) => (
          <motion.img
            key={index}
            src={img.url}
            alt={img.altText || ""}
            style={{ willChange: "transform", scale: springValue }}
            className="rounded-lg object-cover w-full h-auto max-sm:shrink-0 max-sm:snap-center "
          />
        ))}
      </div>

      <div
        className="
        hidden max-sm:flex 
        absolute bottom-4 left-1/2 -translate-x-1/2 
        gap-2 z-10
      "
      >
        {images.slice(1).map((_, i) => (
          <div
            key={i}
            className={`h-0.5 w-8 transition-all duration-300 ${
              i === activeIndex ? "bg-gray-600" : "bg-[#F4F5F0]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
