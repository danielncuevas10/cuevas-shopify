import { getCollectionByHandle } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import AddToCartButton from "@/components/AddToCartButton";
import DeliveryTrust from "@/components/DeliveryTrust";
import Footer from "@/components/Footer";

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

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return <div className="p-20 text-center">Collection not found</div>;
  }

  return (
    <>
      <Navbar />
      <Banner />
      <main className="w-full px-4 md:px-10 py-5">
        <header className="mb-6 pb-2">
          <h1 className="text-4xl text-black font-light uppercase tracking-tighter my-0">
            {collection.title}
          </h1>
          <p className="text-black max-w-2xl">{collection.description}</p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-6">
          {collection.products.edges.map((edge: any) => {
            const product = edge.node;
            const firstVariantId = product.variants?.edges[0]?.node?.id || null;
            const isAvailable = product.availableForSale ?? true;
            return (
              <div key={product.id} className="group flex flex-col">
                <div className="aspect-3/4 relative overflow-hidden mb-4">
                  <Link
                    href={`/product/${product.handle}`}
                    className="block h-full w-full"
                  >
                    <Image
                      src={product.featuredImage?.url}
                      alt={product.featuredImage?.altText || product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 z-10 transition-opacity duration-300 md:group-hover:bg-black/0" />
                  </Link>

                  <div className="absolute top-3 left-3 z-20">
                    {firstVariantId ? (
                      <AddToCartButton
                        variantId={firstVariantId}
                        title={product.title}
                        price={product.priceRange.minVariantPrice.amount}
                        image={product.featuredImage?.url}
                        disabled={!isAvailable}
                      />
                    ) : (
                      <span className="bg-white/80 px-2 py-1 text-xs rounded shadow-sm">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-sm text-black font-medium tracking-tight">
                  {product.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  ${product.priceRange.minVariantPrice.amount}
                </p>
              </div>
            );
          })}
        </div>
      </main>
      <DeliveryTrust />
      <Footer />
    </>
  );
}
