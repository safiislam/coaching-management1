"use client";
import {
  ChevronDownIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import Pagination from "../../../../Components/Pagination";
import {
  useDeleteAgreementMutation,
  useGetAllAgreementsQuery,
  useUpdateAgreementMutation,
} from "../../../../Redux/features/Admin/admin.api";
import React, { useState } from "react";
import Dialog from "../../../../Components/Dialog";
import CreateAgreement from "../../../../Components/CreateAgreement";
import Link from "next/link";
import Swal from "sweetalert2";
import showToast from "../../../../utils/toast";

const Agreements = () => {
  const [deleteAgreement] = useDeleteAgreementMutation();
  const [updateAgreement] = useUpdateAgreementMutation();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const limit = 5; // Number of users per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: agreements,
    isLoading,
    isError,
  } = useGetAllAgreementsQuery([
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
  const { total } = agreements?.meta || {};

  const handleModalClose = () => setIsCreateDialogOpen(false);
  const handleModalOpen = () => setIsCreateDialogOpen(true);

  const removeAgreement = async (agreementId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteAgreement(agreementId);
        if (response.data) {
          Swal.fire({
            title: "Deleted!",
            text: "Agreement has been deleted.",
            icon: "success",
          });
        } else {
          showToast("error", "Error", response.error.data.message);
        }
      }
    });
  };

  const handleUpdateAgreementStatus = async (agreementId, value) => {
    try {
      const result = await updateAgreement({
        id: agreementId,
        data: { status: value },
      });
      if (result.data) {
        showToast(
          "success",
          "Success",
          "Agreement status updated successfully!"
        );
      }
    } catch (err) {
      showToast("error", "Error", response.error.data.message);
    }
  };
  return (
    <div className="p-6 bg-gray-100 w-full overflow-hidden min-h-screen">
      <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 sm:items-center">
        <h1 className="text-2xl font-bold mb-2 sm:mb-6">Teacher Agreements</h1>
        <button
          onClick={handleModalOpen}
          className="mb-2 sm:mb-6 px-4 py-2 flex w-fit items-center gap-1 bg-indigo-600 text-white rounded-md"
        >
          Create New Agreement{" "}
          <PlusCircleIcon className="size-5"></PlusCircleIcon>
        </button>
      </div>

      {/* Search Input Field */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by teacher name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="">
        <div className="overflow-x-auto ring-1  shadow-sm ring-black/5 sm:rounded-lg">
          <table className=" w-full divide-y divide-gray-300">
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
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Contact Number
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Batch Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Agreement Type
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Class Count
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {agreements?.data?.map((agreement, i) => (
                <tr key={i}>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                    {i + 1}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                    {agreement.teacherId?.name}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                    {agreement.teacherId?.email}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-500 sm:pl-6">
                    {agreement.teacherId?.contactNumber}
                  </td>
                  <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-500 sm:pl-6">
                    {agreement.batchId?.name}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {agreement.agreementType}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {agreement.amount}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    {agreement.classCount}
                  </td>
                  <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                    <span
                      className={`inline-flex items-center rounded-full bg- px-2 py-1 text-xs font-medium ${
                        agreement.status === "Active"
                          ? "bg-green-50 text-green-800 ring-green-600/20"
                          : "bg-red-50 text-red-800 ring-red-600/20"
                      } ring-1  ring-inset`}
                    >
                      {agreement.status}
                    </span>
                  </td>
                  <td className="relative py-4 pr-4 pl-3 text-right flex items-center gap-2 text-sm font-medium whitespace-nowrap sm:pr-6">
                    <div className="mt-2 grid grid-cols-1 border rounded">
                      <select
                        name="status"
                        onChange={(e) =>
                          handleUpdateAgreementStatus(
                            agreement._id,
                            e.target.value
                          )
                        }
                        value={agreement.status}
                        className="col-start-1  row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option value={"Active"}>Active</option>
                        <option value={"Ended"}>Ended</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                    <button onClick={() => removeAgreement(agreement._id)}>
                      <TrashIcon className="size-5 text-red-600"></TrashIcon>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        isOpen={isCreateDialogOpen}
        onClose={handleModalClose}
        title={"Create Agreement"}
      >
        <CreateAgreement></CreateAgreement>
      </Dialog>
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

export default Agreements;
