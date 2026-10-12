"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ExternalLink, Search, X } from "lucide-react";

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export interface VideoItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  highlight?: boolean;
}

const FIRE_ACADEMY_VIDEOS: VideoItem[] = [
  {
    id: "yd0272DReYY",
    title: "NBC क्या है? Building Design में इसका इतना महत्व क्यों है? 🏗️ | National Building Code India",
    category: "NBC & Standards",
    duration: "12:45",
    description: "National Building Code (NBC 2016 Part 4) life safety mandates, staircase pressurization, travel distance limits, and municipal fire approval norms.",
    highlight: true,
  },
  {
    id: "l9PkdLTB_cM",
    title: "Data Center में Fire Fighting कैसे होती है? | Gas Suppression vs Water Sprinkler",
    category: "Gas Suppression",
    duration: "10:15",
    description: "Comprehensive technical review of clean agent gas suppression (FM-200, Novec 1230, Inergen) engineered to protect high-density server infrastructure.",
    highlight: true,
  },
  {
    id: "CG_donrmnPs",
    title: "Adani & Ambani के Data Center में आग कैसे बुझती है? | FM200 & Novec 1230 System",
    category: "Gas Suppression",
    duration: "14:20",
    description: "Mission-critical clean agent discharge sequences, 10-second rapid flooding, pre-action sprinkler interlocking, and abort station operations.",
    highlight: true,
  },
  {
    id: "bxmszxC5O_8",
    title: "हर Fire Extinguisher एक जैसा नहीं होता! जानें सही सिलेंडर चुनना क्यों जरूरी है #firesafety",
    category: "Extinguishers & Drills",
    duration: "08:35",
    description: "Fire classifications (Class A to F) and practical operation of ABC Dry Powder, Mechanical Foam, Water CO2, and Clean Agent cylinders under IS 2190.",
  },
  {
    id: "C2uSq04daRg",
    title: "फायर फाइटिंग में ये 2 CODE आपको जरूर पता होने चाहिए! 🚒🔥 | Fire Safety Standards",
    category: "NBC & Standards",
    duration: "09:50",
    description: "Essential Indian Standard (IS) codes and NFPA alignments vital for high-rise commercial complexes, hospitals, and manufacturing campuses.",
  },
  {
    id: "BrKfMda2T5Y",
    title: "CO2 Gas Fire Fighting System 🔥 | CO2 Gas कैसे काम करती है? | Anil Saini Fire Academy",
    category: "Gas Suppression",
    duration: "11:05",
    description: "High pressure CO2 total flooding and local application systems engineered for electrical transformer yards, HT/LT panels, and DG rooms.",
  },
  {
    id: "Wp8UkZe-pU8",
    title: "Fire Pump House Operations | Main Hydrant, Jockey & Diesel Engine Auto-Start",
    category: "Pump House & Hydrant",
    duration: "15:30",
    description: "Live pump room testing: pressure switch sequencing, jockey pump priming, main electric hydrant, and emergency diesel engine starter setup.",
  },
  {
    id: "gpN9d6QFBoA",
    title: "Addressable Fire Alarm System Wiring & Loop Card Configuration",
    category: "Fire Alarm & ELV",
    duration: "16:20",
    description: "Class A loop wiring, addressable optical smoke detector base addressing, and control relay module integrations with AHUs and passenger lifts.",
  },
  {
    id: "feRo5RKzWKw",
    title: "ज़िंदगी अनमोल है, इसे बेहतर बनाने पर आज ही विचार करें | Fire Safety Awareness",
    category: "Life Safety & Drills",
    duration: "07:15",
    description: "Empowering facility teams, factory workers, and tenants with essential fire exit drills, clear signage awareness, and emergency preparedness.",
  },
  {
    id: "-tSyd2PPYrI",
    title: "Freelancers, Clients और Manufacturers को सिंक्रोनाइज़ करने का तरीका | MEP Project Execution",
    category: "MEP Coordination",
    duration: "13:40",
    description: "Real-world site coordination tips for synchronizing MEP design consultants, equipment suppliers, site supervisors, and quality audits.",
  },
];

const CATEGORIES = [
  "All Videos",
  "NBC & Standards",
  "Gas Suppression",
  "Pump House & Hydrant",
  "Extinguishers & Drills",
  "Fire Alarm & ELV",
  "MEP Coordination",
];

export default function ActivityVideoGallery() {
  const [activeCategory, setActiveCategory] = useState("All Videos");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const filteredVideos = FIRE_ACADEMY_VIDEOS.filter((v) => {
    const matchesCategory =
      activeCategory === "All Videos" || v.category === activeCategory;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="activity-video-gallery-wrapper" style={{ margin: "2rem 0" }}>
      {/* Channel Header Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #091322 0%, #152238 100%)",
          borderRadius: "16px",
          padding: "2rem 1.75rem",
          color: "white",
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 24px rgba(9, 19, 34, 0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", minWidth: "260px" }}>
          <div
            style={{
              position: "relative",
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #dc2626",
              flexShrink: 0,
              backgroundColor: "#fff",
            }}
          >
            <Image
              src="/shreeganeshlogo.jpeg"
              alt="Anil Saini Fire Academy"
              fill
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, color: "white" }}>
                Anil Saini Fire Academy
              </h2>
              <span
                style={{
                  backgroundColor: "rgba(220, 38, 38, 0.2)",
                  color: "#f87171",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  padding: "0.15rem 0.55rem",
                  borderRadius: "20px",
                  border: "1px solid rgba(220, 38, 38, 0.4)",
                }}
              >
                Official Masterclass Hub
              </span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: "0.25rem 0 0" }}>
              Practical MEP, Fire NOC Compliance, NBC 2016 Standards & Real On-Site Drills
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="https://www.youtube.com/@AnilSainiFireAcademy?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#dc2626",
              color: "white",
              fontWeight: 700,
              padding: "0.65rem 1.25rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "0.9rem",
              boxShadow: "0 4px 12px rgba(220, 38, 38, 0.35)",
            }}
          >
            <YouTubeIcon size={18} />
            Subscribe Channel
          </a>
          <a
            href="https://www.youtube.com/@AnilSainiFireAcademy/videos"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              color: "white",
              fontWeight: 600,
              padding: "0.65rem 1.15rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "0.9rem",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            Open in YouTube <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        {/* Category Pills */}
        <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", alignItems: "center" }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.4rem 0.85rem",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isActive ? "1px solid #0052cc" : "1px solid #e2e8f0",
                  backgroundColor: isActive ? "#0052cc" : "white",
                  color: isActive ? "white" : "#475569",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div style={{ position: "relative", minWidth: "240px", maxWidth: "320px", width: "100%" }}>
          <input
            type="text"
            placeholder="Search engineering videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "0.5rem 1rem 0.5rem 2.2rem",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              fontSize: "0.88rem",
              outline: "none",
              backgroundColor: "white",
            }}
          />
          <Search
            size={15}
            color="#94a3b8"
            style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)" }}
          />
        </div>
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3.5rem 2rem",
            backgroundColor: "#f8fafc",
            borderRadius: "12px",
            border: "1px dashed #cbd5e1",
          }}
        >
          <p style={{ color: "#64748b", fontSize: "1rem", margin: 0 }}>
            No engineering videos matched your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All Videos");
              setSearchQuery("");
            }}
            style={{
              marginTop: "0.5rem",
              color: "#0052cc",
              background: "none",
              border: "none",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {/* Thumbnail Container */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  backgroundColor: "#000",
                  cursor: "pointer",
                }}
                onClick={() => setActiveVideo(video)}
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                {/* Play Button Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(220, 38, 38, 0.95)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    <Play size={20} fill="currentColor" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    color: "white",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "0.15rem 0.45rem",
                    borderRadius: "4px",
                  }}
                >
                  {video.duration}
                </span>

                {/* Category Pill */}
                <span
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    backgroundColor: "rgba(9, 19, 34, 0.85)",
                    color: "white",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.55rem",
                    borderRadius: "4px",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {video.category}
                </span>
              </div>

              {/* Video Info */}
              <div style={{ padding: "1.15rem", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    margin: "0 0 0.4rem",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveVideo(video)}
                >
                  {video.title}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    margin: "0 0 0.85rem",
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {video.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.65rem",
                    borderTop: "1px solid #f1f5f9",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#0052cc",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Watch Video →
                  </button>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.78rem",
                      textDecoration: "none",
                    }}
                  >
                    YouTube ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Video Modal */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
          }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            style={{
              backgroundColor: "#0f172a",
              borderRadius: "14px",
              width: "100%",
              maxWidth: "840px",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              color: "white",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "0.85rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #1e293b",
              }}
            >
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f87171" }}>
                📺 {activeVideo.category}
              </span>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#cbd5e1",
                  cursor: "pointer",
                  padding: "0.2rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Player */}
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>

            {/* Modal Body */}
            <div style={{ padding: "1.25rem" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "0 0 0.4rem", color: "white" }}>
                {activeVideo.title}
              </h3>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: "0 0 1rem", lineHeight: 1.5 }}>
                {activeVideo.description}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    backgroundColor: "#dc2626",
                    color: "white",
                    fontWeight: 700,
                    padding: "0.55rem 1.1rem",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "0.82rem",
                  }}
                >
                  <YouTubeIcon size={16} />
                  Watch on YouTube
                </a>
                <a
                  href="/contact"
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.82rem",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Schedule Site Inspection with S.S. Engineers →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
