// components/Home/PartnersSection.jsx
export default function PartnersSection() {
  const partners = [
    { id: 1, name: "Partner 1", logo: "https://via.placeholder.com/150x80?text=Partner+1" },
    { id: 2, name: "Partner 2", logo: "https://via.placeholder.com/150x80?text=Partner+2" },
    { id: 3, name: "Partner 3", logo: "https://via.placeholder.com/150x80?text=Partner+3" },
    { id: 4, name: "Partner 4", logo: "https://via.placeholder.com/150x80?text=Partner+4" },
    { id: 5, name: "Partner 5", logo: "https://via.placeholder.com/150x80?text=Partner+5" },
    { id: 6, name: "Partner 6", logo: "https://via.placeholder.com/150x80?text=Partner+6" },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          We are proud to collaborate with industry leaders and trusted partners to deliver exceptional services.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
              <img src={partner.logo} alt={partner.name} className="max-h-12 max-w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}