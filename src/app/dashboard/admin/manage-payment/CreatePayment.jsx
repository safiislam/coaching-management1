"use client"
import showToast from "@/utils/toast";
import { useGetAllEnrollmentQuery, useCreatePaymentMutation } from "../../../../Redux/features/Admin/admin.api";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const CreatePayment = () => {
    const [payment, { isLoading: paymentLoading }] = useCreatePaymentMutation()
    const limit = 40; // Number of enrollments per page
    const [paymentData, setPaymentData] = useState({
        enrollment_id: '',
        amount: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
    const studentDropdownRef = useRef(null);

    const {
        data: enrollmentData,
        isLoading: isEnrollmentDataLoading,
        isError,
    } = useGetAllEnrollmentQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: limit },
        { name: "searchTerm", value: searchQuery },
    ]);

    const handleStudentSearch = (e) => {
        setSearchQuery(e.target.value);
        setIsStudentDropdownOpen(true);
    };

    const handleStudentSelect = (enrollment_id) => {
        setPaymentData((prev) => ({ ...prev, enrollment_id }));
        setIsStudentDropdownOpen(false);
    };
    const handelPayment = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, pay it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await payment({ ...paymentData, amount: Number(paymentData.amount) });
                if (response.data) {
                    Swal.fire({
                        title: "Payment",
                        text: "Payment is Success",
                        icon: "success",
                    });
                } else {
                    showToast("error", "Error", response.error.data.message);
                }
            }
        });
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Student Search and Dropdown */}
            <div className="mb-6" ref={studentDropdownRef}>
                <label className="block text-sm font-bold text-gray-700 mb-2">Student ID</label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by Student ID..."
                        value={searchQuery}
                        onChange={handleStudentSearch}
                        onFocus={() => setIsStudentDropdownOpen(true)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {isStudentDropdownOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {isEnrollmentDataLoading ? (
                                <div className="px-4 py-2 text-gray-500">Loading...</div>
                            ) : isError ? (
                                <div className="px-4 py-2 text-red-500">Error loading Enrollment Data</div>
                            ) : enrollmentData?.data?.length === 0 ? (
                                <div className="px-4 py-2 text-gray-500">No Enrollment found</div>
                            ) : (
                                enrollmentData?.data?.map((enrollment) => (
                                    <div
                                        key={enrollment._id}
                                        onClick={() => handleStudentSelect(enrollment._id)}
                                        className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
                                    >
                                        <div className="flex justify-between items-center">
                                            {/* Student ID and Course Info */}
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-800">
                                                    {enrollment.studentId}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {enrollment?.batchId?.course_id?.title} ({enrollment?.batchId?.name})
                                                </p>
                                            </div>

                                            {/* Due Month and Amount */}
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-gray-800">
                                                    Month: {enrollment.due[1] === 0 ? 0 : enrollment.due[0]}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Monthly Pay: {enrollment.due[1]}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Total Due: {enrollment.due[1] * enrollment.due[0]}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                {paymentData.enrollment_id && (
                    <div className="mt-2 text-sm text-gray-700">
                        Selected Student ID: <span className="font-medium">{paymentData.enrollment_id}</span>
                    </div>
                )}
            </div>

            {/* Payment Amount Input */}
            <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Payment Amount</label>
                <input
                    type="text"
                    name="payment"
                    id="payment"
                    placeholder="Enter amount"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData((prev) => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="button"
                    disabled={paymentLoading}
                    onClick={handelPayment}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {paymentLoading ? "loading.." : 'Create Payment'}
                </button>
            </div>
        </div>
    );
};

export default CreatePayment;