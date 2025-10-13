// components/Home/CertificationsSection.jsx
export default function CertificationsSection() {
  const certifications = [
    {
      id: 1,
      name: "ISO 9001:2015",
      description: "Quality Management System Certification",
      logo: "https://cdn.worldvectorlogo.com/logos/iso-9001-2015.svg",
    },
    {
      id: 2,
      name: "NFPA Certified",
      description: "National Fire Protection Association Standards",
      logo: "https://cdn.worldvectorlogo.com/logos/nfpa.svg",
    },
    {
      id: 3,
      name: "BIS Certified",
      description: "Bureau of Indian Standards Certification",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/BIS_logo.svg/1200px-BIS_logo.svg.png",
    },
    {
      id: 4,
      name: "FM Approved",
      description: "FM Global Certification for Safety Products",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/FM_Global_logo.svg/1200px-FM_Global_logo.svg.png",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Standards</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We adhere to the highest industry standards and hold certifications that guarantee quality and safety.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="h-24 flex items-center justify-center mb-4">
                <img 
                  src={cert.logo} 
                  alt={cert.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{cert.name}</h3>
              <p className="text-gray-600">{cert.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-blue-50 p-8 rounded-lg border border-blue-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Assurance</h3>
              <p className="text-gray-600">
                Our commitment to quality is demonstrated through our certifications and adherence to international standards. 
                We ensure all our solutions meet regulatory requirements and deliver optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}