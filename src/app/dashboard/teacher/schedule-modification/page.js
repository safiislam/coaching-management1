"use client";
import Pagination from "../../../../Components/Pagination";
import { useGetAllScheduleModificationForTeacherQuery } from "../../../../Redux/features/teacher/teacher.api";
import {
  FiClock,
  FiCalendar,
  FiBook,
  FiUser,
  FiXCircle,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { useState } from "react";
import { getFormattedClassTime } from "../../../../utils/formateDate";

const ScheduleModification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: scheduleData } = useGetAllScheduleModificationForTeacherQuery([
    { name: "page", value: currentPage },
  ]);
  const limit = 40; // Number of users per page
  const { total } = scheduleData?.meta || {}; // Get total users
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            <FiClock className="w-3 h-3 mr-1.5" />
            Pending
          </div>
        );
      case "Approved":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FiX className="w-3 h-3 mr-1.5" />
            Rejected
          </div>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FiXCircle className="mr-1.5" /> Rejected
          </span>
        );
      default:
        return (
          // Accepted
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FiCheck className="w-3 h-3 mr-1.5" />
            Accepted
          </div>
        );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Schedule Modification Requests
        </h2>
        <p className="text-gray-600">
          View and manage schedule change requests
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <FiCalendar className="mr-2" /> Date
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <FiClock className="mr-2" /> Original Time
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <FiClock className="mr-2" /> Requested Time
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <FiBook className="mr-2" /> Subject
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div className="flex items-center">
                  <FiUser className="mr-2" /> Batch
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              {/* <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {scheduleData?.data?.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(request.scheduleId.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {getFormattedClassTime(request.scheduleId.timeSlot)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 font-medium">
                    {getFormattedClassTime(request.timeSlot)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {request.scheduleId.subject}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {request.scheduleId.batchId.name}
                    <div className="text-xs text-gray-500">
                      {request.scheduleId.batchId.course_id.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(request.isScheduleChange)}
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    Approve
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (if needed) */}
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

export default ScheduleModification;
