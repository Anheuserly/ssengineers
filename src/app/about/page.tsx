// src/app/about/page.jsx


import React from "react";
import Link from "next/link";
import AboutHero from "../../components/About/AboutHero";

export const metadata = {
  title: "About Us - SS Engineers & Consultants",
  description:
    "SS Engineers & Consultants is an MEP, Fire Safety and Industrial Engineering firm delivering turnkey design, installation and AMC services across Delhi NCR and North India.",
  alternates: { canonical: "https://www.ssengineers.in/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero section */}
      <AboutHero />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        {/* INTRO */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4">
            About SS Engineers & Consultants
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-slate-700 leading-relaxed">
            SS Engineers & Consultants delivers MEP, fire safety, HVAC, electrical
            and industrial infrastructure engineering with a focus on safety,
            precision and compliance.
          </p>
        </section>

        {/* MISSION & VISION */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-red-600" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-slate-700 leading-relaxed">
              To deliver dependable engineering that protects lives and assets — using
              smart design, compliant execution and long-term reliable systems.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-blue-600" viewBox="0 0 24 24" fill="none">
                <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-slate-700 leading-relaxed">
              To become India’s most trusted MEP & Fire Engineering partner built on technical depth
              and consistent delivery excellence.
            </p>
          </div>

        </section>

        {/* VALUES */}
        <section className="bg-white p-10 rounded-xl shadow-sm border border-slate-100 mb-16">

          <h3 className="text-2xl font-bold text-center mb-8">Our Core Values</h3>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto bg-green-50 rounded-full flex justify-center items-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold">Safety First</h4>
              <p className="text-slate-600 mt-2">
                Every solution is designed with safety, compliance and long-term protection in mind.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto bg-yellow-50 rounded-full flex justify-center items-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24">
                  <path d="M5 12l4 4L19 7" stroke="currentColor" strokeWidth="1.7"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold">Reliability</h4>
              <p className="text-slate-600 mt-2">
                Systems that perform during critical situations — built with quality and precision.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto bg-indigo-50 rounded-full flex justify-center items-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.7"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold">Expertise</h4>
              <p className="text-slate-600 mt-2">
                Experienced engineers backed by continuous training and field knowledge.
              </p>
            </div>

          </div>
        </section>

        {/* JOURNEY + LEADERSHIP */}
        <section className="grid lg:grid-cols-2 gap-10 mb-16">

          {/* Journey */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100">
            <h3 className="text-2xl font-semibold mb-4">Our Journey</h3>

            <ul className="space-y-3 text-slate-700">
  <li><strong>1996</strong> — Built on early site services, SS Engineers expanded service teams and completed multiple municipal firefighting installations in Delhi NCR.</li>
  <li><strong>1997</strong> — Secured first large commercial contracts for hydrant and hose reel systems; strengthened supplier relationships for pumps and valves.</li>
  <li><strong>1998</strong> — Grew electrical capabilities: low-voltage fire alarm wiring, emergency lighting, and basic LT panel works for industrial clients.</li>
  <li><strong>1999</strong> — Implemented formal QA processes and introduced vendor-approved material traceability for safety-critical equipment.</li>
  <li><strong>2000</strong> — Began structured MEP service integration — coordinated fire, electrical and plumbing jobs on mid-size commercial projects.</li>
  <li><strong>2001</strong> — Launched in-house design drafting for shop drawings and as-built documentation to increase delivery speed and clarity.</li>
  <li><strong>2002</strong> — Expanded field teams and added preventive maintenance packages for existing clients, reducing system downtime.</li>
  <li><strong>2003</strong> — Adopted improved site safety protocols and formalized project handover checklists to ensure compliance at completion.</li>
  <li><strong>2004</strong> — Introduced 24/7 AMC (Annual Maintenance Contract) services and emergency response capability across key accounts in NCR.</li>
  <li><strong>2005</strong> — Formal registration and restructuring as SS Engineers; created distinct divisions for projects, service & procurement.</li>
  <li><strong>2006</strong> — Strengthened project management practices, added ERP-lite tools for inventory and billing, and standardized documentation.</li>
  <li><strong>2007</strong> — Delivered first turnkey retrofit projects, upgrading legacy fire systems to address contemporary codes and reliability demands.</li>
  <li><strong>2008</strong> — Expanded geographically to adjacent states, winning industrial plant contracts requiring robust MEP coordination.</li>
  <li><strong>2009</strong> — Invested in staff training programs and vendor-certified workshops for pumps, suppression agents and addressable fire panels.</li>
  <li><strong>2010</strong> — Adopted CAD-based engineering standards across projects; improved hydraulic calculation practices and electrical load workflows.</li>
  <li><strong>2011</strong> — Launched an in-house commissioning team to perform pressure, continuity and functional performance tests for all major installs.</li>
  <li><strong>2012</strong> — Strengthened compliance services — began offering statutory compliance audits, drawing on expanded documentation capability.</li>
  <li><strong>2013</strong> — Introduced packaged solutions for small commercial buildings: combined detection, suppression and monitoring offered as unified delivery.</li>
  <li><strong>2014</strong> — Expanded AMC portfolios and implemented preventive-maintenance analytics to extend equipment life and reduce failures.</li>
  <li><strong>2015</strong> — Entered turnkey MEP & Fire EPC execution; executed multi-discipline projects with integrated QA/QC and single-point accountability.</li>
  <li><strong>2016</strong> — Formalized procurement & vendor QA to ensure certified components and faster lead-times for large-scale projects.</li>
  <li><strong>2017</strong> — Set up regional service hubs for faster response and scaled AMC operations to cover high-value enterprise clients.</li>
  <li><strong>2018</strong> — Began offering specialized industrial services: hydrant network design, foam systems and high-hazard suppression solutions.</li>
  <li><strong>2019</strong> — Formed dedicated BIM coordination, electrical load analysis and commissioning audit departments to improve design-build integration.</li>
  <li><strong>2020</strong> — Strengthened remote monitoring and support capabilities; implemented basic remote diagnostics for AMC clients amid changing site access realities.</li>
  <li><strong>2021</strong> — Invested in digital record-keeping and asset tagging for AMC portfolios; improved SLA tracking and maintenance transparency.</li>
  <li><strong>2022</strong> — Rolled out energy-efficiency and retrofit offerings: optimizing HVAC and electrical systems to lower operating costs for clients.</li>
  <li><strong>2023</strong> — Rebranded as SS Engineers & Consultants and expanded consultancy services — design, supervision, compliance and execution under one umbrella.</li>
  <li><strong>2024</strong> — Scaled consulting practice: added CFD-based airflow studies, detailed hydraulic modelling and advanced electrical fault analysis for complex facilities.</li>
  <li><strong>2025</strong> — Entered the era of digital engineering with automated AMC management, cloud monitoring, CFD-driven fire modelling and integrated energy-efficient MEP solutions.</li>
</ul>

          </div>

          {/* Leadership */}
          <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-100">
            <h3 className="text-2xl font-semibold mb-6">Leadership & Key Team</h3>

            <div className="grid gap-6">
              {/* Managing Director */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/poonam-saini.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Mrs. Poonam Saini"
                />
                <div>
                  <h4 className="font-semibold">Mrs. Poonam Saini</h4>
                  <p className="text-sm text-slate-600">Managing Director</p>
                </div>
              </div>

              {/* Country Head */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/ak-saini.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="A.K. Saini"
                />
                <div>
                  <h4 className="font-semibold">A.K. Saini</h4>
                  <p className="text-sm text-slate-600">Country Head</p>
                </div>
              </div>

              {/* Operation Manager */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/chetnaa-choudhary.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Chetnaa J Choudhary"
                />
                <div>
                  <h4 className="font-semibold">Chetnaa J. Choudhary</h4>
                  <p className="text-sm text-slate-600">Operations Manager</p>
                </div>
              </div>

              {/* Account Head */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/mukesh-kumar.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Mukesh Kumar"
                />
                <div>
                  <h4 className="font-semibold">Mukesh Kumar</h4>
                  <p className="text-sm text-slate-600">Account Head</p>
                </div>
              </div>

              {/* CA */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/rajeev-shukla.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Rajeev Shukla"
                />
                <div>
                  <h4 className="font-semibold">Rajeev Shukla</h4>
                  <p className="text-sm text-slate-600">Chartered Accountant (CA)</p>
                </div>
              </div>

              {/* Project Head */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/vaseem-khan.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Vaseem Khan"
                />
                <div>
                  <h4 className="font-semibold">Vaseem Khan</h4>
                  <p className="text-sm text-slate-600">Project Head</p>
                </div>
              </div>

              {/* Architect */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/shashank-saini.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Shashank Saini"
                />
                <div>
                  <h4 className="font-semibold">Shashank Saini</h4>
                  <p className="text-sm text-slate-600">Architect</p>
                </div>
              </div>

              {/* Accountant */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/mahendru.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Mahendru"
                />
                <div>
                  <h4 className="font-semibold">Mahendru</h4>
                  <p className="text-sm text-slate-600">Accountant</p>
                </div>
              </div>

              {/* Site Supervisor */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/asgar-ansari.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Asgar Ansari"
                />
                <div>
                  <h4 className="font-semibold">Asgar Ansari</h4>
                  <p className="text-sm text-slate-600">Site Supervisor</p>
                </div>
              </div>

              {/* Site Engineer */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/amjad-hussain.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Amjad Hussain"
                />
                <div>
                  <h4 className="font-semibold">Amjad Hussain</h4>
                  <p className="text-sm text-slate-600">Site Engineer</p>
                </div>
              </div>

              {/* Engineering Prem (Prem Sharma) */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/prem-sharma.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Prem Sharma"
                />
                <div>
                  <h4 className="font-semibold">Prem Sharma</h4>
                  <p className="text-sm text-slate-600">Engineer</p>
                </div>
              </div>

              {/* MEP (Himanshu Choudhary) */}
              <div className="flex items-start gap-4">
                <img
                  src="/avatars/himanshu-choudhary.jpg"
                  className="w-16 h-16 rounded-full object-cover shadow"
                  alt="Himanshu Choudhary"
                />
                <div>
                  <h4 className="font-semibold">Himanshu Choudhary</h4>
                  <p className="text-sm text-slate-600">MEP Engineer</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-8 rounded-xl text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">

              <div>
                <div className="text-4xl font-bold">500+</div>
                <p className="text-blue-200">Projects</p>
              </div>

              <div>
                <div className="text-4xl font-bold">15+</div>
                <p className="text-blue-200">Years Experience</p>
              </div>

              <div>
                <div className="text-4xl font-bold">98%</div>
                <p className="text-blue-200">Client Satisfaction</p>
              </div>

              <div>
                <div className="text-4xl font-bold">24/7</div>
                <p className="text-blue-200">Support</p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold">Ready to improve safety & uptime?</h3>
              <p className="text-slate-700 leading-relaxed">
                Book a consultation with our engineering team and get expert guidance.
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="/contact" className="px-6 py-3 rounded-md bg-blue-600 text-white font-medium shadow">
                Contact Us
              </Link>

              <Link href="/projects" className="px-6 py-3 rounded-md border border-slate-300 text-slate-700">
                View Projects
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
