import Image from "next/image";

export default function DeliveryTrust() {
  return (
    <>
      <section className="w-full px-5 md:px-10 py-15">
        <div className="flex flex-col justify-center md:flex-row gap-10 lg:gap-70 text-sm text-gray-700">
          <div className="flex md:flex-col items-center gap-5">
            <Image
              src="/images/landing/iconsDelivery/delivery.png"
              alt="car"
              width={38}
              height={18}
              className="opacity-75 md:w-10 lg:w-15"
            />
            <p className="">Envío Gratis en Ordenes de $999</p>
          </div>
          <div className="flex md:flex-col items-center gap-5">
            <Image
              src="/images/landing/iconsDelivery/review.png"
              alt="review"
              width={38}
              height={18}
              className="opacity-75 md:w-10 lg:w-15"
            />
            <p className="">Miles de Reseñas de Usuarios</p>
          </div>
          <div className="flex md:flex-col items-center gap-5">
            <Image
              src="/images/landing/iconsDelivery/shopify.png"
              alt="shopify logo"
              width={38}
              height={18}
              className="opacity-75 md:w-10 lg:w-15"
            />
            <p className="">Compras Seguras Con Shopify</p>
          </div>
        </div>
      </section>
    </>
  );
}
