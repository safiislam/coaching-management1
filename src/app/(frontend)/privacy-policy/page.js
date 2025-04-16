import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Privacy Policy | Course Management App</title>
        <meta
          name="description"
          content="Our privacy policy explains how we collect and use your data"
        />
      </Head>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to our Course Management App. We are committed to
              protecting your personal information and your right to privacy.
            </p>
            <p className="text-gray-600">
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our application.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>
                Personal identification information (Name, email address, phone
                number)
              </li>
              <li>Account information (username, password, profile picture)</li>
              <li>Course enrollment and progress data</li>
              <li>
                Payment information (processed securely through our payment
                processor)
              </li>
              <li>
                Technical data (IP address, browser type, device information)
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our service</li>
                <li>Process your course enrollments and payments</li>
                <li>Personalize your learning experience</li>
                <li>Communicate with you about your account</li>
                <li>Improve our application and develop new features</li>
                <li>Ensure application security and prevent fraud</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction.
            </p>
            <p className="text-gray-600">
              All sensitive data is encrypted in transit and at rest using
              industry-standard protocols.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Access, update or delete your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="mt-2 text-indigo-600">support@edulearn.com</p>
          </section>
        </div>

        {/* <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Course Management App. All rights reserved.
        </div> */}
      </main>
    </div>
  );
};

export default PrivacyPolicy;
