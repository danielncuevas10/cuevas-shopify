import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-black min-h-[60vh] flex flex-col items-center justify-center px-5 py-20 text-center font-montserrat">
        <h1 className="text-4xl font-light uppercase tracking-tighter mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-700 max-w-md mb-8">
          El producto o colección que buscas no existe o ya no está disponible.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-[#C8102E] text-white rounded uppercase font-semibold tracking-wide hover:opacity-80"
        >
          Volver a la tienda
        </Link>
      </main>
      <Footer />
    </>
  );
}
