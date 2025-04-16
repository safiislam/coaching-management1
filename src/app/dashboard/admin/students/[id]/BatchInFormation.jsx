"use client";
import React, { useState } from "react";
import { useGetAllStudentDataQuery } from "../../../../../Redux/features/Admin/admin.api";
import { FaCalendarAlt, FaClock, FaBook, FaQuestionCircle, FaFileAlt } from "react-icons/fa";

const BatchInFormation = ({ studentId, batchId }) => {
    const { data, isLoading, error } = useGetAllStudentDataQuery(`${studentId}/${batchId}`, { skip: !batchId });

    const [activeTab, setActiveTab] = useState("payment");

    if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error loading data.</p>;

    const { payment = [], schedule = [], attendance = [], quiz = [], submission = [] } = data?.data || {};

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Tab Navigation */}
            <div className="flex border-b mb-4">
                {["payment", "schedule", "attendance", "quiz", "submission"].map((tab) => (
                    <button
                        key={tab}
                        className={`py-2 px-4 text-sm font-semibold focus:outline-none transition duration-300 ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600 hover:text-blue-500"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="mt-4">
                {/* Payment Tab */}
                {activeTab === "payment" && (
                    <div>
                        {payment.length > 0 ? (
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border p-2">Method</th>
                                        <th className="border p-2">Transaction ID</th>
                                        <th className="border p-2">Amount</th>
                                        <th className="border p-2">Status</th>
                                        <th className="border p-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payment.map((pay) => (
                                        <tr key={pay._id} className="text-center">
                                            <td className="border p-2">{pay.payment_method}</td>
                                            <td className="border p-2">{pay.transaction_id || "N/A"}</td>
                                            <td className="border p-2">${pay.amount}</td>
                                            <td className={`border p-2 ${pay.status === "paid" ? "text-green-500" : "text-red-500"}`}>
                                                {pay.status}
                                            </td>
                                            <td className="border p-2">{new Date(pay.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No payment records found.</p>
                        )}
                    </div>
                )}

                {/* Schedule Tab */}
                {activeTab === "schedule" && (
                    <div>
                        {schedule.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {schedule.map((sch) => (
                                    <div key={sch._id} className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
                                        <div className="flex items-center gap-2 text-blue-500 mb-2">
                                            <FaCalendarAlt />
                                            <span className="font-semibold text-gray-700">{new Date(sch.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <FaClock />
                                            <span className="text-gray-600">{sch.timeSlot}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700 mt-2">
                                            <FaBook />
                                            <span className="font-medium">{sch.subject}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No schedule records found.</p>
                        )}
                    </div>
                )}

                {/* Attendance Tab */}
                {activeTab === "attendance" && (
                    <div>
                        {attendance.length > 0 ? (
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border p-2">Date</th>
                                        <th className="border p-2">Time Slot</th>
                                        <th className="border p-2">Subject</th>
                                        <th className="border p-2">Attendance Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.map((att) => (
                                        <tr key={att.scheduleId._id} className="text-center">
                                            <td className="border p-2">{new Date(att.date).toLocaleDateString()}</td>
                                            <td className="border p-2">{att.scheduleId.timeSlot}</td>
                                            <td className="border p-2">{att.scheduleId.subject}</td>
                                            <td className={`border p-2 ${att.studentAttendance?.status === "Present" ? "text-green-500" : "text-red-500"}`}>
                                                {att.studentAttendance?.status || "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No attendance records found.</p>
                        )}
                    </div>
                )}
                {activeTab === "quiz" && (
                    <div>
                        {quiz.length > 0 ? (
                            quiz.map(q => (
                                <div key={q._id} className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
                                    <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2"><FaQuestionCircle /> {q.title}</h3>
                                    <p className="text-gray-600">{q.description}</p>
                                    <p className="text-gray-500">Duration: {q.duration} min | Total Marks: {q.totalMarks}</p>
                                    <p className="text-gray-600">Status: {q.status}</p>
                                    <p className="text-gray-600">Marks: {q.studentScores.score}</p>
                                </div>
                            ))
                        ) : <p className="text-gray-500">No quiz records found.</p>}
                    </div>
                )}

                {activeTab === "submission" && (
                    <div>
                        {submission.length > 0 ? (
                            submission.map(sub => (
                                <div key={sub._id} className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50">
                                    <h3 className="font-semibold text-lg text-gray-800 flex items-center gap-2"><FaFileAlt /> Submission</h3>
                                    <p className="text-gray-600">Score: {sub.score}</p>
                                    <p className="text-gray-600">Feedback: {sub.feedback}</p>
                                    <a href={sub.fileUrl} target="_blank" className="text-blue-500 underline">View Submission</a>
                                </div>
                            ))
                        ) : <p className="text-gray-500">No submissions found.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BatchInFormation;
