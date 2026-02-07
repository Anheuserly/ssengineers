import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/clients", label: "Clients" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <div className="brand-mark">SS</div>
          <div>
            <p className="brand-name">S.S. Engineers & Consultants</p>
            <p className="brand-sub">Fire Protection & MEP Specialists</p>
          </div>
        </div>
        <nav className="nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="cta" href="/contact">
          Request a Survey
        </Link>
      </div>
    </header>
  );
}
