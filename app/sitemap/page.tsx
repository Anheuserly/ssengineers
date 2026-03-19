import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

const mainPages = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/clients", label: "Clients" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
  { href: "/career", label: "Career" },
];

const projectStatusPages = [
  { href: "/working-activity", label: "Working Activity" },
  { href: "/work-in-progress", label: "Work In Progress" },
  { href: "/work-done", label: "Work Done" },
  { href: "/compliance-documents", label: "Compliance Documents" },
  { href: "/download-center", label: "Download Center" },
];

const legalPages = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/hse-policy", label: "Health & Safety (HSE) Policy" },
  { href: "/quality-policy", label: "Quality Policy" },
  { href: "/vendor-registration", label: "Vendor Registration" },
];

export default function SitemapPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Navigation"
            title="Sitemap"
            subtitle="Quick route map for all key pages on the S.S. Engineers website."
          />
        </div>
      </section>

      <section className="section">
        <div className="container grid-3">
          <article className="panel">
            <h3>Main Pages</h3>
            <ul>
              {mainPages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h3>Execution & Documents</h3>
            <ul>
              {projectStatusPages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </article>

          <article className="panel">
            <h3>Legal & Business</h3>
            <ul>
              {legalPages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
