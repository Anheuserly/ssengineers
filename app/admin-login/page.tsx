import PortalLoginForm from "@/components/PortalLoginForm";

export default function AdminLoginPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Restricted Route</p>
            <h2>Admin Login</h2>
            <p className="muted">
              This route is intentionally hidden from public navigation.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <article className="panel">
            <h3>Security Notice</h3>
            <ul className="checklist">
              <li>Admin credentials are validated through database records only.</li>
              <li>Use authorized accounts issued by management.</li>
              <li>Do not share credentials outside your approved operations team.</li>
            </ul>
          </article>

          <aside className="form-panel">
            <PortalLoginForm
              allowedRoles={["admin"]}
              defaultRole="admin"
              title="Admin Control Access"
              subtitle="Enter admin user ID and password to continue."
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
