"use client";

import { useState, useRef } from "react";
import { useGetAllScheduleQuery } from "../../../../Redux/features/teacher/teacher.api";
import Pagination from "../../../../Components/Pagination";
import PdfConverter from "../../../../Components/PdfConverter";
import Link from "next/link";
import Dialog from "../../../../Components/Dialog";
import NeedScheduleChange from "./NeedScheduleChange";
import { getFormattedClassTime } from "../../../../utils/formateDate";

const ManageSchedule = () => {
  const pdfRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 40;
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [date, setDate] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const openEditDialog = () => setIsEditDialogOpen(true);
  const closeEditDialog = () => setIsEditDialogOpen(false);
  const [schedule, setSchedule] = useState(null);

  const { data: scheduleData } = useGetAllScheduleQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "searchTerm", value: search },
    { name: "dateFilter", value: dateFilter.trim() },
    { name: "fixedDate", value: date },
  ]);

  const { total } = scheduleData?.meta || {};

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Schedule</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {["all", "today", "tomorrow", "next7Days"].map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setDateFilter(filter);
              if (filter == "all") {
                setDate("");
                setSearch("");
              }
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              dateFilter === filter
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter === "all"
              ? "All Schedules"
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search schedules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
        />
        <button
          onClick={() => pdfRef.current?.convertToPdf()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Download as PDF
        </button>
      </div>

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                {[
                  "Date",
                  "Time Slot",
                  "Subject",
                  "Batch",
                  "Course",
                  "Status",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scheduleData?.data?.length > 0 ? (
                scheduleData.data.map((schedule) => (
                  <tr
                    key={schedule._id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="px-5 py-3 text-sm text-gray-700">
                      {new Date(schedule.date).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700">
                      {getFormattedClassTime(schedule.timeSlot)}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700">
                      {schedule.subject}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700">
                      {schedule.batchId?.name || "-"}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700">
                      {schedule.batchId?.course_id?.title || "-"}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700">
                      {schedule.isAttendance
                        ? "Attended"
                        : schedule.isAttendance === false
                        ? "absent"
                        : "-"}
                    </td>
                    <td className="px-5 py-3 text-sm text-gray-700">
                      <Link
                        href={`/dashboard/teacher/attendance/${schedule._id}`}
                        aria-label={`View attendance for schedule ${schedule._id}`} // or a more descriptive label
                      >
                        Attendance
                      </Link>
                      <button
                        onClick={() => {
                          openEditDialog();
                          setSchedule(schedule._id);
                        }}
                        className="ms-4"
                      >
                        Schedule Change
                      </button>
                    </td>
                    {/* <td className="px-5 py-3 text-sm font-medium">
                      {schedule.isConflict ? (
                        <span className="text-red-600">Conflict</span>
                      ) : (
                        <span className="text-green-600">No Conflict</span>
                      )}
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    No schedules found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="hidden">
        <PdfConverter ref={pdfRef}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  {["Date", "Time Slot", "Subject", "Batch", "Course"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {scheduleData?.data?.length > 0 ? (
                  scheduleData.data.map((schedule) => (
                    <tr
                      key={schedule._id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="px-5 py-3 text-sm text-gray-700">
                        {new Date(schedule.date).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700">
                        {schedule.timeSlot}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700">
                        {schedule.subject}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700">
                        {schedule.batchId?.name || "-"}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700">
                        {schedule.batchId?.course_id?.title || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No schedules found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </PdfConverter>
      </div>
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        title="Edit Schedule"
      >
        <NeedScheduleChange scheduleId={schedule} />
      </Dialog>

      {/* Pagination */}
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

export default ManageSchedule;
