export default function StatsSection() {
  const stats = [
    { value: "500+", label: "Systems Installed" },
    { value: "10+", label: "Years of Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support & Emergency Service" }
  ];

  return (
    <section className="py-20 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-5xl font-extrabold mb-3">{stat.value}</div>
              <p className="text-blue-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}