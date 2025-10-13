// src/app/contact/page.tsx
import ContactForm from "../contact/ContactForm/page";
import ContactHero from "../../components/Contact/ContactHero";

export const metadata = {
  title: "Contact Us - ARC 11 ARCHITECT | Architectural Design Studio",
  description:
    "Get in touch with ARC 11 ARCHITECT. Let's discuss your architectural vision and transform it into reality with our innovative design solutions.",
  alternates: { canonical: "https://www.arc11architect.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <ContactHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grid Layout: Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gray-900 rounded-2xl transform rotate-1 opacity-5"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Office Information
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z"
                      />
                      <circle cx="12" cy="11" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Office Address
                    </h3>
                    <p className="text-gray-600">
                      SHREE GANESHE ENTERPRISES <br />
                      MEP Solutions & Fire Safety Specialists <br />
                      Delhi NCR, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.69l1.5 4.48a1 1 0 01-.51 1.21l-2.26 1.13a11.05 11.05 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.51l4.48 1.5a1 1 0 01.69.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Phone
                    </h3>
                    <p className="text-gray-600">
                      <a
                        href="tel:+918527378555"
                        className="hover:text-red-600 transition-colors duration-300"
                      >
                        +91-8527378555
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="bg-red-100 p-3 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Email
                    </h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:info@sge.org.in"
                        className="hover:text-red-600 transition-colors duration-300"
                      >
                        info@sge.org.in
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Business Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium text-gray-900">
                      9:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium text-gray-900">
                      10:00 AM - 4:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-gray-900">
                      Emergency Services Only
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  24/7 Emergency Support
                </h3>
                <p className="text-gray-600 mb-2">
                  For urgent fire safety issues or emergency services:
                </p>
                <p className="text-red-600 font-semibold">
                  +91-8527378555
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gray-900 rounded-2xl transform -rotate-1 opacity-5"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Location
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <iframe
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.8856281986364!2d77.1821376!3d28.506875399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f768fdfa54b%3A0xd41288173e5dfa86!2sShree%20Ganesh%20Enterprises!5e0!3m2!1sen!2sin!4v1725958500000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SHREE GANESHE ENTERPRISES Location"
              className="rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
