"use client";
import { useGetAllMetaDataQuery } from "../../../Redux/features/Admin/admin.api";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminPage = () => {
  const [year, setYear] = useState("");
  const { data } = useGetAllMetaDataQuery([{ name: "year", value: year }]);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
        Loading...
      </div>
    );

  const { totalCourse, totalStudent, totalSubject, totalTeacher, earing } =
    data.data;

  // List of all months to ensure every month is displayed
  const allMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = Array.from({ length: 10 }, (_, index) => {
    return new Date().getFullYear() - index;
  });

  // Map existing earnings data for easy lookup
  const earningsMap = new Map(earing.map((item) => [item.month, item]));

  // Create a complete dataset ensuring every month is represented
  const chartData = allMonths.map((month) => ({
    month,
    totalPayments: earningsMap.get(month)?.totalPayments || 0,
    totalAmount: earningsMap.get(month)?.totalAmount || 0,
  }));

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Admin Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { title: "Total Courses", value: totalCourse, color: "bg-blue-500" },
          {
            title: "Total Students",
            value: totalStudent,
            color: "bg-green-500",
          },
          {
            title: "Total Subjects",
            value: totalSubject,
            color: "bg-yellow-500",
          },
          { title: "Total Teachers", value: totalTeacher, color: "bg-red-500" },
        ].map((item, index) => (
          <div
            key={index}
            className={`${item.color} text-white p-5 rounded-lg shadow-lg text-center`}
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex  items-center justify-between">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Monthly Earnings
          </h3>
          <div className="relative">
            <select
              onChange={(e) => setYear(e.target.value)}
              className="block w-full px-4 py-2.5 pr-8 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {date.map((item) => (
                <option key={item} value={item} className="py-2 text-gray-700">
                  {item}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalAmount" fill="#4CAF50" name="Earnings" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminPage;
