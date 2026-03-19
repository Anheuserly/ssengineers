import SectionHeading from "@/components/SectionHeading";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import { careerOpenings, company } from "@/lib/content";

export default function CareerPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <SectionHeading
            eyebrow="Career"
            title="Join Our Engineering Team"
            subtitle="We are hiring committed professionals for fire protection, MEP execution, and maintenance operations."
          />
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <SectionHeading
              eyebrow="Open Positions"
              title="Current Vacancies"
              subtitle="Submit your profile for the role that matches your experience."
            />
            <div className="grid-2">
              {careerOpenings.map((job) => (
                <article key={job.title} className="tile">
                  <h3>{job.title}</h3>
                  <p className="muted">
                    {job.location} | {job.type} | {job.experience}
                  </p>
                  <p className="muted">{job.description}</p>
                </article>
              ))}
            </div>
            <div className="notice">
              <p className="muted">
                Branch offices will be listed here: {company.branchOffices.join(" | ")}
              </p>
            </div>
          </div>
          <div className="form-panel">
            <h3>Apply Now</h3>
            <p className="muted">
              Upload your resume and share your work details. The application will
              be stored in Appwrite collection and resume bucket.
            </p>
            <CareerApplicationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
