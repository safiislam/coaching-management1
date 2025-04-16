"use client";
import React, { useState } from "react";
import { useCreateSubmissionOfStudentMutation } from "../../../../../Redux/features/Student/student.api";
import Swal from "sweetalert2";
import showToast from "../../../../../utils/toast";

const CreateSubmission = ({ examId }) => {
    const [createSubmission, { isLoading }] = useCreateSubmissionOfStudentMutation();
    const [formData, setFormData] = useState({
        fileUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submissionData = {
                examId,
                ...formData,
            };
            Swal.fire({
                title: "Are you sure Exam Submit ?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Do it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await createSubmission(submissionData);
                    if (response.data) {
                        Swal.fire({
                            title: "Exam",
                            text: "Exam Submit successfully",
                            icon: "success",
                        });
                    } else {
                        showToast("error", "Error", response.error.data.message);
                    }
                }
            });
        } catch (error) {
            console.error("Failed to create submission:", error);
            alert("Failed to create submission. Please try again.");
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Create Submission</h1>
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8">
                    {/* File URL Input */}
                    <div className="mb-6">
                        <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                            File URL
                        </label>
                        <input
                            type="url"
                            id="fileUrl"
                            name="fileUrl"
                            value={formData.fileUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter file URL"
                            pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateSubmission;