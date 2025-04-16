"use client";
import { useState } from "react";
import { FiDollarSign, FiBookOpen, FiChevronDown, FiX } from "react-icons/fi";
import Link from "next/link";
import { useGetAllCourseForUserQuery } from "../../Redux/features/Student/student.api";

const CourseSection = () => {
    const limit = 40;
    const [courseTypeFilter, setCourseTypeFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
    const [openStatusDropdown, setOpenStatusDropdown] = useState(false);

    const { data: courses } = useGetAllCourseForUserQuery([
        { name: "page", value: 1 },
        { name: "limit", value: limit },
    ]);

    const courseTypes = ["Class Based", "Topic Based"];
    const statuses = ["Upcoming", "Ongoing",];

    const getShortDescription = (text, wordLimit = 10) => {
        const words = text.split(" ");
        return words.length > wordLimit
            ? words.slice(0, wordLimit).join(" ") + "..."
            : text;
    };

    const filteredCourses = courses?.data?.result?.filter((course) => {
        const matchesType = courseTypeFilter
            ? course.courseType === courseTypeFilter
            : true;
        const matchesStatus = statusFilter ? course.status === statusFilter : true;
        return matchesType && matchesStatus;
    });

    const clearFilters = () => {
        setCourseTypeFilter(null);
        setStatusFilter(null);
    };

    return (
        <div className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900">Our Courses</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Explore a wide range of expert-led classes
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                    {/* Course Type Filter */}
                    <div className="relative w-full sm:w-64">
                        <button
                            onClick={() => setOpenTypeDropdown(!openTypeDropdown)}
                            className="w-full flex justify-between items-center px-4 py-2 border rounded-md bg-white shadow-sm text-sm text-gray-700"
                        >
                            {courseTypeFilter || "Filter by Course Type"}
                            <FiChevronDown
                                className={`ml-2 h-4 w-4 transition-transform ${openTypeDropdown ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        {openTypeDropdown && (
                            <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                                {courseTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            setCourseTypeFilter(type);
                                            setOpenTypeDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${courseTypeFilter === type ? "bg-blue-100" : ""
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-8">
                        {/* Status Filter */}
                        <div className="relative w-full sm:w-64">
                            <button
                                onClick={() => setOpenStatusDropdown(!openStatusDropdown)}
                                className="w-full flex justify-between items-center px-4 py-2 border rounded-md bg-white shadow-sm text-sm text-gray-700"
                            >
                                {statusFilter || "Filter by Status"}
                                <FiChevronDown
                                    className={`ml-2 h-4 w-4 transition-transform ${openStatusDropdown ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openStatusDropdown && (
                                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                                    {statuses.map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => {
                                                setStatusFilter(status);
                                                setOpenStatusDropdown(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${statusFilter === status ? "bg-green-100" : ""
                                                }`}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {/* Clear Filters */}

                        </div>
                        {(courseTypeFilter || statusFilter) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-red-500 hover:underline"
                            >
                                <FiX className="inline mr-1" /> Clear Filters
                            </button>
                        )}
                    </div>


                </div>

                {/* Course Cards */}
                {filteredCourses?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <div
                                key={course._id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 relative"
                            >
                                {/* Status Badge - Top Right */}
                                <div className="absolute top-3 right-3 z-0">
                                    <span
                                        className={`px-3 py-1 text-xs font-semibold rounded-full ${course.status === "Upcoming"
                                            ? "bg-blue-100 text-blue-800"
                                            : course.status === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        {course.status}
                                    </span>
                                </div>

                                {/* Image */}
                                <div className="h-40 w-full overflow-hidden rounded-md mb-4">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    {course.title}
                                </h3>

                                {/* Price */}
                                <div className="flex items-center text-yellow-500 text-sm mb-2">
                                    <FiDollarSign className="mr-1" />
                                    <span className="font-medium">{course.price}</span>
                                </div>

                                {/* Short Description */}
                                <p className="text-gray-600 text-sm mb-3">
                                    {getShortDescription(course.description)}
                                </p>

                                {/* Course Type */}
                                <span className="inline-block mb-4 px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                    {course.courseType}
                                </span>

                                {/* CTA */}
                                <div className="flex justify-end">
                                    <Link
                                        href={`/courses/${course._id}`}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
                                    >
                                        Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-md shadow-sm">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <FiBookOpen className="text-gray-400 w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            No courses found
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Try changing your filters or check back later.
                        </p>
                        {(courseTypeFilter || statusFilter) && (
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseSection;
