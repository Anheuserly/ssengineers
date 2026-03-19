import Link from "next/link";
import type { CSSProperties } from "react";

type StatusQuickNavProps = {
  active:
    | "/compliance-documents"
    | "/working-activity"
    | "/work-in-progress"
    | "/work-done";
};

export default function StatusQuickNav({ active }: StatusQuickNavProps) {
  const navItems = [
    {
      href: "/compliance-documents" as const,
      label: "Compliance Documents",
      icon: "docs" as const,
    },
    {
      href: "/working-activity" as const,
      label: "Working Activity",
      icon: "activity" as const,
    },
    {
      href: "/work-in-progress" as const,
      label: "Work In Progress",
      icon: "progress" as const,
    },
    {
      href: "/work-done" as const,
      label: "Work Done",
      icon: "done" as const,
    },
  ];
  const activeIndex = navItems.findIndex((item) => item.href === active);
  const dockStyle = {
    ["--active-index" as string]: String(Math.max(activeIndex, 0)),
  } as CSSProperties;

  return (
    <nav className="status-nav-sticky status-corner-nav" aria-label="Quick navigation">
      <div className="status-dock" style={dockStyle}>
        <span className="status-dock-slider" aria-hidden>
          <svg viewBox="0 0 24 24">
            <line x1="4" y1="7" x2="20" y2="7" />
            <circle cx="9" cy="7" r="2" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <circle cx="15" cy="12" r="2" />
            <line x1="4" y1="17" x2="20" y2="17" />
            <circle cx="11" cy="17" r="2" />
          </svg>
        </span>
        {navItems.map((item) => {
          const isActive = item.href === active;
          return (
            <Link
              key={item.href}
              className={`status-dock-link ${isActive ? "active" : ""}`}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={item.label}
              aria-label={item.label}
            >
              <span className="status-dock-tooltip">{item.label}</span>
              {item.icon === "docs" ? (
                <svg viewBox="0 0 24 24">
                  <path d="M7 3h7l5 5v13H7z" />
                  <path d="M14 3v6h5" />
                  <path d="M10 13h6" />
                  <path d="M10 17h6" />
                </svg>
              ) : null}
              {item.icon === "activity" ? (
                <svg viewBox="0 0 24 24">
                  <path d="M12 7v6l4 2" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              ) : null}
              {item.icon === "progress" ? (
                <svg viewBox="0 0 24 24">
                  <path d="m4 17 5-5 4 3 7-8" />
                  <path d="M5 5h14" />
                </svg>
              ) : null}
              {item.icon === "done" ? (
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.5 12.5 2.2 2.2 4.8-5.2" />
                </svg>
              ) : null}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
