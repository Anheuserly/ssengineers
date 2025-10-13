import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                SHREE GANESHE ENTERPRISES
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed text-lg">
              Your trusted partner for comprehensive MEP solutions, fire safety systems, and maintenance services across Delhi NCR. 
              We deliver quality, reliability, and excellence in every project.
            </p>
            <div className="flex space-x-4">
              {[
                { 
                  name: "Facebook", 
                  icon: <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />,
                  color: "hover:bg-blue-600"
                },
                { 
                  name: "Twitter", 
                  icon: <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />,
                  color: "hover:bg-blue-400"
                },
                { 
                  name: "Instagram", 
                  icon: <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" clipRule="evenodd" />,
                  color: "hover:bg-gradient-to-r from-purple-600 to-pink-600"
                },
                { 
                  name: "LinkedIn", 
                  icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />,
                  color: "hover:bg-blue-500"
                }
              ].map((social, index) => (
                <Link
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-white transition-all duration-300 ${social.color} shadow-md`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {social.icon}
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white border-l-4 border-red-600 pl-3">Our Services</h3>
            <ul className="space-y-4">
              {[
                "Fire Fighting Systems",
                "Detection Systems", 
                "Electrical Work",
                "Plumbing Solutions",
                "AMC Services",
                "Security Systems"
              ].map((service, index) => (
                <li key={index}>
                  <Link href="/services" className="text-gray-300 hover:text-red-400 transition-colors duration-300 flex items-center group">
                    <svg className="w-4 h-4 mr-3 text-red-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white border-l-4 border-red-600 pl-3">Contact Us</h3>
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
                  </svg>
                </div>
                <p className="text-gray-300">Office: H. No,. 535 S/F, Left Side, D21, Chattarpur Hills, New Delhi, Delhi 110074</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-gray-300">+91 8527378555</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 01-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-gray-300">anilkumarsaini0507@gmail.com , info@sge.org.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left text-gray-400 mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} SHREE GANESHE ENTERPRISES. All rights reserved.</p>
            <p className="text-sm mt-2">Providing excellence in MEP solutions since 2010</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-red-400 transition-colors duration-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-600 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-0 w-48 h-48 bg-blue-600 opacity-10 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
}