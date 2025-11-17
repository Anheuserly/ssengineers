// components/Career/CareerCTA.tsx
export default function CareerCTA() {
  return (
    <section className="py-20 bg-blue-950 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
          Ready to Be Part of Our Engineering Team?
        </h2>

        <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
          Build your career with SS Engineers & Consultants — where engineering,
          innovation, and growth come together.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 shadow-lg">
            View Open Positions
          </button>
          <button className="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/10">
            Contact HR
          </button>
        </div>

        <div className="mt-14 pt-10 border-t border-blue-800">
          <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
          <p className="max-w-xl mx-auto mb-6 opacity-80">
            Follow us to stay updated on hiring, engineering events, and new opportunities.
          </p>

          <div className="flex justify-center space-x-6">
            {/* LinkedIn */}
            <a href="#" className="hover:text-blue-300 transition">
              <svg className="h-9 w-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V8h3v11zM6.5 6.7C5.6 6.7 5 6 5 5.2s.6-1.5 1.5-1.5 1.5.7 1.5 1.5c0 .9-.6 1.5-1.5 1.5zM20 19h-3v-5.7c0-3.4-4-3.1-4 0V19h-3V8h3v1.8c1.4-2.6 7-2.8 7 2.4V19z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="hover:text-blue-300 transition">
              <svg className="h-9 w-9" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.7 0H1.3C.6 0 0 .6 0 1.3v21.4C0 23.4.6 24 1.3 24h11.5v-9.3H9.7v-3.6h3.1v-2.7c0-3.1 1.9-4.8 4.7-4.8 1.3 0 2.5.1 2.8.1v3.2h-1.9c-1.5 0-1.8.7-1.8 1.8v2.3h3.6l-.5 3.6h-3.1V24h6.1c.8 0 1.3-.6 1.3-1.3V1.3C24 .6 23.4 0 22.7 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
