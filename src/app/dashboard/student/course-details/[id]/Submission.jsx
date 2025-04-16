import React, { useState } from "react";
import { useGetAllSubmissionOfStudentQuery } from "../../../../../Redux/features/Student/student.api";
import Dialog from "../../../../../Components/Dialog";

const Submission = ({ batchId }) => {
    const { data } = useGetAllSubmissionOfStudentQuery(batchId, { skip: !batchId });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [examData, setExamData] = useState(null);

    if (!data || !data.success) {
        return (
            <div className="flex justify-center items-center h-48">
                <p className="text-gray-500">No submissions found or an error occurred.</p>
            </div>
        );
    }
    console.log(examData);
    const submissions = data.data;

    const openDialog = (exam) => {
        setExamData(exam);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setExamData(null);
    };

    return (
        <div className="p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen overflow-auto">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Your Submissions</h1>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Exam Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    File URL
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Score
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Submission Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Feedback
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {submissions.map((submission) => (
                                <tr key={submission._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {submission.examId.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {submission.examId.subjectId.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                                        <a
                                            href={submission.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline"
                                        >
                                            View File
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {submission.score}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${submission.status === "submitted"
                                                ? "bg-blue-100 text-blue-800"
                                                : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {submission.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(submission.submissionDate).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        <button onClick={() => {
                                            openDialog({ feedback: submission.feedback })
                                        }} >View FeedBack</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                title="Feedback"
            >
                {examData && (
                    <div>
                        <div>
                            {
                                examData.feedback || 'No Feed Back'
                            }
                        </div>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default Submission;