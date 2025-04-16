"use client";
import Dialog from "../../../../Components/Dialog";
import Pagination from "../../../../Components/Pagination";
import {
  useGetAllSubmissionForTeacherQuery,
  useGetAllExamsForTeacherQuery,
} from "../../../../Redux/features/teacher/teacher.api";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import UpdateSubmission from "./UpdateSubmission";

const ManageSubmission = () => {
  const limit2 = 1000000;
  const { data: ExamData } = useGetAllExamsForTeacherQuery([
    { name: "limit", value: limit2 },
  ]);

  const limit = 10; // Number of exams per page
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submissionEditData, setSubmissionEditData] = useState(null);
  const [selectedExamId, setSelectedExamId] = useState(""); // State to store selected exam ID

  const { data: submissionData } = useGetAllSubmissionForTeacherQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "examId", value: selectedExamId }, // Add examId to the query
  ]);

  const { total } = submissionData?.meta || {};
  const submissions = submissionData?.data || [];
  const exams = ExamData?.data || [];

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleExamChange = (e) => {
    setSelectedExamId(e.target.value); // Update selected exam ID
    setCurrentPage(1); // Reset to the first page when changing the exam filter
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Manage Submissions</h1>

        {/* Exam Filter Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Filter by Exam
          </label>
          <select
            value={selectedExamId}
            onChange={handleExamChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Exams</option>
            {exams.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submission Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">Exam Title</th>
              <th className="py-3 px-4 border-b text-left">Submission Date</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              <th className="py-3 px-4 border-b text-left">Score</th>
              <th className="py-3 px-4 border-b text-left">Feedback</th>
              <th className="py-3 px-4 border-b text-left">File</th>
              <th className="py-3 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">
                  {submission.examId.title}
                </td>
                <td className="py-3 px-4 border-b">
                  {new Date(submission.submissionDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded ${
                      submission.status === "submitted"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {submission.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">{submission.score}</td>
                <td className="py-3 px-4 border-b">
                  {submission.feedback || "No feedback"}
                </td>
                <td className="py-3 px-4 border-b">
                  <a
                    href={submission.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View File
                  </a>
                </td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => {
                      setSubmissionEditData(submission);
                      openDialog();
                    }}
                    className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Dialog for Update Submission */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          title="Update Submission"
        >
          <UpdateSubmission submissionEditData={submissionEditData} />
        </Dialog>
        <div className="mt-6 flex justify-center">
          <Pagination
            itemsPerPage={limit}
            totalItems={total}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {/* Pagination */}
    </div>
  );
};

export default ManageSubmission;
