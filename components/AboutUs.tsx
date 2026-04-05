export default function AboutUs() {
  return (
    <section className="bg-[#18181B] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1  gap-8">
          <div>
            <h3 className="uppercase text-white font-bold text-xs tracking-widest mb-4">
              The Brand
            </h3>
            <p className="text-smleading-relaxed">
              Born in the heart of Mexico, we are an alternative design house
              reimagining street culture for the next generation.
            </p>
          </div>

          <div>
            <h3 className="uppercase text-white font-bold text-xs tracking-widest mb-4">
              The Vision
            </h3>
            <p className="text-sm leading-relaxed">
              We bridge the gap between traditional craftsmanship and
              contemporary design, creating pieces that speak your language.
            </p>
          </div>

          <div>
            <h3 className="uppercase text-white font-bold text-xs tracking-widest mb-4">
              Our Community
            </h3>
            <p className="text-sm leading-relaxed">
              Made for the bold, the young, and the dreamers. Join the movement
              shifting the narrative of Mexican fashion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
