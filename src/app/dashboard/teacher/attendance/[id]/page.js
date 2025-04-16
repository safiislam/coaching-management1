"use client";
import {
  useGetAllEnrolledCoursesStudentQuery,
  useCreateAttendanceMutation,
} from "../../../../../Redux/features/teacher/teacher.api";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import showToast from "../../../../../utils/toast";

const Attendance = () => {
  const { id } = useParams();
  const { data: studentData } = useGetAllEnrolledCoursesStudentQuery(id, {
    skip: !id,
  });
  const [createAttendance] = useCreateAttendanceMutation();
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Handle attendance status change
  const handleStatusChange = (studentId, isPresent) => {
    setAttendanceRecords((prevRecords) => {
      const existingRecordIndex = prevRecords.findIndex(
        (record) => record.studentId === studentId
      );

      if (existingRecordIndex !== -1) {
        // Update existing record
        const updatedRecords = [...prevRecords];
        updatedRecords[existingRecordIndex].status = isPresent
          ? "Present"
          : "Absent";
        return updatedRecords;
      } else {
        // Add new record
        return [
          ...prevRecords,
          { studentId, status: isPresent ? "Present" : "Absent" },
        ];
      }
    });
  };

  // Submit attendance
  const handleSubmit = async () => {
    try {
      const attendanceData = {
        scheduleId: id, // Use the schedule ID from the URL
        attendanceRecords,
      };
      Swal.fire({
        title: "Are you sure create Attendance ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Do it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await createAttendance(attendanceData);
          if (response.data) {
            Swal.fire({
              title: "Attendance",
              text: "Attendance create successfully",
              icon: "success",
            });
          } else {
            showToast("error", "Error", response.error.data.message);
          }
        }
      });
    } catch (error) {
      console.error("Failed to submit attendance:", error);
      alert("Failed to submit attendance. Please try again.");
    }
  };

  if (!studentData || !studentData.success) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500">
          No student data found or an error occurred.
        </p>
      </div>
    );
  }

  const students = studentData.data;

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen overflow-auto">
      <div className="max-w-4xl mx-auto overflow-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Attendance Management
        </h1>
        <div className="bg-white rounded-xl shadow-md overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-indigo-600 uppercase tracking-wider">
                  Present
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => {
                const studentAttendance = attendanceRecords.find(
                  (record) => record.studentId === student._id
                );
                const isPresent = studentAttendance
                  ? studentAttendance.status === "Present"
                  : false;

                return (
                  <tr
                    key={student._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <input
                        type="checkbox"
                        checked={isPresent}
                        onChange={(e) =>
                          handleStatusChange(student._id, e.target.checked)
                        }
                        className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
