"use client";

import Dialog from "../../../../Components/Dialog";
// import { useGetMeQuery } from "../../../../Redux/features/Auth/auth.api";
import { useGetAllPaymentForStudentQuery } from "../../../../Redux/features/Student/student.api";
import React, { useState } from "react";
import CreatePayment from "./CreatePayment";

const TransactionsPage = () => {
  const { data: paymentData } = useGetAllPaymentForStudentQuery();
  // const { data: getMe } = useGetMeQuery();
  // console.log(getMe);
  // const { data: enrollmentData } = useGetAStudentEnrollmentQuery(
  //   getMe?.data?.studentId,
  //   { skip: !getMe?.data?.studentId }
  // );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="min-h-screen w-full bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 overflow-x-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
          Payment Transactions
        </h1>
        <div
          onClick={openDialog}
          className="flex justify-end my-2 cursor-pointer"
        >
          {" "}
          + Add Transaction
        </div>
        {paymentData?.success && paymentData?.data?.length > 0 ? (
          <div className="bg-white shadow overflow-x-auto rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Course Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Batch Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Payment Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Transaction ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentData.data.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.enrollment_id.batchId.course_id.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.enrollment_id.batchId.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.payment_method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.transaction_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            No transactions found.
          </div>
        )}
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Add Transaction"
        size="lg"
      >
        <CreatePayment />
      </Dialog>
    </div>
  );
};

export default TransactionsPage;
