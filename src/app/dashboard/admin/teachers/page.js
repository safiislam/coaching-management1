"use client";
import Pagination from "../../../../Components/Pagination";
import { useGetAllTeachersQuery } from "../../../../Redux/features/Admin/admin.api";
import React, { useState } from "react";
import profileImage from "../../../.././../public/images/theme/profile-placeholder.png";
import Image from "next/image";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

const TeacherPage = () => {
  const limit = 5; // Number of users per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: teacherData,
    isLoading,
    isError,
  } = useGetAllTeachersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "searchTerm", value: searchQuery },
  ]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // Filter teachers based on the search query
  const { total } = teacherData?.meta || {};
  console.log(teacherData);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Teacher List</h1>

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

      {/* Teacher Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {teacherData?.data?.map((teacher) => (
          <div
            key={teacher?.email}
            className="relative col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow-sm"
          >
            <div className="flex flex-1 flex-col p-8">
              <Image
                className="mx-auto size-32 shrink-0  rounded-full mb-4"
                width={80}
                height={80}
                src={teacher.image || profileImage}
                alt={teacher.name}
              />

              <h3 className="mt-6 text-base font-semibold uppercase text-gray-900">
                {teacher?.name}
              </h3>
              <div className="mt-1 flex grow flex-col justify-between">
                <div className="text-start flex flex-col gap-2 mt-4">
                  <p className="text-sm text-gray-500 flex">
                    <span className="font-semibold flex-1"> Email:</span>{" "}
                    {teacher?.email}
                  </p>
                  <p className="text-sm text-gray-500 flex">
                    <span className="font-semibold flex-1"> Age:</span>{" "}
                    {teacher?.age}
                  </p>
                  <p className="text-sm text-gray-500 flex">
                    <span className="font-semibold flex-1">NID:</span>{" "}
                    {teacher?.nidNumber}
                  </p>
                  <p className="text-sm flex text-gray-500">
                    <span className="font-semibold flex-1"> Joined:</span>{" "}
                    {teacher?.joinDate}
                  </p>
                </div>
                <p className="mt-3 absolute top-0 right-4">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                    {teacher?.subject?.name}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${teacher?.email}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400"
                    />
                    Email
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`tel:${teacher?.contactNumber}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    <PhoneIcon
                      aria-hidden="true"
                      className="size-5 text-gray-400"
                    />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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

export default TeacherPage;
