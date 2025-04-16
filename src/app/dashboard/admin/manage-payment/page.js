"use client";
import Pagination from "../../../../Components/Pagination";
// const Pagination = dynamic(() => import("../../../../Components/Pagination"), {
//   ssr: false,
// });
import { useGetAllPaymentQuery } from "../../../../Redux/features/Admin/admin.api";
import { MdAdd } from "react-icons/md";
import React, { useState } from "react";
import Dialog from "../../../../Components/Dialog";
// import dynamic from "next/dynamic";
// const CreatePayment = dynamic(() => import("./CreatePayment"), {
//   ssr: false,
// });
import CreatePayment from "./CreatePayment";
import PaymentForm from "./PaymentForm";
// const PaymentForm = dynamic(() => import("./PaymentForm"), {
//   ssr: false,
// });

const ManagePayment = () => {
  const [payments, setPayment] = useState(null);
  console.log(payments);
  const limit = 20; // Number of payments per page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const {
    data: paymentData,
    isLoading,
    isError,
  } = useGetAllPaymentQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
    { name: "searchTerm", value: searchQuery },
  ]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const openEditDialog = () => setIsEditDialogOpen(true);
  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setPayment(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // Extract total number of payments for pagination
  const { total } = paymentData?.meta || {};

  // Handle status change

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Payment List</h1>

      {/* Search Input Field */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by transaction ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={openDialog}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <MdAdd size={20} />
          Create Payment
        </button>
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seen
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
            {paymentData?.data?.map((payment) => (
              <tr
                key={payment._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment?.enrollment_id?.batchId?.course_id.title +
                    `(${payment?.enrollment_id?.batchId?.name})`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.payment_method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.transaction_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${payment.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === "paid"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "unpaid"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.isSeen ? (
                    <span className="text-green-600">Seen</span>
                  ) : (
                    <span className="text-red-600">Unseen</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(payment.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="relative">
                    <button
                      // disabled={payment.status === "paid"}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none"
                      onClick={() => {
                        setPayment(payment);
                        openEditDialog();
                      }}
                    >
                      Actions
                    </button>
                    {/* <div
                      id={`dropdown-${payment._id}`}
                      className="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                    >
                      <ul className="py-1">
                        {["paid", "unpaid", "suspended"].map((status) => (
                          <li
                            key={status}
                            onClick={() => {
                              const dropdown = document.getElementById(
                                `dropdown-${payment._id}`
                              );
                              dropdown.classList.toggle("hidden");
                            }}
                          >
                            <button
                              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() =>
                                handleStatusChange(payment._id, status)
                              }
                            >
                              Mark as {status}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div> */}
                  </div>
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
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Create New Payment"
      >
        <CreatePayment />
      </Dialog>
      <Dialog
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        title="Payment Update"
      >
        <PaymentForm payment={payments} />
      </Dialog>
    </div>
  );
};

export default ManagePayment;
