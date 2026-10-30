"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="bg-white text-black min-h-screen flex flex-col items-center justify-center px-5 py-20 text-center font-montserrat">
      <h1 className="text-4xl font-light uppercase tracking-tighter mb-4">
        Algo salió mal
      </h1>
      <p className="text-gray-700 max-w-md mb-8">
        No pudimos cargar la tienda en este momento. Inténtalo de nuevo en
        unos segundos.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-8 py-3 bg-[#C8102E] text-white rounded uppercase font-semibold tracking-wide cursor-pointer hover:opacity-80"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="px-8 py-3 border border-black rounded uppercase font-semibold tracking-wide hover:bg-black hover:text-white"
        >
          Inicio
        </Link>
      </div>
    </main>
  );
}
