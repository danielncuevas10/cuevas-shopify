export default function AboutUs() {
  return (
    <section className="bg-[#18181B] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1  gap-8">
          <div>
            <h3 className="uppercase text-white font-bold text-xs tracking-widest mb-4">
              ¿Quiénes somos?
            </h3>
            <p className="text-smleading-relaxed">
              Nacimos en México con una visión clara: crear una marca nueva,
              moderna y con estilo propio para una generación que quiere
              destacar.
            </p>
          </div>

          <div>
            <h3 className="uppercase text-white font-bold text-xs tracking-widest mb-4">
              Nuestra visión
            </h3>
            <p className="text-sm leading-relaxed">
              Diseñamos piezas con identidad, que van con tendencias y con una
              esencia auténtica que representa lo nuevo del estilo mexicano.
            </p>
          </div>

          <div>
            <h3 className="uppercase text-white font-bold text-xs tracking-widest mb-4">
              Nuestra comunidad
            </h3>
            <p className="text-sm leading-relaxed">
              Hecho para personas seguras, creativas y con actitud. Una
              comunidad que impulsa una nueva forma de vestir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
