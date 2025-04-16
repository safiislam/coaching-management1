"use client";
import showToast from "@/utils/toast";
import {
    useUpdatePaymentMutation,
} from "../../../../Redux/features/Admin/admin.api";
import React, { useState } from "react";

const PaymentForm = ({ payment }) => {
    const [updateStatus] = useUpdatePaymentMutation();
    const [formData, setFormData] = useState({
        amount: "",
        status: "unpaid", // Default status
    });

    const [errors, setErrors] = useState({
        amount: "",
        status: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear errors when user starts typing
        setErrors({
            ...errors,
            [name]: "",
        });

        // If status changes, update amount field requirement
        if (name === "status") {
            if (value === "paid") {
                setErrors((prev) => ({
                    ...prev,
                    amount: formData.amount ? "" : "Amount is required for paid status",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    amount: "",
                }));
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            amount: 0,
            status: "",
        };

        // Amount validation (required only if status is "paid")
        if (formData.status === "paid" && !formData.amount) {
            newErrors.amount = "Amount is required for paid status";
            isValid = false;
        }

        // Status validation
        if (!formData.status) {
            newErrors.status = "Status is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    const handleStatusChange = async (e) => {
        e.preventDefault()
        const isStatusChange = confirm("Do You want Status Changes");
        if (isStatusChange) {
            const response = await updateStatus({
                id: payment._id,
                data: { ...formData, amount: Number(formData.amount) },
            });
            if (response.error) {
                showToast("error", "Error", response.error.data.message);
                return;
            } else {
                showToast("success", "Success", "Updated successfully!");
            }
        }
    };


    return (
        <form onSubmit={handleStatusChange}>
            <div className="space-y-4">
                {/* Amount Input */}
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount
                    </label>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required={formData.status === "paid"} // Required only if status is "paid"
                    />
                    {errors.amount && (
                        <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                    )}
                </div>

                {/* Status Dropdown */}
                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="paid">paid</option>
                        <option value="unpaid">unpaid</option>
                        <option value="suspended">suspended</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Submit
            </button>
        </form>
    );
};

export default PaymentForm;