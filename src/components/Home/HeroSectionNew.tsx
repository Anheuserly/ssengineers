"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import HeroBG from "../../static/home_hero_bg.png"; 

export default function HeroSectionNew() {
  const [offset, setOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const onScroll = () => setOffset(window.scrollY * 0.22);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* PARALLAX BACKGROUND - Only background image remains */}
      <div className="absolute inset-0">
        <Image
          src={HeroBG}
          alt="Engineering Background"
          fill
          priority
          quality={90}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            transform: isMounted ? `translateY(${offset}px)` : "translateY(0px)",
            transition: "transform 0.15s ease-out",
          }}
          className="select-none"
          placeholder="empty"
        />
      </div>
    </section>
  );
}