// components/Career/CareerBenefits.tsx
export default function CareerBenefits() {
  const benefits = [
    {
      title: "Health Insurance",
      description: "Comprehensive health coverage for you and your family",
      icon: "❤️"
    },
    {
      title: "Provident Fund",
      description: "Retirement benefits with employer contributions",
      icon: "💰"
    },
    {
      title: "Paid Time Off",
      description: "Generous vacation, sick leave, and holidays",
      icon: "🏖️"
    },
    {
      title: "Training & Development",
      description: "Continuous learning opportunities and skill development",
      icon: "📚"
    },
    {
      title: "Performance Bonuses",
      description: "Rewards for exceptional performance and contributions",
      icon: "🎯"
    },
    {
      title: "Flexible Work Options",
      description: "Options for remote work and flexible schedules",
      icon: "⚙️"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Employee Benefits</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We value our team members and offer comprehensive benefits to support their well-being and professional growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
              <span className="text-3xl mr-4">{benefit.icon}</span>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}