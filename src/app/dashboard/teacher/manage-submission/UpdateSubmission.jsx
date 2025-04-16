import Swal from "sweetalert2";
import { useUpdateSubmissionMutation } from "../../../../Redux/features/teacher/teacher.api";
import React, { useState } from "react";
import showToast from "../../../../utils/toast";

const UpdateSubmission = ({ submissionEditData }) => {
    const [updateSubmission] = useUpdateSubmissionMutation()
    // State to manage the score and feedback
    const [score, setScore] = useState(submissionEditData?.score || 0);
    const [feedback, setFeedback] = useState(submissionEditData?.feedback || "");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to update the submission (e.g., API call)
        console.log("Updated Submission:", { score, feedback });
        const payload = { score, feedback }
        Swal.fire({
            title: "Are you sure Submit ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await updateSubmission({ id: submissionEditData._id, data: payload });
                if (response.data) {
                    Swal.fire({
                        title: "Submission",
                        text: "Submission update successfully",
                        icon: "success",
                    });
                } else {
                    showToast("error", "Error", response.error.data.message);
                }
            }
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                {/* Score Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Score</label>
                    <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                        required
                    />
                </div>

                {/* Feedback Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Feedback
                    </label>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        placeholder="Enter feedback..."
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Update Submission
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSubmission;