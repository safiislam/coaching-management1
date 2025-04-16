/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
    useGetSingleCourseQuery,
    useCourseStatusChangeMutation,
    useGetAllBatchByCourseIdQuery,
    useDeleteBatchMutation,
} from "../../../../../Redux/features/Admin/admin.api";
import { useEffect, useState } from "react";
import Dialog from "../../../../../Components/Dialog";
import CreateBatch from "./CreateBatch";
import EditBatch from "./EditBatch";
import ManageSchedule from "./ManageSchedule";
import placeholderImage from "../../../.././../../public/images/theme/placeholder-309.png";
import EditCourse from "./EditCourse";
import { FiBook, FiDollarSign } from "react-icons/fi";
import ManageSyllabus from "./ManageSyllabus";
import showToast from "../../../../../utils/toast";

// Icons
const PencilIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
);

const TrashIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
        />
    </svg>
);

const CalendarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
        />
    </svg>
);

const UsersIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
);

const ClockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
        <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
        />
    </svg>
);

const calculateDaysRemaining = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const total = end.getTime() - start.getTime();
    const elapsed = today.getTime() - start.getTime();
    return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
};

const StatusBadge = ({ status }) => {
    const statusColors = {
        Active: "bg-green-100 text-green-800",
        Inactive: "bg-red-100 text-red-800",
        Upcoming: "bg-blue-100 text-blue-800",
        Ongoing: "bg-purple-100 text-purple-800",
        Completed: "bg-gray-100 text-gray-800",
    };

    return (
        <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || "bg-gray-100"
                }`}
        >
            {status}
        </span>
    );
};

const CourseDetailsPage = ({ id }) => {

    const [updateStatusChange] = useCourseStatusChangeMutation();
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [classTime, setClassTime] = useState("");
    const [batchId, setBatchId] = useState("");
    const [deleteBatch] = useDeleteBatchMutation();
    const { data: batchData = [] } = useGetAllBatchByCourseIdQuery(id);
    const { data, isLoading } = useGetSingleCourseQuery(id);
    const course = data?.data || {};
    const [courseDetails, setCourseDetails] = useState({
        batchName: "",
        courseName: "",
    });

    useEffect(() => {
        if (course) {
            setCourseDetails({ courseName: course?.title });
        }
    }, [course]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isCourseEditDialogOpen, setIsCourseEditDialogOpen] = useState(false);
    const openCourseEditDialog = () => setIsCourseEditDialogOpen(true);
    const closeCourseEditDialog = () => setIsCourseEditDialogOpen(false);

    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);

    const openEditDialog = (batch) => {
        setSelectedBatch(batch);
        setIsEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setSelectedBatch(null);
        setIsEditDialogOpen(false);
    };

    const removeBatch = async (batchId) => {
        const isBatchDelete = confirm(
            "Are you sure you want to delete this Batch?"
        );
        if (isBatchDelete) {
            const response = await deleteBatch(batchId);
            if (response.data) {
                showToast("success", "Success", "Batch Delete successfully!");
            } else {
                showToast("error", "Error", response.error.data.message);
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="relative h-64 w-full">
                    <img
                        src={course.image || placeholderImage}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {course?.title}
                                </h1>
                                <p className="text-gray-200 mt-1">{course?.description}</p>
                            </div>
                            <button
                                onClick={async () => {
                                    const isStatusChange = confirm(
                                        "Do You Want to Change Course Status?"
                                    );
                                    if (isStatusChange) {
                                        const res = await updateStatusChange(course._id);
                                        if (res.data) {
                                            showToast(
                                                "success",
                                                "Success",
                                                "Course updated successfully!"
                                            );
                                        }
                                    }
                                }}
                                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all"
                            >
                                <StatusBadge status={course?.status} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="my-4 space-x-3">
                    {/* {course.routine ? (
            <a
              href={course.routine}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors shadow-sm"
            >
              <span>View Routine</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 text-blue-500 group-hover:text-blue-700 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </a>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              No Routine
            </span>
          )} */}
                    <div>
                        <div className="flex items-center space-x-3 my-4">
                            <div className="relative group flex">
                                <FiBook className="h-5 w-5 text-blue-500" />
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Course Type
                                </span>
                                <span className="ml-1 text-sm">{course.courseType}</span>
                            </div>
                            <div className="relative group flex">
                                <FiDollarSign className="h-5 w-5 text-green-500" />
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Payment Options
                                </span>
                                <span className="ml-1 text-sm">
                                    {course?.paymentType?.join(" / ")}
                                </span>
                            </div>
                        </div>
                    </div>

                    {course.syllabus ? (
                        <a
                            href={course.syllabus}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors shadow-sm"
                        >
                            <span>View Syllabus</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2 text-purple-500 group-hover:text-purple-700 transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </a>
                    ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-gray-100 text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            No Syllabus
                        </span>
                    )}
                </div>
                <div onClick={openCourseEditDialog}>Edit</div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Batch List Section */}
                <div className="lg:col-span-1 space-y-6 ">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                Course Batches
                            </h2>
                            <button
                                onClick={openDialog}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                + Add New Batch
                            </button>
                        </div>

                        <div
                            className={`${batchData?.data?.length > 0 && "h-[600px] overflow-y-auto "
                                }`}
                        >
                            {batchData?.data?.length > 0 ? (
                                <div className="space-y-4">
                                    {batchData?.data?.map((batch) => (
                                        <div
                                            key={batch._id}
                                            onClick={() => {
                                                setBatchId(batch._id);
                                                setClassTime(batch.class_time);
                                                setCourseDetails((prev) => ({
                                                    ...prev,
                                                    batchName: batch.name,
                                                }));
                                            }}
                                            className={`p-5 rounded-lg border transition-all cursor-pointer ${batchId === batch._id
                                                ? "border-blue-500 bg-blue-50 ring-1 ring-blue-200"
                                                : "border-gray-200 hover:border-blue-300"
                                                }`}
                                        >
                                            <div className="flex justify-between items-start ">
                                                <div>
                                                    <div className="flex items-center space-x-3">
                                                        <h3 className="text-lg font-semibold text-gray-800">
                                                            {batch.name}
                                                        </h3>
                                                        <StatusBadge status={batch.status} />
                                                    </div>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {batch.class_time}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openEditDialog(batch);
                                                        }}
                                                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                        title="Edit batch"
                                                    >
                                                        <PencilIcon />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            removeBatch(batch._id);
                                                        }}
                                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                        title="Delete batch"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div className="flex items-center space-x-2">
                                                    <CalendarIcon className="text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {new Date(batch.startDate).toLocaleDateString()} -{" "}
                                                        {new Date(batch.endDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <UsersIcon className="text-gray-400" />
                                                    <span className="text-sm text-gray-600">
                                                        {batch.availableSeats}/{batch.max_students} seats
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <ClockIcon className="text-gray-400" />
                                                    <span className="text-sm font-medium text-gray-600">
                                                        Class Days
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {batch.week_days.map((day) => (
                                                        <span
                                                            key={day}
                                                            className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                                                        >
                                                            {day}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {batch.status === "Upcoming" && (
                                                <div className="mt-4">
                                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full"
                                                            style={{
                                                                width: `${Math.min(
                                                                    5,
                                                                    calculateDaysRemaining(batch.startDate)
                                                                )}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Starts in {calculateDaysRemaining(batch.startDate)}{" "}
                                                        days
                                                    </p>
                                                </div>
                                            )}

                                            {batch.status === "Ongoing" && (
                                                <div className="mt-4">
                                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                                        <span>Progress</span>
                                                        <span>
                                                            {calculateProgress(
                                                                batch.startDate,
                                                                batch.endDate
                                                            )}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-green-500 rounded-full"
                                                            style={{
                                                                width: `${calculateProgress(
                                                                    batch.startDate,
                                                                    batch.endDate
                                                                )}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-gray-50 rounded-lg">
                                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        No batches yet
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Get started by creating your first batch
                                    </p>
                                    <button
                                        onClick={openDialog}
                                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Create Batch
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Schedule Management Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 top-6">
                    <ManageSchedule
                        classTime={classTime}
                        batchId={batchId}
                        courseId={id}
                        courseDetails={courseDetails}
                    />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6 top-6">
                    <ManageSyllabus courseId={course._id} />
                </div>
            </div>

            {/* Dialogs */}
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                title="Create New Batch"
                size="lg"
            >
                <CreateBatch courseId={id} onClose={closeDialog} />
            </Dialog>
            <Dialog
                isOpen={isCourseEditDialogOpen}
                onClose={closeCourseEditDialog}
                title="Edit Course"
                size="lg"
            >
                <EditCourse courseData={course} />
            </Dialog>

            <Dialog
                isOpen={isEditDialogOpen}
                onClose={closeEditDialog}
                title="Edit Batch"
                size="lg"
            >
                <EditBatch
                    batch={selectedBatch}
                    setBatch={setSelectedBatch}
                    onClose={closeEditDialog}
                />
            </Dialog>
        </div>
    );
};

export default CourseDetailsPage;
