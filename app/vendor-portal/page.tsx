import Link from "next/link";
import { redirect } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import { getAppwriteConfig, listAppwriteDocuments } from "@/functions/appwrite";
import {
  getPortalLoginPath,
  getPortalSession,
  getPortalRoleLabel,
} from "@/lib/server/portal-auth";

const vendorActions = [
  {
    title: "Vendor Registration",
    detail: "Submit or update company profile, capability scope, and compliance details.",
    href: "/vendor-registration",
  },
  {
    title: "Download Center",
    detail: "Access shared company profile and statutory documents.",
    href: "/download-center",
  },
  {
    title: "Compliance Documents",
    detail: "Review ESI, PF, GST, and MSME files in one place.",
    href: "/compliance-documents",
  },
];

export default async function VendorPortalPage() {
  const session = await getPortalSession();
  if (!session || session.role !== "vendor") {
    redirect(getPortalLoginPath("vendor"));
  }

  const {
    collections: { portalAuthUsers },
  } = getAppwriteConfig();
  const records = await listAppwriteDocuments(portalAuthUsers, {
    requireApiKey: true,
    limit: 200,
  });
  const docs = (records.documents || []) as Array<Record<string, unknown>>;
  const current = docs.find((item) => {
    const role = String(item.role || "").trim().toLowerCase();
    const identifier = String(item.identifier || "").trim().toLowerCase();
    return role === session.role && identifier === session.identifier;
  });
  const profileCompleted = Boolean(current?.profileCompleted === true);
  if (!profileCompleted) {
    redirect("/portal-onboarding");
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Portal"
            title={`${getPortalRoleLabel(session.role)} Dashboard`}
            subtitle={`Signed in as: ${session.identifier}`}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portal-quick-grid">
            {vendorActions.map((item) => (
              <article key={item.title} className="portal-quick-card">
                <h3>{item.title}</h3>
                <p className="muted">{item.detail}</p>
                <Link className="button ghost small" href={item.href}>
                  Open
                </Link>
              </article>
            ))}
          </div>

          <form className="portal-logout" action="/api/auth/logout?redirect=/portal-login" method="post">
            <button className="button small" type="submit">
              Logout
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
