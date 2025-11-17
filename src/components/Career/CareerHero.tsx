// components/Career/CareerHero.tsx
export default function CareerHero() {
  return (
    <section className="relative py-24 bg-gradient-to-r from-blue-950 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
          Build Your Future With SS Engineers & Consultants
        </h1>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-90">
          Join an engineering powerhouse delivering excellence in MEP, Fire Safety,
          Electrical, and Industrial Project Consulting since 1994.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg">
            View Open Positions
          </button>
          <button className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg hover:bg-white/10 border border-white transition-all">
            Learn About Our Culture
          </button>
        </div>
      </div>
    </section>
  );
}
