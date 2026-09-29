import { ArrowUpRight, Smartphone } from "lucide-react";
import { company } from "@/lib/content";

export const metadata = {
  title: "One App Access | S.S. Engineers & Consultants",
  description: "Sign in and account registration are managed through AMC MEP 24x7 One App.",
};

export default function PortalLoginPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container one-app-handoff">
          <div className="one-app-handoff-icon"><Smartphone aria-hidden="true" size={28} /></div>
          <p className="eyebrow">Account access</p>
          <h1>Use AMC MEP 24x7 One App</h1>
          <p className="lead">Sign-in, registration and account management are handled securely through the shared One App platform.</p>
          <a className="button" href={company.appLinks.login} target="_blank" rel="noreferrer">Open One App login <ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>
      </section>
    </main>
  );
}
