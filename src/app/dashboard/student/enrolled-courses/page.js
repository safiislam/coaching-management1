"use client";
import Link from "next/link";
import { useGetAllEnrolledCourseQuery } from "../../../../Redux/features/Student/student.api";
import React from "react";

const EnrolledCourses = () => {
  const { data: enrolledCourse } = useGetAllEnrolledCourseQuery();
  const courses = enrolledCourse?.data || [];
  console.log(courses);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Enrolled Courses</h1>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Status Badge (Top Right) */}
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  course.status === "Upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : course.status === "Ongoing"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {course.status}
              </span>
            </div>

            {/* Course Image (Overlay) */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-300 transform scale-100 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-20"></div>
            </div>

            {/* Course Details (Content) */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                {course.title}
              </h2>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-1">Type:</span>
                  <span>{course.courseType}</span>
                </div>
                {/* <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-1">Start:</span>
                  <span>{new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-1">End:</span>
                  <span>{new Date(course.endDate).toLocaleDateString()}</span>
                </div> */}
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-1">Price:</span>
                  <span>${course.price}</span>
                </div>
              </div>

              {/* View Details Button (Bottom) */}
              <Link
                href={`/dashboard/student/course-details/${course._id}`}
                className="mt-4"
              >
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
