// components/Career/CareerCTA.tsx
export default function CareerCTA() {
  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          Ready to Join Our Team?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Take the next step in your career with SHREE GANESHE ENTERPRISES. 
          We're always looking for talented individuals to join our growing team.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            View Open Positions
          </button>
          <button className="px-8 py-3 bg-transparent text-white font-medium rounded-lg hover:bg-white/10 border border-white transition-colors duration-300">
            Contact HR
          </button>
        </div>
        <div className="mt-12 pt-8 border-t border-blue-800">
          <h3 className="text-xl font-semibold mb-4">Not Ready to Apply Yet?</h3>
          <p className="mb-6">
            Follow us on social media to stay updated about company news and future opportunities.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-blue-200 transition-colors duration-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="text-white hover:text-blue-200 transition-colors duration-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}