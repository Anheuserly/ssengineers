import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PortalLoginForm from "@/components/PortalLoginForm";

const portalHighlights = [
  "Dedicated access for vendor and customer users",
  "Vendor and customer users can create their own accounts",
  "Separate role-based sessions for better control",
  "Admin login handled through hidden private route",
];

type PortalLoginPageProps = {
  searchParams?: {
    mode?: string | string[];
  };
};

export default function PortalLoginPage({ searchParams }: PortalLoginPageProps) {
  const requestedModeValue = Array.isArray(searchParams?.mode)
    ? searchParams?.mode[0]
    : searchParams?.mode;
  const requestedMode =
    String(requestedModeValue || "").toLowerCase() === "register"
      ? "register"
      : "login";

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Secure Access"
            title="Vendor & Customer Login"
            subtitle="Login with your registered phone or create a new portal account in seconds."
          />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <article className="panel">
            <h3>Portal Access Notes</h3>
            <ul className="checklist">
              {portalHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted">
              Need new credentials? Contact{" "}
              <a href="mailto:anil@ssengineers.in">anil@ssengineers.in</a>.
            </p>
            <p className="muted">
              First-time vendors can submit onboarding details here:{" "}
              <Link href="/vendor-registration">Vendor Registration</Link>.
            </p>
          </article>

          <aside className="form-panel">
            <PortalLoginForm
              allowedRoles={["vendor", "customer"]}
              defaultRole="vendor"
              title="Portal Login"
              subtitle="Select your role. You can login or create a new account."
              allowRegistration
              initialMode={requestedMode}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
