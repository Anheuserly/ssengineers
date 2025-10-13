// components/Career/CareerHero.tsx
export default function CareerHero() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Build Your Career With Us
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
          Join SHREE GANESHE ENTERPRISES and be part of a team that's shaping the future of MEP solutions
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            View Open Positions
          </button>
          <button className="px-8 py-3 bg-transparent text-white font-medium rounded-lg hover:bg-white/10 border border-white transition-colors duration-300">
            Learn About Our Culture
          </button>
        </div>
      </div>
    </section>
  );
}