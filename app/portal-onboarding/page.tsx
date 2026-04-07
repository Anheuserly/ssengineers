import { redirect } from "next/navigation";
import SectionHeading from "@/components/SectionHeading";
import PortalOnboardingForm from "@/components/PortalOnboardingForm";
import { getPortalSession, getPortalLoginPath } from "@/lib/server/portal-auth";

export default async function PortalOnboardingPage() {
  const session = await getPortalSession();
  if (!session) {
    redirect(getPortalLoginPath("vendor"));
  }
  if (session.role !== "vendor" && session.role !== "customer") {
    redirect("/");
  }

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Account Setup"
            title="Complete Your Profile"
            subtitle="Quick second step: add business contact details to continue to your dashboard."
          />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <article className="panel">
            <h3>Why This Step</h3>
            <ul className="checklist">
              <li>Keeps vendor/customer account data verified and structured.</li>
              <li>Helps our team respond faster with the right project context.</li>
              <li>Takes less than a minute and can be updated anytime.</li>
            </ul>
          </article>
          <aside className="form-panel">
            <h3>Profile Information</h3>
            <p className="muted">
              Name, phone, and password are your first-step registration details.
              Add the remaining details here.
            </p>
            <PortalOnboardingForm />
          </aside>
        </div>
      </section>
    </main>
  );
}
