import Link from "next/link";
import React from "react";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "#",
      colorClass: "hover:bg-blue-600",
      svg: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-10h3v1.623c1.396-2.586 7-2.777 7 2.476v5.901z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      colorClass: "hover:bg-gradient-to-r from-purple-600 to-pink-600",
      svg: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.92 4.92 0 0 1 1.75 1.145 4.92 4.92 0 0 1 1.145 1.75c.163.457.347 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.92 4.92 0 0 1-1.145 1.75 4.92 4.92 0 0 1-1.75 1.145c-.457.163-1.257.347-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.92 4.92 0 0 1-1.75-1.145 4.92 4.92 0 0 1-1.145-1.75c-.163-.457-.347-1.257-.403-2.427C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427A4.92 4.92 0 0 1 3.781 2.973a4.92 4.92 0 0 1 1.75-1.145c.457-.163 1.257-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0 3.675a6.162 6.162 0 1 0 0 12.324A6.162 6.162 0 0 0 12 5.838zm6.406-1.683a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
        </svg>
      ),
    },
  ];

  const services = [
    "MEP Consulting",
    "Fire Safety Engineering",
    "Electrical Systems",
    "HVAC Solutions",
    "Plumbing & Piping",
    "Project Management",
  ];

  return (
    <footer className="bg-[#0B0E14] text-white pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-6">
              SS ENGINEERS & CONSULTANTS
            </h2>

            <p className="text-gray-300 max-w-lg leading-relaxed text-lg">
              Delivering advanced engineering, project consultancy, and complete MEP & industrial solutions with precision and excellence. We transform ideas into reliable, efficient, and sustainable systems.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((s, i) => (
                <Link
                  key={s.name + i}
                  href={s.href}
                  aria-label={s.name}
                  className={`w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center transition-all duration-300 shadow-md ${s.colorClass}`}
                >
                  {/* svg is provided in the data to ensure path elements are always inside an svg */}
                  {s.svg}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3">Services</h3>
            <ul className="space-y-4 text-gray-300">
              {services.map((s, i) => (
                <li key={s + i}>
                  <Link href="/services" className="hover:text-blue-400 transition-colors duration-300 flex items-center group">
                    <svg className="w-4 h-4 mr-3 text-blue-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-l-4 border-blue-500 pl-3">Contact</h3>
            <div className="space-y-6 text-gray-300">
              <p>
                <strong>Office:</strong> D 21 Chattarpur Hills, New Delhi 110074
              </p>
              <p>
                <strong>Phone:</strong> +91 9876543210
              </p>
              <p>
                <strong>Email:</strong> anil@ssengineers.in
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© {new Date().getFullYear()} SS Engineers & Consultants. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-400">Terms</Link>
            <Link href="/sitemap" className="hover:text-blue-400">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-600 opacity-10 rounded-full blur-3xl"></div>
    </footer>
  );
}
