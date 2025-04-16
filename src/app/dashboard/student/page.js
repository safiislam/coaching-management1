"use client";
import { useGetStudentMetaDataQuery } from "../../../Redux/features/Student/student.api";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const StudentDashboard = () => {
  const { data } = useGetStudentMetaDataQuery();

  // Colors for charts
  const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#FFC107"];

  // Format upcoming schedule data
  const upcomingClasses =
    data?.data?.upcomingSchedule?.map((item) => ({
      subject: item.subject,
      date: new Date(item.date).toLocaleDateString(),
      time: item.timeSlot,
      teacher: item.teacherId,
      batchId: item.batchId, // You might want to fetch teacher names
    })) || [];

  // Attendance data for pie chart
  const attendanceData = [
    { name: "Present", value: data?.data?.presentPercentage || 0 },
    { name: "Absent", value: data?.data?.absentPercentage || 0 },
  ];

  // Exam data for pie chart
  const examData = [
    { name: "Completed", value: data?.data?.totalExamDone || 0 },
    { name: "Pending", value: data?.data?.totalExamPending || 0 },
  ];

  // Performance data (dummy - you might want to fetch real performance data)
  const performanceData = [
    { month: "Jan", score: 78 },
    { month: "Feb", score: 80 },
    { month: "Mar", score: 85 },
    { month: "Apr", score: 88 },
    { month: "May", score: 92 },
    { month: "Jun", score: 90 },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Attendance Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Attendance</h3>
              <p className="text-2xl font-bold text-gray-800">
                {data?.data?.presentPercentage || 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Exams Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Exams Completed
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {data?.data?.totalExamDone || 0}/
                {data?.data?.totalExamPending + data?.data?.totalExamDone || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Batch Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">Batch</h3>
              <p className="text-xl font-bold text-gray-800">
                {data?.data?.upcomingSchedule?.[0]?.batchId?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                {data?.data?.upcomingSchedule?.[0]?.batchId?.course_id?.title ||
                  ""}
              </p>
            </div>
          </div>
        </div>

        {/* Classes Card */}
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-yellow-50 text-yellow-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-medium">
                Upcoming Classes
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {data?.data?.upcomingSchedule?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Performance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Academic Performance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#4CAF50"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Score (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Attendance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {attendanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Percentage"]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Upcoming Classes
          </h3>
          <div className="space-y-4">
            {upcomingClasses.length > 0 ? (
              upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0 p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-gray-800">{cls.subject}</h4>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span>{cls.date}</span>
                      <span className="mx-2">•</span>
                      <span>{cls.time}</span>
                    </div>
                    <span className="block text-sm text-gray-500">
                      {cls.batchId?.course_id?.title}
                      {`(${cls?.batchId?.name})`}
                    </span>
                  </div>
                  <div className="text-sm  text-gray-500">
                    {/* Teacher name would go here */}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No upcoming classes scheduled
              </p>
            )}
          </div>
        </div>

        {/* Exam Progress */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Exam Progress
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={examData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {examData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip
                  formatter={(value) => [`${value}`, "Exams"]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
