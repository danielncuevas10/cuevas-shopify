"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const POPULAR_DATA = {
  women: [
    {
      id: 1,
      title: "Matching Sets",
      description: "Amazing products...",
      slug: "new-collection",
      img1: "/images/collections/women/afri.png",
      img2: "/images/collections/women/afri1.png",
    },
    {
      id: 2,
      title: "Summer Vibes",
      description: "Stay cool...",
      slug: "new-collection",
      img1: "/images/collections/women/hoodie.png",
      img2: "/images/collections/women/hoodie1.png",
    },
    {
      id: 3,
      title: "Matching Sets",
      description: "Amazing products...",
      slug: "womens",
      img1: "/images/collections/women/spain.png",
      img2: "/images/collections/women/spain1.png",
    },
    {
      id: 4,
      title: "Summer Vibes",
      description: "Stay cool...",
      slug: "womens",
      img1: "/images/collections/women/cap.png",
      img2: "/images/collections/women/cap1.png",
    },
  ],
  men: [
    {
      id: 5,
      title: "Urban Tech",
      description: "Modern fit...",
      slug: "unisex",
      img1: "/images/collections/men/ita.png",
      img2: "/images/collections/men/ita1.png",
    },
    {
      id: 6,
      title: "World Cup",
      description: "Modern fit...",
      slug: "mens",
      img1: "/images/collections/men/brazil.png",
      img2: "/images/collections/men/brazil1.png",
    },
    {
      id: 7,
      title: "Urban Tech",
      description: "Modern fit...",
      slug: "mens",
      img1: "/images/collections/men/hoodie.png",
      img2: "/images/collections/men/hoodie1.png",
    },
    {
      id: 8,
      title: "World Cup",
      description: "Modern fit...",
      slug: "unisex",
      img1: "/images/collections/men/mex.png",
      img2: "/images/collections/men/mex1.png",
    },
  ],
};

export default function PopularSection() {
  const [activeTab, setActiveTab] = useState<"men" | "women">("men");

  return (
    <section className="w-full px-4 md:px-10 py-5">
      <h2 className="font-montserrat mb-5 uppercase font-semibold">
        Popular right now
      </h2>
      <div className="flex gap-8 mb-8">
        {["men", "women"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "men" | "women")}
            className={`uppercase cursor-pointer transition-all border-b-2 pb-1 ${
              activeTab === tab
                ? "border-black font-semibold"
                : "border-transparent text-gray-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4">
        {POPULAR_DATA[activeTab].map((item) => (
          <CollectionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function CollectionCard({ item }: { item: any }) {
  return (
    <Link href={`/collections/${item.slug}`} className="group block">
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 mb-4">
        <Image
          src={item.img1}
          alt={item.title}
          fill
          className="object-cover transition-opacity duration-500 group-hover:opacity-0"
        />

        <Image
          src={item.img2}
          alt={`${item.title} hover`}
          fill
          className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>

      <h3 className="uppercase font-semibold tracking-wide text-sm">
        {item.title}
      </h3>
      <p className="text-[#777777] font-light text-xs mt-2 line-clamp-2">
        {item.description}
      </p>
    </Link>
  );
}
