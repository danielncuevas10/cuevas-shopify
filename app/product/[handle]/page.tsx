import { getProductByHandle } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import ProductsHandle from "@/components/ProductsHandle";
import ProductActions from "@/components/ProductActions";
import DeliveryTrust from "@/components/DeliveryTrust";
import Footer from "@/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  if (!handle) return <div>Invalid Product</div>;

  const product = await getProductByHandle(handle);
  if (!product) return <div>Product Not Found</div>;

  const sizeOption = product.options.find(
    (option: any) => option.name.toLowerCase() === "size"
  );

  const availableSizes = product.variants.edges
    .filter((edge: any) => edge.node.availableForSale)
    .map((edge: any) => {
      const sizeSelection = edge.node.selectedOptions.find(
        (opt: any) => opt.name.toLowerCase() === "size"
      );
      return sizeSelection?.value;
    });

  const variantData = product.variants.edges.map((edge: any) => ({
    size:
      edge.node.selectedOptions.find(
        (opt: any) => opt.name.toLowerCase() === "size"
      )?.value || "Unisize",
    available: edge.node.availableForSale,
    quantity: edge.node.quantityAvailable ?? 0,
  }));

  const totalRemaining = variantData.reduce(
    (acc: number, curr: any) => acc + (curr.quantity || 0),
    0
  );

  const ALL_SIZES = ["S", "M", "L", "XL"];

  const isLowStock = totalRemaining > 0 && totalRemaining <= 4;

  return (
    <>
      <Navbar />
      <Banner />
      <main className="bg-white mt-5">
        <div className="md:grid md:grid-cols-[.7fr_0.8fr] lg:grid-cols-[.8fr_0.8fr] md:gap-10 md:px-10 lg:px-20 max-w-400 mx-auto">
          <div className="">
            <ProductsHandle images={product.images} />
          </div>

          <div className="px-5 my-5 md:sticky md:top-24 md:h-[calc(100vh-120px)] flex flex-col gap-10 md:gap-25 overflow-y-auto scrollbar-hide md:m-10 md:p-10">
            <div>
              <h1 className="font-montserrat mb-2 capitalize font-light tracking-wider text-black md:text-2xl">
                {product.title}
              </h1>
              <p className="font-montserrat text-sm text-black md:text-xl font-light">
                ${product.priceRange.minVariantPrice.amount}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold tracking-widest text-gray-400">
                  {sizeOption ? "Elige tu Talla" : "Talla"}
                </span>
                {isLowStock && (
                  <div className="flex items-center gap-1.5 ">
                    <span className="relative flex h-2 w-2"></span>
                    <p className="text-[10px] text-red-700 font-bold uppercase tracking-tighter">
                      Solo quedan {totalRemaining}!
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 md:py-5">
                <ProductActions
                  product={product}
                  variantData={variantData}
                  allSizes={ALL_SIZES}
                />
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-md">
              {product.description}
            </p>
          </div>
        </div>
      </main>
      <DeliveryTrust />
      <Footer />
    </>
  );
}
