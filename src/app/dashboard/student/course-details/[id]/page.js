"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useGetCourseBatchQuery } from "../../../../../Redux/features/Student/student.api";
import Link from "next/link";
import Submission from "./Submission";
import Exam from "./Exam";
import StudentCourseQuizes from "../../../../../Components/StudentCourseQuizes";
import Schedule from "./Schedule";

const CourseDetails = () => {
  const e = useSearchParams();
  const location = e.get("layout") || "schedule";
  const { id } = useParams();
  const { data } = useGetCourseBatchQuery(id, { skip: !id });
  const buttons = ["schedule", "submission", "exam", "quizes"];
  const [batchId, setBatchId] = useState("");

  useEffect(() => {
    if (data) {
      setBatchId(data?.data[0]._id);
    }
  }, [data]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with responsive flex layout */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Study</h1>

        {/* Responsive batch selector */}
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Batch
          </label>
          <div className="relative">
            <select
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="block w-full px-4 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="">Select Batch</option>
              {data?.data.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive navigation buttons */}
      <div className="flex flex-wrap gap-2 p-2 md:p-6 overflow-x-auto">
        {buttons.map((item) => (
          <Link
            href={`/dashboard/student/course-details/${id}?layout=${item}`}
            key={item}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap
              ${
                location === item
                  ? "bg-blue-600 text-white shadow-md" // Selected button style
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200" // Default button style
              }
              ${
                location === item
                  ? "md:px-6 md:py-2" // Larger padding when selected
                  : "md:px-4 md:py-2" // Regular padding
              }
            `}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </div>

      {/* Content area */}
      <div className="p-2 md:p-6">
        {(() => {
          const components = {
            schedule: <Schedule batchId={batchId} />,
            submission: <Submission batchId={batchId} />,
            exam: <Exam batchId={batchId} />,
            quizes: <StudentCourseQuizes batchId={batchId} />,
          };
          return components[location] || null;
        })()}
      </div>
    </div>
  );
};

export default CourseDetails;
