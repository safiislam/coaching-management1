import React, { useState } from 'react';
import { useGetAllExamOfStudentQuery } from "../../../../../Redux/features/Student/student.api";
import Dialog from '../../../../../Components/Dialog';
import Link from 'next/link';

const Exam = ({ batchId }) => {
    const { data } = useGetAllExamOfStudentQuery(batchId, { skip: !batchId });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [examData, setExamData] = useState(null);

    if (!data || !data.success) {
        return (
            <div className="flex justify-center items-center h-48">
                <p className="text-gray-500">No exams found or an error occurred.</p>
            </div>
        );
    }

    const exams = data.data;

    const openDialog = (exam) => {
        setExamData(exam);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setExamData(null);
    };

    // Function to extract the first link from the description
    const extractLink = (description) => {
        const urlRegex = /https?:\/\/[^\s]+/g;
        const matches = description?.match(urlRegex);
        return matches ? matches[0] : null; // Return the first link found (or null if none)
    };

    return (
        <div className="p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Your Upcoming Exams</h1>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Deadline
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Max Score
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Exam Done
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {exams.map((exam) => (
                                <tr key={exam._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {exam.title}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {exam.subjectId.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(exam.dateline).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {exam.time ? exam.time + " " + "min" : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {exam.maxScore}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`font-semibold ${exam.isExamDone ? 'text-green-600' : 'text-red-600'}`}>
                                            {exam.isExamDone ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">

                                        <div>
                                            {
                                                exam?.description && <Link href={`/dashboard/student/exam/${exam._id}`} >Exam</Link>
                                            }
                                        </div>

                                        {/* <button
                                            onClick={() => openDialog(exam)}
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            Details
                                        </button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Dialog for Exam Details */}
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                title="Exam Details"
            >
                {examData && (
                    <div>
                        <p className="text-gray-700 mb-4">{examData.description}</p>
                        {extractLink(examData.description) ? (
                            <a
                                href={extractLink(examData.description)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline hover:text-blue-800"
                            >
                                Open Link
                            </a>
                        ) : (
                            <p className="text-gray-500">No link found in the description.</p>
                        )}

                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default Exam;