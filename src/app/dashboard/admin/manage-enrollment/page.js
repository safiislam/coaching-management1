"use client";
import Pagination from "../../../../Components/Pagination";
import {
  useGetAllEnrollmentQuery,
  useCreateEnrollMutation,
  useDeleteAEnrollmentMutation,
} from "../../../../Redux/features/Admin/admin.api";
import React, { useState } from "react";
import { MdEdit, MdDelete, MdAdd, MdPayment } from "react-icons/md";
import CreateEnrollment from "./CreateEnrollment";
import Swal from "sweetalert2";
import showToast from "../../../../utils/toast";

const ManageEnrollment = () => {
  const limit = 40; // Number of enrollments per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [enrollment] = useCreateEnrollMutation();
  const [deleteAEnrollment] = useDeleteAEnrollmentMutation();

  const {
    data: enrollmentData,
    isLoading,
    isError,
  } = useGetAllEnrollmentQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "searchTerm", value: searchQuery },
  ]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const openEditModal = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setIsEditModalOpen(true);
  };

  const openPaymentModal = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setIsPaymentModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsPaymentModalOpen(false);
    setSelectedEnrollment(null);
  };

  const handleCreate = async (formData) => {
    console.log("Creating enrollment:", formData);
    // Add your API call or state update logic here
    const response = await enrollment(formData);
    if (response.error) {
      showToast(
        "error",
        "Enrollment Creation Failed",
        response.error.data.message
      );
      return;
    }

    showToast("success", "Success", "Enrollment created successfully!");
    // closeModal();
  };

  const handleEdit = (formData) => {
    console.log("Editing enrollment:", formData);
    // Add your API call or state update logic here
    closeModal();
  };

  const handleDelete = async (enrollmentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteAEnrollment(enrollmentId);
        if (response.data) {
          Swal.fire({
            title: "Payment",
            text: "Your Payment Successfully",
            icon: "success",
          });
        } else {
          showToast(
            "error",
            "Enrollment Deletion Failed",
            response.error.data.message
          );
        }
      }
    });
  };

  const handleAddPayment = (paymentData) => {
    console.log("Adding payment:", paymentData);
    // Add your API call or state update logic here
    closeModal();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // Extract total number of enrollments for pagination
  const { total } = enrollmentData?.meta || {};

  console.log(enrollmentData);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Manage Enrollment</h1>

      {/* Search and Create Button */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by student ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={openCreateModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <MdAdd size={20} />
          Create Enrollment
        </button>
      </div>

      {/* Enrollment Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Enrollment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Way
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enrollmentData?.data?.map((enrollment) => (
              <tr
                key={enrollment._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enrollment.studentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {`${enrollment?.batchId?.course_id?.title}(${enrollment?.batchId?.name})`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      enrollment.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {enrollment.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enrollment.paymentWay}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {Number(enrollment.due[0]) * Number(enrollment.due[1]) || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(enrollment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(enrollment.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(enrollment)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(enrollment._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={20} />
                  </button>
                  <button
                    onClick={() => openPaymentModal(enrollment)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <MdPayment size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {/* Create Enrollment Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Enrollment</h2>
            <CreateEnrollment
              handleCreate={handleCreate}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}

      {/* Edit Enrollment Modal */}
      {isEditModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Enrollment</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleEdit(Object.fromEntries(formData));
              }}
            >
              <div className="space-y-4">
                <input
                  type="text"
                  name="studentId"
                  defaultValue={selectedEnrollment.studentId}
                  placeholder="Student ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="batchId"
                  defaultValue={selectedEnrollment.batchId}
                  placeholder="Batch ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="paymentStatus"
                  defaultValue={selectedEnrollment.paymentStatus}
                  placeholder="Payment Status"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="paymentWay"
                  defaultValue={selectedEnrollment.paymentWay}
                  placeholder="Payment Way"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  name="due"
                  defaultValue={selectedEnrollment.due.join(", ")}
                  placeholder="Due"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Payment Modal */}
      {isPaymentModalOpen && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Payment</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleAddPayment(Object.fromEntries(formData));
              }}
            >
              <div className="mt-6 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Add Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEnrollment;
