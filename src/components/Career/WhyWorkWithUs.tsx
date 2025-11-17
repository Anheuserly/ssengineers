// components/Career/WhyWorkWithUs.tsx
export default function WhyWorkWithUs() {
  const reasons = [
    {
      title: "Growth Opportunities",
      description:
        "We invest in your future with training, certifications, and structured engineering career paths.",
      icon: (
        <svg className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: "Innovative Engineering",
      description:
        "Work with advanced MEP technologies, fire systems, BIM workflows, and modern engineering tools.",
      icon: (
        <svg className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M12 3v1m6.4 1.6l-.7.7M21 12h-1M4 12H3m3.3-5.7l-.7-.7m2.9 9.9a5 5 0 117.1 0" />
        </svg>
      ),
    },
    {
      title: "Competitive Compensation",
      description:
        "Industry-standard salaries, performance bonuses, and annual increments for high-performing team members.",
      icon: (
        <svg className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2" />
        </svg>
      ),
    },
    {
      title: "Work-Life Balance",
      description:
        "A healthy culture with flexible schedules, supportive policies, and a people-first philosophy.",
      icon: (
        <svg className="w-12 h-12 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At SS Engineers & Consultants, our people are the foundation of our success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-lg transition">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
