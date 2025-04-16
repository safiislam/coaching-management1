"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import {
  FiCalendar,
  FiUsers,
  FiBook,
  FiAward,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

const TeacherDashboard = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const [activeTab, setActiveTab] = useState("performance");

  // Student engagement data
  const engagementData = [
    { week: "W1", participation: 65, assignments: 70, attendance: 85 },
    { week: "W2", participation: 72, assignments: 75, attendance: 88 },
    { week: "W3", participation: 80, assignments: 82, attendance: 90 },
    { week: "W4", participation: 78, assignments: 85, attendance: 92 },
    { week: "W5", participation: 85, assignments: 88, attendance: 94 },
  ];

  // Student skill assessment
  const skillData = [
    { subject: "Concept Understanding", score: 85 },
    { subject: "Problem Solving", score: 78 },
    { subject: "Critical Thinking", score: 82 },
    { subject: "Creativity", score: 75 },
    { subject: "Collaboration", score: 88 },
    { subject: "Communication", score: 80 },
  ];

  // Class distribution
  const classDistribution = [
    { name: "Advanced", students: 15 },
    { name: "Proficient", students: 35 },
    { name: "Developing", students: 25 },
    { name: "Beginning", students: 10 },
  ];

  // Upcoming deadlines
  const deadlines = [
    { task: "Grade Assignment 3", subject: "Mathematics", due: "Tomorrow" },
    { task: "Prepare Lesson Plan", subject: "Physics", due: "In 2 days" },
    { task: "Parent Meetings", subject: "All", due: "Friday" },
    { task: "Submit Reports", subject: "Administration", due: "Next Monday" },
  ];

  // Student progress comparison
  const progressData = Array(20)
    .fill(0)
    .map((_, i) => ({
      student: `S${i + 1}`,
      start: 50 + Math.random() * 30,
      current: 70 + Math.random() * 25,
    }));

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header with time controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor class performance and engagement
          </p>
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setTimeRange("weekly")}
            className={`px-3 py-1 rounded-md text-sm ${
              timeRange === "weekly"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange("monthly")}
            className={`px-3 py-1 rounded-md text-sm ${
              timeRange === "monthly"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange("quarterly")}
            className={`px-3 py-1 rounded-md text-sm ${
              timeRange === "quarterly"
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600"
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>

      {/* Summary Cards - Compact Version */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <FiUsers className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Students</p>
            <p className="font-bold text-lg">32</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-600">
            <FiBook className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Subjects</p>
            <p className="font-bold text-lg">4</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
            <FiAward className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Grade</p>
            <p className="font-bold text-lg">83%</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <FiClock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Attendance</p>
            <p className="font-bold text-lg">91%</p>
          </div>
        </div>
      </div>

      {/* Tabs for different views */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("performance")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "performance"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab("engagement")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "engagement"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Engagement
          </button>
          <button
            onClick={() => setActiveTab("progress")}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === "progress"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Student Progress
          </button>
        </div>

        <div className="p-6">
          {activeTab === "performance" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FiTrendingUp className="text-blue-500" />
                  Class Skill Assessment
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={skillData}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Class Average"
                        dataKey="score"
                        stroke="#4f46e5"
                        fill="#4f46e5"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Performance Distribution
                </h3>
                <div className="space-y-4">
                  {classDistribution.map((group, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{group.name}</span>
                        <span>{group.students} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(group.students / 85) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "engagement" && (
            <div className="h-96">
              <h3 className="text-lg font-semibold mb-4">
                Weekly Engagement Metrics
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={engagementData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="participation"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#93c5fd"
                    name="Participation %"
                  />
                  <Area
                    type="monotone"
                    dataKey="assignments"
                    stackId="2"
                    stroke="#10b981"
                    fill="#a7f3d0"
                    name="Assignments %"
                  />
                  <Area
                    type="monotone"
                    dataKey="attendance"
                    stackId="3"
                    stroke="#8b5cf6"
                    fill="#c4b5fd"
                    name="Attendance %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === "progress" && (
            <div className="space-y-6">
              <div className="h-96">
                <h3 className="text-lg font-semibold mb-4">
                  Student Progress Comparison
                </h3>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      type="number"
                      dataKey="start"
                      name="Start Grade"
                      domain={[40, 100]}
                      label={{ value: "Start Grade", position: "bottom" }}
                    />
                    <YAxis
                      type="number"
                      dataKey="current"
                      name="Current Grade"
                      domain={[50, 100]}
                      label={{
                        value: "Current Grade",
                        angle: -90,
                        position: "left",
                      }}
                    />
                    <ZAxis range={[60, 100]} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter
                      name="Students"
                      data={progressData}
                      fill="#3b82f6"
                      shape="circle"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FiCalendar className="text-amber-500" />
          Upcoming Deadlines
        </h3>
        <div className="space-y-3">
          {deadlines.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
            >
              <div>
                <p className="font-medium">{item.task}</p>
                <p className="text-sm text-gray-500">{item.subject}</p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                {item.due}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
