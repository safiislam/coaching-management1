"use client";
import Pagination from "../../../../Components/Pagination";
import { useGetAllStudentsQuery } from "../../../../Redux/features/Admin/admin.api";
import React, { useState } from "react";
import Link from "next/link";

const StudentPage = () => {
  const limit = 5; // Number of users per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: studentData,
    isLoading,
    isError,
  } = useGetAllStudentsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "searchTerm", value: searchQuery },
  ]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // Extract total number of students for pagination
  const { total } = studentData?.meta || {};

  return (
    <div className="p-6 bg-gray-100  overflow-hidden min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Student List</h1>

      {/* Search Input Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Student Grid */}
      <div className="">
        <div className="w-full overflow-x-auto ring-1 shadow-sm ring-black/5 sm:rounded-lg">
          <table className=" divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Sl
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Student ID
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Address
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Date of Birth
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Guardian Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Guardian Phone
                </th>
                <th
                  scope="col"
                  className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className=" bg-white divide-y divide-gray-200">
              {studentData?.data?.map((student, i) => (
                <tr key={student._id}>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {i + 1}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    <img
                      src={student.image}
                      height={50}
                      width={50}
                      alt={student.firstName}
                    />
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {student.email}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {student.studentId}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {student.phone}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {student.address}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {student.gender}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {student.guardianName}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    {student.guardianPhone}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium  text-gray-900 sm:pl-6">
                    <Link href={`/dashboard/admin/students/${student._id}`}>
                      {" "}
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <Pagination
          itemsPerPage={limit}
          totalItems={total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default StudentPage;
