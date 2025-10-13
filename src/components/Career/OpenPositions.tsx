// components/Career/OpenPositions.tsx
"use client";

import { useState } from "react";
import { databases, storage, DATABASE_ID, COLLECTIONS, BUCKETS } from "../../lib/appwrite";

export default function OpenPositions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    currentCompany: "",
    currentPosition: "",
    coverLetter: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const positions = [
    {
      id: 1,
      title: "Senior Fire Safety Engineer",
      department: "Fire Safety",
      type: "Full-time",
      location: "Delhi NCR",
      experience: "5+ years"
    },
    {
      id: 2,
      title: "Electrical Design Engineer",
      department: "Electrical",
      type: "Full-time",
      location: "Delhi NCR",
      experience: "3+ years"
    },
    {
      id: 3,
      title: "Plumbing Systems Specialist",
      department: "Plumbing",
      type: "Full-time",
      location: "Delhi NCR",
      experience: "4+ years"
    },
    {
      id: 4,
      title: "IBMS Project Manager",
      department: "IBMS",
      type: "Full-time",
      location: "Delhi NCR",
      experience: "6+ years"
    },
    {
      id: 5,
      title: "MEP Site Supervisor",
      department: "Operations",
      type: "Full-time",
      location: "Delhi NCR",
      experience: "3+ years"
    },
    {
      id: 6,
      title: "Sales Executive - MEP Solutions",
      department: "Sales",
      type: "Full-time",
      location: "Delhi NCR",
      experience: "2+ years"
    }
  ];

  const handleApplyClick = (position: any) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
    setSubmitMessage("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setSubmitMessage("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Upload resume file
      const resumeResponse = await storage.createFile(
        BUCKETS.CAREER,
        'unique()',
        resumeFile
      );

      // Create application document
      await databases.createDocument(
        DATABASE_ID,
        COLLECTIONS.CAREER,
        'unique()',
        {
          ...formData,
          position: selectedPosition.title,
          resumeId: resumeResponse.$id,
          status: "new",
          appliedAt: new Date().toISOString(),
        }
      );

      setSubmitMessage("Application submitted successfully!");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        currentCompany: "",
        currentPosition: "",
        coverLetter: ""
      });
      setResumeFile(null);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitMessage("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore current opportunities to join our team of MEP experts and grow your career with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {positions.map((position) => (
            <div key={position.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900">{position.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{position.department}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">{position.type}</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">{position.location}</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">{position.experience}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleApplyClick(position)}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Don't see a position that matches your skills? Send us your resume anyway!
          </p>
          <button 
            onClick={() => handleApplyClick({ title: "General Application" })}
            className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 border border-blue-600 transition-colors duration-300"
          >
            Submit General Application
          </button>
        </div>

        {/* Application Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold mb-4">Apply for {selectedPosition?.title}</h3>
              
              {submitMessage ? (
                <div className={`p-4 rounded-lg mb-4 ${submitMessage.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {submitMessage}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Company (Optional)</label>
                    <input
                      type="text"
                      name="currentCompany"
                      value={formData.currentCompany}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Position (Optional)</label>
                    <input
                      type="text"
                      name="currentPosition"
                      value={formData.currentPosition}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
                    <textarea
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume * (PDF, DOC, DOCX)</label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}