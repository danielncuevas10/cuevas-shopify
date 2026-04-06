import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#18181B] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Tienda</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections/new-collection"
                  className="hover:text-white transition-colors"
                >
                  Nueva colección
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/new-collection"
                  className="hover:text-white transition-colors"
                >
                  Más vendidos
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/new-collection"
                  className="hover:text-white transition-colors"
                >
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/new-collection"
                  className="hover:text-white transition-colors"
                >
                  Todas las colecciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Popular</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections/mens"
                  className="hover:text-white transition-colors"
                >
                  Hombre
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/womens"
                  className="hover:text-white transition-colors"
                >
                  Mujer
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/unisex"
                  className="hover:text-white transition-colors"
                >
                  Accessorios
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/unisex"
                  className="hover:text-white transition-colors"
                >
                  Unisex
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="/faq" className="hover:text-white transition-colors">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="hover:text-white transition-colors"
                >
                  Información de envíos
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="hover:text-white transition-colors"
                >
                  Devoluciones
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contáctanos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400 text-center md:flex">
              <p className="">Designed and developed by The Cave.</p>{" "}
              <p className="py-2 md:py-0 md:px-5 lg:px-15">
                {" "}
                © {new Date().getFullYear()} Cuevas. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-5 py-2">
              <Image
                src="/images/landing/iconsPayment/apple.png"
                alt="Apple Pay"
                width={32}
                height={20}
                className="h-5 w-auto object-contain"
              />
              <Image
                src="/images/landing/iconsPayment/visa.png"
                alt="Visa"
                width={38}
                height={20}
                className="h-5 w-auto object-contain"
              />
              <Image
                src="/images/landing/iconsPayment/mastercard.png"
                alt="Mastercard"
                width={38}
                height={20}
                className="h-5 w-auto object-contain"
              />
              <Image
                src="/images/landing/iconsPayment/paypal.png"
                alt="PayPal"
                width={38}
                height={20}
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
