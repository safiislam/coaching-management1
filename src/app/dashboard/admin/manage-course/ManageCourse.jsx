"use client";

import { useState } from "react";
import {
    useGetAllCourseQuery,
    useDeleteACourseMutation,
} from "../../../../Redux/features/Admin/admin.api";
import Link from "next/link";
import { FaEye, FaTrash, FaBookOpen, FaTag } from "react-icons/fa";

import placeholderImage from "../../../.././../public/images/theme/placeholder-309.png";

const ManageCourse = () => {
    const { data: courseData = [] } = useGetAllCourseQuery();
    const [deleteCourse] = useDeleteACourseMutation();
    const [searchQuery, setSearchQuery] = useState("");
    console.log(
        "Running on:",
        typeof window !== "undefined" ? "client" : "server"
    );

    // Filter courses based on search query
    const filteredCourses = courseData?.data?.result?.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleCourse = async (course) => {
        if (confirm("Delete this course permanently?")) {
            const res = await deleteCourse(course._id);
            if (res.data && typeof window !== "undefined") {
                const iziToast = (await import("izitoast")).default;
                iziToast.success({
                    title: "Success",
                    message: "Course deleted successfully",
                    position: "topRight",
                });
            }
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header Section with Search on the Right */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 md:mt-0"
                />
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses?.map((course) => (
                    <div
                        key={course._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                    >
                        {/* Course Image with Status Badge */}
                        <div className="relative h-48 w-full">
                            <img
                                src={course.image || placeholderImage}
                                alt={course.title}
                                className="object-cover"
                            />
                            <div className="absolute top-3 right-3">
                                <span
                                    className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${course.status === "Ended"
                                        ? "bg-red-100 text-red-800"
                                        : course.status === "Upcoming"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-green-100 text-green-800"
                                        }`}
                                >
                                    {course.status}
                                </span>
                            </div>
                        </div>

                        {/* Course Content */}
                        <div className="p-5">
                            {/* Title and Price */}
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-bold text-gray-800">
                                    {course.title}
                                </h3>
                                <div className="flex items-center text-blue-600 font-semibold">
                                    <FaTag className="mr-1 text-gray-500" size={14} />$
                                    {course.price}
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {course.description}
                            </p>

                            {/* Quick Links */}
                            <div className="flex gap-2 mb-4">
                                {/* {course.routine && (
                  <a
                    href={course.routine}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-md hover:bg-blue-100"
                  >
                    <FaFileAlt size={12} className="mr-1" />
                    Routine
                  </a>
                )} */}
                                {course.syllabus && (
                                    <a
                                        href={course.syllabus}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-2.5 py-1 bg-purple-50 text-purple-600 text-xs rounded-md hover:bg-purple-100"
                                    >
                                        <FaBookOpen size={12} className="mr-1" />
                                        Syllabus
                                    </a>
                                )}
                            </div>

                            {/* Date Info */}
                            {/* <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" size={12} />
                  <span>{new Date(course.startDate).toLocaleDateString()}</span>
                </div>
                <span className="text-gray-300">—</span>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" size={12} />
                  <span>{new Date(course.endDate).toLocaleDateString()}</span>
                </div>
              </div> */}

                            {/* Action Buttons */}
                            <div className="mt-5 flex gap-3">
                                <Link
                                    href={`/dashboard/admin/course-details/${course._id}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                                >
                                    <FaEye size={14} />
                                    View
                                </Link>
                                <button
                                    onClick={() => {
                                        handleCourse(course);
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors"
                                >
                                    <FaTrash size={14} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCourse;
