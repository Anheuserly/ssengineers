// components/Home/TestimonialsSection.jsx
export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      quote: "SHREE GANESHE ENTERPRISES installed our fire safety system with exceptional professionalism. Their team was knowledgeable and completed the project ahead of schedule.",
      name: "Rajesh Kumar",
      role: "Facility Manager, Tech Park",
      rating: 5
    },
    {
      id: 2,
      quote: "We've been using their AMC services for three years now. The maintenance is always thorough and their response time for emergencies is impressive.",
      name: "Priya Sharma",
      role: "Property Manager, Commercial Complex",
      rating: 5
    },
    {
      id: 3,
      quote: "The electrical work completed by SHREE GANESHE ENTERPRISES was top-notch. They provided innovative solutions that helped us reduce energy costs.",
      name: "Vikram Singh",
      role: "Operations Director, Manufacturing Unit",
      rating: 4
    },
    {
      id: 4,
      quote: "Their team designed and implemented a comprehensive IBMS for our new office building. The system has been flawless and greatly improved our operational efficiency.",
      name: "Anjali Mehta",
      role: "CEO, Corporate Services",
      rating: 5
    },
    {
      id: 5,
      quote: "The plumbing solutions provided were both cost-effective and durable. We haven't had any issues in the two years since installation.",
      name: "Sanjay Patel",
      role: "Hotel General Manager",
      rating: 4
    },
    {
      id: 6,
      quote: "Their security system installation was professional and the training provided to our staff was comprehensive. We feel much more secure now.",
      name: "Neha Gupta",
      role: "School Administrator",
      rating: 5
    }
  ];

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why businesses across Delhi NCR trust SHREE GANESHE ENTERPRISES for their MEP solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}