import Link from "next/link";
import { redirect } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import {
  getPortalLoginPath,
  getPortalSession,
  getPortalRoleLabel,
} from "@/lib/server/portal-auth";

const adminActions = [
  {
    title: "Vendor Pipeline",
    detail: "Review incoming vendor registrations and pre-qualification details.",
    href: "/vendor-registration",
  },
  {
    title: "Lead & Feedback Review",
    detail: "Track contacts, chat leads, and direct feedback submissions.",
    href: "/contact",
  },
  {
    title: "Document Control",
    detail: "Manage compliance and download-center file readiness.",
    href: "/download-center",
  },
];

export default async function AdminPortalPage() {
  const session = await getPortalSession();
  if (!session || session.role !== "admin") {
    redirect(getPortalLoginPath("admin"));
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Private Console"
            title={`${getPortalRoleLabel(session.role)} Dashboard`}
            subtitle={`Signed in as: ${session.identifier}`}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portal-quick-grid">
            {adminActions.map((item) => (
              <article key={item.title} className="portal-quick-card">
                <h3>{item.title}</h3>
                <p className="muted">{item.detail}</p>
                <Link className="button ghost small" href={item.href}>
                  Open
                </Link>
              </article>
            ))}
          </div>

          <form className="portal-logout" action="/api/auth/logout?redirect=/admin-login" method="post">
            <button className="button small" type="submit">
              Logout
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
