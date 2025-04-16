"use client";
import React from "react";
import { FiBook, FiUsers, FiAward, FiGlobe } from "react-icons/fi";
import Link from "next/link";

const AboutPage = () => {
  const stats = [
    { id: 1, name: "Courses Available", value: "100+", icon: FiBook },
    { id: 2, name: "Students Enrolled", value: "10,000+", icon: FiUsers },
    { id: 3, name: "Expert Instructors", value: "50+", icon: FiAward },
    { id: 4, name: "Countries Reached", value: "30+", icon: FiGlobe },
  ];

  const team = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Head of Education",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Tech Lead",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: 4,
      name: "Emma Davis",
      role: "Student Success",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-blue-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Our Learning Platform
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Empowering learners worldwide with high-quality, accessible
            education since 2015.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mb-8 lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Students learning"
                width={800}
                height={600}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                We believe education should be accessible, engaging, and
                transformative. Our platform brings together world-class
                instructors and passionate learners to create meaningful
                learning experiences.
              </p>
              <div className="mt-8">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Explore Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              By The Numbers
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Impact in Education
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <stat.icon className="mx-auto h-12 w-12 text-blue-500" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {stat.value}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{stat.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Our Team
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet the people behind our platform
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <div key={person.id} className="text-center">
                <div className="relative h-48 w-48 mx-auto mb-4 overflow-hidden rounded-full shadow-md">
                  <img
                    src={person.image}
                    alt={person.name}
                    // layout="fill"
                    // objectFit="cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {person.name}
                </h3>
                <p className="text-blue-600">{person.role}</p>
                <p className="mt-2 text-sm text-gray-500">
                  Passionate about creating transformative learning experiences
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start learning?</span>
            <span className="block text-blue-200">
              Join thousands of happy students today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Browse Courses
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 bg-opacity-60 hover:bg-opacity-70"
              >
                Sign Up Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
