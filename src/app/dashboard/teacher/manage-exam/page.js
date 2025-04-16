"use client";

import Dialog from "../../../../Components/Dialog";
import React, { useState } from "react";
import CreateExam from "./CreateExam";
import { MdAdd, MdSearch } from "react-icons/md";
import { useGetAllExamsForTeacherQuery } from "../../../../Redux/features/teacher/teacher.api";
import Pagination from "../../../../Components/Pagination";
import EditExam from "./EditExam";
import { FaEdit } from "react-icons/fa";

const ManageExam = () => {
  const limit = 10; // Number of exams per page
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: ExamData } = useGetAllExamsForTeacherQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "searchTerm", value: searchQuery },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const openEditDialog = () => setIsEditDialogOpen(true);
  const closeEditDialog = () => setIsEditDialogOpen(false);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const { total } = ExamData?.meta || {};

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header and Actions */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Exams</h1>
        <button
          onClick={openDialog}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <MdAdd size={20} />
          Create Exam
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search exams by title, batch, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdSearch className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>

      {/* Exam Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Course
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Batch
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Subject
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                File
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Dateline
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Max Score
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ExamData?.data?.map((exam) => (
              <tr key={exam._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700">
                  {exam.title}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {exam.batchId?.course_id.title || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {exam.batchId?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {exam.subjectId?.name || "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {exam?.file ? (
                    <a
                      className="text-blue-500 underline"
                      target="_blank"
                      href={exam?.file}
                    >
                      File
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(exam.dateline).toLocaleDateString()} <br />
                  <span className="text-xs text-gray-500">
                    {new Date(exam.dateline).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true, // Ensures AM/PM is shown
                    })}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-700">
                  {exam.time ? exam.time + " " + "min" : "N/A"}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {exam.maxScore}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exam.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {exam.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  <button
                    onClick={() => {
                      setEditData(exam);
                      openEditDialog();
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
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          itemsPerPage={limit}
          totalItems={total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Create Exam Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Create New Exam"
      >
        <CreateExam />
      </Dialog>
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        title="Edit Exam"
      >
        <EditExam examData={editData} />
      </Dialog>
    </div>
  );
};

export default ManageExam;
