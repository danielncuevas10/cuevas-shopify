import Image from "next/image";
import Navbar from "@/components/Navbar";
import AddToCartButton from "@/components/AddToCartButton";
import ResponsiveCarousel from "@/components/Carousel";
import { getCollectionByHandle } from "../lib/shopify";
import LandingImage from "@/components/LandingImage";
import PupularSection from "@/components/PopularSection";
import Parallax from "@/components/Parallax";
import DeliveryTrust from "@/components/DeliveryTrust";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export default async function Home() {
  const [newCol, womensCol, unisexCol, mensCol] = await Promise.all([
    getCollectionByHandle("new-collection", 12),
    getCollectionByHandle("womens", 12),
    getCollectionByHandle("unisex", 12),
    getCollectionByHandle("mens", 12),
  ]);

  const formatPrice = (amount?: string | number, code?: string) => {
    if (!amount) return "";
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: code || "MXN",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  };

  const toProductList = (collection: any) =>
    (collection?.products?.edges || []).map((e: any) => {
      const p = e.node;
      const firstVariant = p.variants?.edges?.[0]?.node;
      return {
        id: p.id,
        handle: p.handle,
        title: p.title,
        image: p.featuredImage?.url,
        price: formatPrice(
          p.priceRange?.minVariantPrice?.amount,
          p.priceRange?.minVariantPrice?.currencyCode
        ),
        variantId: firstVariant?.id,
        available: firstVariant?.availableForSale,
      };
    });

  const newProducts = toProductList(newCol);
  const womensProducts = toProductList(womensCol);
  const unisexProducts = toProductList(unisexCol);
  const mensProducts = toProductList(mensCol);

  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar />

      <LandingImage />

      <section className="w-full pl-4 pr-0 md:pl-10 py-15">
        <h2 className="font-montserrat mb-10 uppercase font-semibold">
          just dropped in
        </h2>
        <ResponsiveCarousel products={newProducts} />
      </section>

      <PupularSection />

      <Parallax />

      <section className="w-full pl-4 pr-0 md:pl-10 pt-25">
        <h2 className="font-montserrat mb-10 uppercase font-semibold">
          New season
        </h2>
        <ResponsiveCarousel products={unisexProducts} />
      </section>
      <DeliveryTrust />
      <AboutUs />
      <Footer />
    </main>
  );
}
