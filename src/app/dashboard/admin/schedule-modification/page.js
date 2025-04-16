"use client";
import Pagination from "../../../../Components/Pagination";
import {
  useGetAllScheduleModificationQuery,
  useUpdateScheduleModificationMutation,
} from "../../../../Redux/features/Admin/admin.api";
import {
  FiClock,
  FiCalendar,
  FiBook,
  FiUser,
  FiXCircle,
  FiX,
  FiCheck,
  FiInfo,
  FiPhone,
  FiAlertCircle,
} from "react-icons/fi";
import { useState } from "react";
import { getFormattedClassTime } from "../../../../utils/formateDate";
import Dialog from "../../../../Components/Dialog";
import EditScheduleModification from "./EditScheduleModification";
import Swal from "sweetalert2";

const ScheduleModification = () => {
  const [updateScheduleModification] = useUpdateScheduleModificationMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [schedule, setSchedule] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: scheduleData } = useGetAllScheduleModificationQuery([
    { name: "page", value: currentPage },
  ]);
  const [scheduleStatus, setScheduleStatus] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const openEditDialog = () => {
    setIsEditDialogOpen(true);
  };
  const closeEditDialog = () => {
    setScheduleStatus(null);
    setIsEditDialogOpen(false);
  };
  const limit = 40;
  const { total } = scheduleData?.meta || {};

  const openDialog = (request) => {
    setSchedule(request);
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);
  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <FiClock className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case "Accepted":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheck className="w-3 h-3 mr-1" />
            Accepted
          </span>
        );
      case "Reject":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiXCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <FiAlertCircle className="w-3 h-3 mr-1" />
            Unknown
          </span>
        );
    }
  };
  const handelStatusChange = (data) => {
    const payload = {
      isScheduleChange: data.status,
    };
    Swal.fire({
      title: "Are you sure to update this Schedule?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await updateScheduleModification({
          id: data.scheduleId,
          payload,
        });
        if (response.data) {
          Swal.fire({
            title: "Schedule",
            text: "Schedule updated successfully",
            icon: "success",
          });
        } else {
          showToast("error", "Error", response.error.data.message);
        }
      }
    });
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Schedule Modifications
        </h1>
        <p className="text-gray-600">Manage all schedule change requests</p>
      </div>

      <div className="space-y-4">
        {scheduleData?.data?.map((request) => (
          <div
            key={request._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-800">
                      {request.scheduleId.subject} -{" "}
                      {request.scheduleId.batchId.name}
                    </h3>
                    {getStatusBadge(request.isScheduleChange)}
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {request.scheduleId.batchId.course_id.title}
                  </p>
                </div>
                <button
                  onClick={() => openDialog(request)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <FiInfo className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <FiCalendar className="mr-2" />
                    Date
                  </div>
                  <p className="font-medium">
                    {new Date(request.scheduleId.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <FiClock className="mr-2" />
                    Original Time
                  </div>
                  <p className="font-medium">
                    {getFormattedClassTime(request.scheduleId.timeSlot)}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <FiClock className="mr-2" />
                    Requested Time
                  </div>
                  <p className="font-medium text-blue-600">
                    {getFormattedClassTime(request.timeSlot)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-5 py-3 border-t flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-600">
                <FiUser className="mr-2" />
                {request.scheduleId.teacherId.name}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handelStatusChange({
                      scheduleId: request.scheduleId._id,
                      status: "Reject",
                    });
                  }}
                  className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    setScheduleStatus({
                      scheduleId: request,
                      status: "Approved",
                    });
                    openEditDialog();
                  }}
                  className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Request Details"
      >
        {schedule && (
          <div className="space-y-6">
            {/* Header with status */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {schedule.scheduleId.subject} -{" "}
                  {schedule.scheduleId.batchId.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(schedule.scheduleId.date).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              {getStatusBadge(schedule.isScheduleChange)}
            </div>

            {/* Time Comparison */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Original Time
                  </p>
                  <p className="font-medium">
                    {getFormattedClassTime(schedule.scheduleId.timeSlot)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Requested Time
                  </p>
                  <p className="font-medium text-blue-600">
                    {getFormattedClassTime(schedule.timeSlot)}
                  </p>
                </div>
              </div>
            </div>

            {/* Reason Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiAlertCircle className="mr-2 text-amber-500" />
                Reason for Change
              </h4>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg">
                <p className="text-gray-700">
                  {schedule.causes || "No specific reason provided"}
                </p>
              </div>
            </div>

            {/* Teacher and Batch Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiUser className="mr-2 text-gray-500" />
                  Teacher Details
                </h4>
                <p className="font-medium text-gray-800">
                  {schedule.scheduleId.teacherId.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {schedule.scheduleId.teacherId.email}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiBook className="mr-2 text-gray-500" />
                  Batch Details
                </h4>
                <p className="font-medium text-gray-800">
                  {schedule.scheduleId.batchId.name}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {schedule.scheduleId.batchId.course_id.title}
                </p>
              </div>
            </div>

            {/* Action Buttons (optional) */}
            {/* <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                Reject
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Approve
              </button>
            </div> */}
          </div>
        )}
      </Dialog>
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        // title="Edit Batch"
      >
        <EditScheduleModification scheduleStatus={scheduleStatus} />
      </Dialog>

      <div className="mt-8 flex justify-center">
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
