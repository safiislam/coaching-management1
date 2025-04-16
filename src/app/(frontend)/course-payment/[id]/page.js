"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetSingleEnrollmentQuery,
  useCreatePaymentMutation,
} from "../../../../Redux/features/Student/student.api";
import Swal from "sweetalert2";
import showToast from "../../../../utils/toast";

const Payment = () => {
  const { id } = useParams();
  const { data: enrollmentData } = useGetSingleEnrollmentQuery(id, {
    skip: !id,
  });
  const [createPayment] = useCreatePaymentMutation();

  const [formData, setFormData] = useState({
    enrollment_id: id,
    payment_method: "",
    transaction_id: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.payment_method)
      newErrors.payment_method = "Payment method is required";
    if (!formData.transaction_id)
      newErrors.transaction_id = "Transaction ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Payment",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await createPayment(formData);
        if (response.data) {
          Swal.fire({
            title: "Payment",
            text: "Your Payment Successfully",
            icon: "success",
          });
        } else {
          showToast("error", "Error", response.error.data.message);
        }
      }
    });
  };

  return (
    <div className="mt-20 max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Make a Payment
      </h2>
      <p className="text-gray-600 text-sm text-center">
        Due Amount: <strong>${enrollmentData?.data?.due[1]}</strong>
      </p>
      <p className="text-gray-600 text-sm text-center mb-6">
        Number: <strong>+8801300000000</strong>
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Payment Method</option>
            <option value="bKash">bKash</option>
            <option value="Nagad">Nagad</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          {errors.payment_method && (
            <p className="text-red-500 text-sm mt-1">{errors.payment_method}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transaction ID
          </label>
          <input
            type="text"
            name="transaction_id"
            value={formData.transaction_id}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter transaction ID"
          />
          {errors.transaction_id && (
            <p className="text-red-500 text-sm mt-1">{errors.transaction_id}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Payment
        </button>
      </form>
      <p>
        Note:Please pay +8801300000000 this number By this Selection
        {enrollmentData?.data?.due[0] != "0" &&
          enrollmentData?.data?.due[1]}{" "}
      </p>
    </div>
  );
};

export default Payment;
