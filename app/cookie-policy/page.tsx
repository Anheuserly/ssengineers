import SectionHeading from "@/components/SectionHeading";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

const lastUpdated = "March 19, 2026";

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Legal"
            title="Cookie Policy"
            subtitle="How cookies are used for website functionality, analytics, and communication preferences."
          />
          <p className="muted">Last updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel">
            <h3>1. What Are Cookies?</h3>
            <p className="muted">
              Cookies are small text files stored in your browser to remember
              preferences, improve usability, and help keep services secure.
            </p>

            <h3>2. Cookie Categories</h3>
            <ul>
              <li>Necessary cookies: required for secure and basic site operation.</li>
              <li>Analytics cookies: measure site performance and usage quality.</li>
              <li>Marketing cookies: support campaign tracking and follow-up engagement.</li>
            </ul>

            <h3>3. Retention</h3>
            <p className="muted">
              Cookie preferences are retained for a limited period and can be updated
              anytime through cookie settings.
            </p>
          </div>

          <div className="panel">
            <h3>4. Managing Preferences</h3>
            <p className="muted">
              You can accept all cookies, reject optional cookies, or customize your
              preferences based on your requirements.
            </p>
            <p className="muted">
              <CookiePreferencesButton className="button small ghost" />
            </p>

            <h3>5. Browser Controls</h3>
            <p className="muted">
              You may also clear or block cookies from browser settings. Some features
              may be limited if necessary cookies are disabled.
            </p>

            <h3>6. Policy Updates</h3>
            <p className="muted">
              Cookie practices may be updated as technology or legal requirements change.
              Significant updates will be reflected by the revision date above.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
