"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { PartnerLogo } from "@/lib/content";

type LogoWallProps = {
  items: PartnerLogo[];
  limit?: number;
  dense?: boolean;
};

export default function LogoWall({ items, limit, dense = false }: LogoWallProps) {
  const [failedLogos, setFailedLogos] = useState<Record<string, boolean>>({});

  const visibleItems = useMemo(
    () => {
      const source = typeof limit === "number" ? items.slice(0, limit) : items;
      const seen = new Set<string>();

      return source.filter((item) => {
        const key = item.name.trim().toLowerCase();
        if (!key || seen.has(key)) {
          return false;
        }

        seen.add(key);
        return Boolean(item.logo) && Boolean(item.website) && !failedLogos[item.name];
      });
    },
    [items, limit, failedLogos]
  );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className={`logo-wall ${dense ? "dense" : ""}`}>
      {visibleItems.map((item) => {
        const logoNode = (
          <span className="logo-mark-inner" aria-hidden="true">
            <Image
              src={item.logo}
              alt={`${item.name} logo`}
              width={280}
              height={96}
              sizes="(max-width: 600px) 42vw, 180px"
              referrerPolicy="no-referrer"
              onError={() =>
                setFailedLogos((prev) => ({ ...prev, [item.name]: true }))
              }
            />
          </span>
        );

        return (
          <article key={item.name} className="logo-item">
            {item.website ? (
              <a
                className="logo-mark"
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
              >
                {logoNode}
              </a>
            ) : (
              <div className="logo-mark" aria-label={item.name}>
                {logoNode}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
