"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

// UPDATE THIS WITH YOUR NEW LOGO FILE
import Logo from "../static/ss_engineers_logo.jpg";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg py-3"
            : "bg-transparent py-6"
        }`}
    >
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* LEFT — LOGO + NAME */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src={Logo}
            alt="SS Engineers & Consultants Logo"
            width={50}
            height={50}
            className="object-contain drop-shadow-md"
            priority
          />

          <span
            className={`text-2xl font-bold tracking-wide uppercase
            ${
              isScrolled
                ? "text-gray-900"
                : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
            } hidden sm:block`}
          >
            SS Engineers & Consultants
          </span>
        </Link>

        {/* RIGHT — NAVIGATION LINKS */}
        <div className="hidden md:flex items-center space-x-10">
          {[
            { label: "Home", path: "/" },
            { label: "Projects", path: "/projects" },
            { label: "Services", path: "/services" },
            { label: "About Us", path: "/about" },
            { label: "Careers", path: "/career" },
            { label: "Journal", path: "/journal" },
            { label: "Contact", path: "/contact" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`text-base font-medium transition-all duration-300 relative group
                ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : isScrolled
                    ? "text-gray-700"
                    : "text-white"
                }
              `}
            >
              {item.label}

              {/* Underline hover animation */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full ${
                  isActive(item.path) ? "w-full" : ""
                }`}
              ></span>
            </Link>
          ))}

          {/* RIGHT CIRCLE SWITCHER */}
          <a
            href="https://sge.org.in"
            target="_blank"
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 
              flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
          >
            <span className="text-white font-semibold text-sm">SGE</span>
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? "text-gray-700" : "text-white"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="h-8 w-8" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl py-6 px-6 space-y-4 animate-in slide-in-from-top duration-300">
          {[
            { label: "Home", path: "/" },
            { label: "Projects", path: "/projects" },
            { label: "Services", path: "/services" },
            { label: "About Us", path: "/about" },
            { label: "Careers", path: "/career" },
            { label: "Journal", path: "/journal" },
            { label: "Contact", path: "/contact" },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl text-gray-700 py-3 font-medium hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}

          {/* Circle Switcher for Mobile */}
          <a
            href="https://sge.org.in"
            target="_blank"
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 
              flex items-center justify-center mx-auto shadow-xl mt-4 hover:scale-110 transition-all"
          >
            <span className="text-white text-base font-semibold">SGE</span>
          </a>
        </div>
      )}
    </nav>
  );
}
