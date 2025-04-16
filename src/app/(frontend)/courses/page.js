"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiDollarSign } from "react-icons/fi";
import { useGetAllCourseForUserQuery } from "../../../Redux/features/Student/student.api";
import Pagination from "../../../Components/Pagination";
import CourseCardLoader from "../../../Components/CourseCardLoader";

const Courses = () => {
  const getShortDescription = (text, wordLimit = 5) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };
  const courseTypes = ["Class Based", "Topic Based"];
  const statuses = ["Upcoming", "Ongoing"];
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 20; // Number of users per page
  const { data, isLoading } = useGetAllCourseForUserQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "searchTerm", value: search },
  ]);
  const courses = data?.data?.result;
  const { total } = data?.data?.meta || {}; // Get total users
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  if (isLoading) {
    return <CourseCardLoader />;
  }
  return (
    <div className="mt-12 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Courses
        </h2>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Course Type Dropdown */}
        <div className="relative">
          <select
            onChange={(e) => setSearch(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Course Types</option>
            {courseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            onChange={(e) => setSearch(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={(e) => setSearch("")}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset Filters
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses?.map((course) => (
          <div
            key={course._id}
            className=" rounded-lg shadow-md  transition p-2 relative"
          >
            <div
              key={course._id}
              className=" rounded-lg  transition p-4 relative"
            >
              {/* Status Badge - Top Right */}
              <div className="absolute top-3 right-3 z-0">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    course.status === "Upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : course.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              {/* Image */}
              <div className="h-40 w-full overflow-hidden rounded-md mb-4">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {course.title}
              </h3>

              {/* Price */}
              <div className="flex items-center text-yellow-500 text-sm mb-2">
                <FiDollarSign className="mr-1" />
                <span className="font-medium">{course.price}</span>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 text-sm mb-3">
                {getShortDescription(course.description)}
              </p>

              {/* Course Type */}
              <span className="inline-block mb-4 px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                {course.courseType}
              </span>

              {/* CTA */}
              <div className="flex justify-end">
                <Link
                  href={`/courses/${course._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Pagination
          itemsPerPage={limit}
          totalItems={total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Courses;
