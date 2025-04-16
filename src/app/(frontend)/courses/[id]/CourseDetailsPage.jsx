"use client"
import React, { useEffect, useRef, useState } from "react";
import { FiCalendar, FiClock, FiUsers, FiCheck } from "react-icons/fi";
import {
    useCreateEnrollMutation,
    useGetAllBatchByCourseIdQuery,
    useGetSingleCourseQuery,
} from "../../../../Redux/features/Admin/admin.api";
import { useGetMeQuery } from "../../../../Redux/features/Auth/auth.api";

import { useSelector } from "react-redux";
import CourseSyllabus from "@/Components/CourseSyllabus";
import showToast from "@/utils/toast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CourseDetailsPage = ({ id }) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);
    const { data: profileData } = useGetMeQuery(undefined, {
        skip: !token || !id,
    });
    const [enrollmentData, setEnrollmentData] = useState({
        batchId: "",
        studentId: "",
        paymentWay: "",
    });
    const [createEnrollment] = useCreateEnrollMutation();

    const { data } = useGetSingleCourseQuery(id, { skip: !id });
    const { data: batches } = useGetAllBatchByCourseIdQuery(id, { skip: !id });

    const course = data?.data || {};
    useEffect(() => {
        if (batches?.data && course?.paymentType) {
            setEnrollmentData((prev) => ({
                ...prev,
                studentId: profileData?.data?.studentId || "",
                batchId: batches.data[0]?._id || "",
                paymentWay: course.paymentType[0] || "",
            }));
        }
    }, [batches, course, profileData]);

    const batchRef = useRef();

    const handlePlace = () => {
        batchRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const handleAddEnrollment = async () => {
        if (!profileData?.data?.email) {
            showToast("error", "Error", "User Not Found Please Login");
            return;
        }
        Swal.fire({
            title: "Confirm Enrollment",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Enroll Now",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await createEnrollment(enrollmentData);
                console.log(response);
                if (response.data) {
                    showToast("success", "Success", "Enrolled");
                    router.push(`/course-payment/${response.data.data._id}`);
                } else {
                    showToast("error", "Error", response.error.data.message);
                }
            }
        });
    };
    return (
        <div className="bg-gray-50 min-h-screen mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Course Header */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    <div className="lg:w-2/3">
                        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-md">
                            <img
                                src={course?.image || "/placeholder-image.jpg"}
                                alt={course.title}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
                        </div>
                    </div>

                    <div className="lg:w-1/3 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {course.title}
                            </h1>
                            <div className="flex items-center mt-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {course.courseType}
                                </span>
                                <span className="ml-auto text-2xl font-bold text-blue-600">
                                    {course.price} ৳
                                </span>
                            </div>
                            <button
                                onClick={handlePlace}
                                className={`w-full py-2.5 px-4 text-white text-sm font-medium rounded-lg transition-colors
                    bg-blue-600 hover:bg-blue-700
                `}
                            >
                                Enroll Now
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="font-medium text-gray-900 mb-3">
                                Payment Options
                            </h3>
                            <ul className="space-y-2">
                                {course?.paymentType?.map((method, i) => (
                                    <li key={i} className="flex items-center">
                                        <FiCheck className="text-green-500 mr-2" />
                                        <span className="text-gray-700">{method}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Course Description */}
                <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Course Details
                    </h2>
                    <div className="prose max-w-none text-gray-600">
                        {course.description}
                    </div>
                </div>
                <span ref={batchRef} id="batch"></span>
                {/* Batch Selection Section */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Available Batches
                        </h2>
                        <span className="text-sm text-gray-500">
                            {batches?.data?.length || 0} options available
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {batches?.data?.map((batch) => (
                            <div
                                key={batch._id}
                                className={`border rounded-xl p-5 transition-all hover:shadow-md ${batch.status === "Upcoming"
                                    ? "border-blue-200"
                                    : batch.status === "Ongoing"
                                        ? "border-green-200"
                                        : "border-gray-200"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">
                                            {batch.name}
                                        </h3>
                                        <span
                                            className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${batch.status === "Upcoming"
                                                ? "bg-blue-100 text-blue-800"
                                                : batch.status === "Ongoing"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {batch.status}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-medium text-gray-900">
                                            {batch.availableSeats}/{batch.max_students}
                                        </div>
                                        <div className="text-xs text-gray-500">seats available</div>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <FiCalendar className="mr-3 text-gray-400" />
                                        <div>
                                            <div className="font-medium">Start Date</div>
                                            <div>
                                                {new Date(batch.startDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <FiClock className="mr-3 text-gray-400" />
                                        <div>
                                            <div className="font-medium">Class Time</div>
                                            <div>{batch.class_time}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <FiUsers className="mr-3 text-gray-400" />
                                        <div>
                                            <div className="font-medium">Class Days</div>
                                            <div>{batch.week_days.join(", ")}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Seats filled</span>
                                        <span>
                                            {Math.round(
                                                ((batch.max_students - batch.availableSeats) /
                                                    batch.max_students) *
                                                100
                                            )}
                                            %
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${batch.availableSeats / batch.max_students > 0.5
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                                }`}
                                            style={{
                                                width: `${((batch.max_students - batch.availableSeats) /
                                                    batch.max_students) *
                                                    100
                                                    }%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Payment Selection and Enroll Button */}
                                <div className="mt-5 space-y-3">
                                    <div className="relative">
                                        <label
                                            htmlFor={`payment-${batch._id}`}
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Payment Method
                                        </label>
                                        <select
                                            id={`payment-${batch._id}`}
                                            name="paymentWay"
                                            value={
                                                enrollmentData.batchId === batch._id
                                                    ? enrollmentData.paymentWay
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                setEnrollmentData({
                                                    studentId: profileData?.data?.studentId || "",
                                                    batchId: batch._id,
                                                    paymentWay: e.target.value,
                                                })
                                            }
                                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value="">Select payment method</option>
                                            {course?.paymentType?.map((method) => (
                                                <option key={method} value={method}>
                                                    {method}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        onClick={handleAddEnrollment}
                                        disabled={
                                            !(
                                                enrollmentData.batchId === batch._id &&
                                                enrollmentData.paymentWay
                                            )
                                        }
                                        className={`w-full py-2.5 px-4 text-white text-sm font-medium rounded-lg transition-colors ${enrollmentData.batchId === batch._id &&
                                            enrollmentData.paymentWay
                                            ? "bg-blue-600 hover:bg-blue-700"
                                            : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <CourseSyllabus courseId={course._id} />
        </div>
    );
};

export default CourseDetailsPage;