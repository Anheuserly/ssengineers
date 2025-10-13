// components/Home/ProjectsSection.jsx
export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Corporate Office Fire Safety System",
      description: "Complete fire safety solution for a 20-story corporate building including detection and suppression systems.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      tags: ["Fire Safety", "Detection Systems"]
    },
    {
      id: 2,
      title: "Shopping Mall Electrical Setup",
      description: "Electrical system design and installation for a large shopping mall with energy-efficient solutions.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      tags: ["Electrical", "Energy Efficiency"]
    },
    {
      id: 3,
      title: "Hospital Plumbing & IBMS",
      description: "Advanced plumbing and integrated building management system for a multi-specialty hospital.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      tags: ["Plumbing", "IBMS"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore some of our recent projects and see how we've helped businesses enhance their safety and efficiency.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}