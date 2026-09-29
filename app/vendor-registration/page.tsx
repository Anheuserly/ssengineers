import { ArrowUpRight, Smartphone } from "lucide-react";
import { company } from "@/lib/content";

export const metadata = {
  title: "One App Registration | S.S. Engineers & Consultants",
  description: "Business registration is managed through AMC MEP 24x7 One App.",
};

export default function VendorRegistrationPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container one-app-handoff">
          <div className="one-app-handoff-icon"><Smartphone aria-hidden="true" size={28} /></div>
          <p className="eyebrow">Business registration</p>
          <h1>Register through AMC MEP 24x7 One App</h1>
          <p className="lead">Vendor, customer and business registration are managed in the One App platform, where your account and requested services stay together.</p>
          <a className="button" href={company.appLinks.login} target="_blank" rel="noreferrer">Open One App <ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>
      </section>
    </main>
  );
}
