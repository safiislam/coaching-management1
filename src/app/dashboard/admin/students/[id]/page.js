"use client";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import StudentDetails from "./StudentDetails";
import { useGetAllCourseForStudentQuery } from "../../../../../Redux/features/Admin/admin.api";
import AllCourse from "./AllCourse";
import BatchInFormation from "./BatchInFormation";

const StudentDetailsPage = () => {
  const { id } = useParams();
  const { data } = useGetAllCourseForStudentQuery(id, { skip: !id });

  const searchParams = useSearchParams();
  const location = searchParams.get("layout") || "attendance";

  // State for selected course and batch
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  // Get courses and batches
  const courses = data?.data || [];

  // Get batches based on selected course
  const batches =
    courses.find((course) => course._id === selectedCourse)?.batches || [];
  const buttons = ["attendance", "submission", "exam", "quizes", "payment"]; // Button labels

  return (
    <div className="p-4">
      <StudentDetails studentId={id} />
      <AllCourse studentId={id} />

      {/* Course Selection */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Course
          </label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={selectedCourse || ""}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedBatch(null); // Reset batch when course changes
            }}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        {/* Batch Selection */}
        <div>
          {selectedCourse && batches.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Batch
              </label>
              <select
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={selectedBatch || ""}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="">-- Select Batch --</option>
                {batches.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      <BatchInFormation batchId={selectedBatch} studentId={id} />
    </div>
  );
};

export default StudentDetailsPage;
