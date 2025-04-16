import { useState } from "react";
import { useGetMeQuery } from "../../../../Redux/features/Auth/auth.api";
import { useGetAStudentEnrollmentQuery, useCreatePaymentMutation } from "../../../../Redux/features/Student/student.api";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import CourseCardLoader from "../../../../Components/CourseCardLoader";
import Swal from "sweetalert2";
import { FaSpider } from "react-icons/fa";
import showToast from "../../../../utils/toast";

const CreatePayment = () => {
    const { data: getMe, isLoading: loadingProfile } = useGetMeQuery();
    const { data: enrollmentData, isLoading: loadingEnrollments } = useGetAStudentEnrollmentQuery(
        getMe?.data?.studentId,
        { skip: !getMe?.data?.studentId }
    );
    const [payment, setPayment] = useState(null)
    console.log(payment);
    const [formData, setFormData] = useState({
        enrollment_id: "",
        payment_method: "",
        transaction_id: "",
    });

    const [errors, setErrors] = useState({
        enrollment_id: "",
        payment_method: "",
        transaction_id: "",
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            enrollment_id: "",
            payment_method: "",
            transaction_id: "",
        };

        if (!formData.enrollment_id) {
            newErrors.enrollment_id = "Please select an enrollment";
            valid = false;
        }

        if (!formData.payment_method) {
            newErrors.payment_method = "Payment method is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const [createPayment, { isLoading }] = useCreatePaymentMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
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

        } catch (error) {
            console.error("Payment submission failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingProfile || loadingEnrollments) {
        return (
            < CourseCardLoader />
        );
    }

    return (
        <div className=" mx-auto bg-white rounded-xl shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Enrollment
                    </label>
                    <select
                        name="enrollment_id"
                        value={formData.enrollment_id}
                        onChange={(e) => {
                            handleInputChange(e);
                            // Find the selected enrollment and set payment data
                            const selectedEnrollment = enrollmentData?.data?.find(
                                (enroll) => enroll._id === e.target.value
                            );
                            if (selectedEnrollment) {
                                setPayment(selectedEnrollment);
                            }
                        }}
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.enrollment_id ? "border-red-300" : "border-gray-300"
                            }`}
                    >
                        <option value="">Select an Enrollment</option>
                        {enrollmentData?.data?.map((enroll) => (
                            <option key={enroll._id} value={enroll._id}>
                                {`${enroll.batchId.course_id?.title} (${enroll.batchId.name})`}
                            </option>
                        ))}
                    </select>
                    {errors.enrollment_id && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                            {errors.enrollment_id}
                        </p>
                    )}
                </div>

                {/* <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (BDT)
                    </label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Enter amount"
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.amount ? "border-red-300" : "border-gray-300"
                            }`}
                    />
                    {errors.amount && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                            {errors.amount}
                        </p>
                    )}
                </div> */}

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Payment Method
                    </label>
                    <select
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.payment_method ? "border-red-300" : "border-gray-300"
                            }`}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="bKash">bKash</option>
                        <option value="Nagad">Nagad</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                    {errors.payment_method && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                            {errors.payment_method}
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction ID
                        {payment && <span className="float-end">payment:${Number(payment?.due[1]) / Number(payment?.due[0])}</span>}
                    </label>
                    <input
                        type="text"
                        name="transaction_id"
                        value={formData.transaction_id}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.transaction_id ? "border-red-300" : "border-gray-300"
                            }`}
                        placeholder="Enter transaction ID"
                    />
                    {errors.transaction_id && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                            <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                            {errors.transaction_id}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ${submitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                >
                    Payment
                </button>
            </form>
            <p>
                Note:Please pay +8801300000000 this number By this Selection
                {payment?.due[0] != "0" &&
                    payment?.due[1]}{" "}
            </p>
        </div>
    );
};

export default CreatePayment;