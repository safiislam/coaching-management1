"use client";
import React from "react";

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Terms & Conditions
      </h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p>
            Welcome to our Course Management Web Application. By accessing or
            using our platform, you agree to be bound by these terms. Please
            read them carefully.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
          <p>
            Users must provide accurate and complete information during
            registration. You are responsible for safeguarding your account
            credentials and for all activities under your account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Course Enrollment</h2>
          <p>
            Once enrolled in a course, you gain access to its materials and
            syllabus. Unauthorized sharing of course content is strictly
            prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Intellectual Property
          </h2>
          <p>
            All content including lessons, images, and documents remain the
            intellectual property of the respective instructors or the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Prohibited Conduct</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Engaging in fraudulent activities</li>
            <li>Attempting to disrupt our services</li>
            <li>Sharing harmful or inappropriate content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Payment & Refunds</h2>
          <p>
            Course fees are clearly mentioned. Refunds may be offered under
            specific conditions and at the discretion of the admin.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts violating our
            terms or engaging in malicious activities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
          <p>
            We may update these terms periodically. Continued use of the
            platform constitutes your acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>
            If you have questions or concerns, please contact us at:{" "}
            <a
              href="mailto:support@yourdomain.com"
              className="text-blue-600 hover:underline"
            >
              support@edulearn.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
