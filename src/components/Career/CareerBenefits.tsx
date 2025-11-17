// components/Career/CareerBenefits.tsx
export default function CareerBenefits() {
  const benefits = [
    { title: "Health Insurance", icon: "❤️", description: "Comprehensive coverage for you and your family." },
    { title: "Provident Fund", icon: "💼", description: "Long-term financial security and retirement support." },
    { title: "Paid Time Off", icon: "🏖️", description: "Flexibility to balance life and work effectively." },
    { title: "Training & Certification", icon: "📚", description: "Skill development, workshops, and technical programs." },
    { title: "Performance Bonuses", icon: "🎯", description: "Quarterly and annual performance incentives." },
    { title: "Flexible Work Options", icon: "⚙️", description: "Hybrid work options depending on role and department." },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Employee Benefits</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-14">
          We provide a supportive environment that helps our team grow, thrive, and succeed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="flex p-6 bg-gray-50 rounded-lg hover:shadow-md transition items-start">
              <span className="text-3xl mr-4">{b.icon}</span>
              <div>
                <h3 className="text-xl font-semibold">{b.title}</h3>
                <p className="text-gray-600">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
