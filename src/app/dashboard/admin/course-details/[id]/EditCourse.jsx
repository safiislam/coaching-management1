"use client";
import { useUpdateCourseFromDBMutation } from "../../../../../Redux/features/Admin/admin.api";
import { useState } from "react";
import { FiUpload, FiDollarSign, FiCalendar, FiBook, FiClock } from "react-icons/fi";
import Swal from "sweetalert2";


const EditCourse = ({ courseData }) => {

    const [updateCourse] = useUpdateCourseFromDBMutation()
    const [formData, setFormData] = useState({
        title: courseData?.title || "",
        image: courseData?.image || "",
        syllabus: courseData?.syllabus || "",
        description: courseData?.description || "",
        courseType: courseData?.courseType || "Class Based",
        paymentType: courseData?.paymentType || [],
        price: courseData?.price || 0,
        status: courseData?.status || "Upcoming"
    });

    const [imagePreview, setImagePreview] = useState(courseData?.image || null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePaymentTypeChange = (type) => {
        setFormData(prev => {
            const newPaymentTypes = prev.paymentType.includes(type)
                ? prev.paymentType.filter(t => t !== type)
                : [...prev.paymentType, type];
            return { ...prev, paymentType: newPaymentTypes };
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handelUpdate = () => {
        console.log(formData);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await updateCourse({ id: courseData._id, payload: formData });
                if (response.data) {
                    showToast("success", "Success", "Your Course update Successfully");
                } else {
                    showToast("error", "Error", response.error.data.message);
                }
            }
        });
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Course Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Course Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Image *</label>
                        <div className="flex items-center space-x-4">
                            <div className="relative h-32 w-32 rounded-md overflow-hidden bg-gray-100">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Course preview" className="h-full w-full object-cover" />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center text-gray-400">
                                        <FiUpload className="h-8 w-8" />
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer">
                                <span className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Upload
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="sr-only"
                                />
                            </label>
                        </div>
                    </div>

                    {/* Syllabus Link */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Syllabus Link *</label>
                        <input
                            type="url"
                            name="syllabus"
                            value={formData.syllabus}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Course Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Type *</label>
                        <select
                            name="courseType"
                            value={formData.courseType}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Class Based">Class Based</option>
                            <option value="Topic Based">Topic Based</option>
                        </select>
                    </div>

                    {/* Payment Types */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Options *</label>
                        <div className="space-y-2">
                            {["One Time", "Monthly", "3 Monthly", "Half yearly"].map((type) => (
                                <div key={type} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`payment-${type}`}
                                        checked={formData.paymentType.includes(type)}
                                        onChange={() => handlePaymentTypeChange(type)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`payment-${type}`} className="ml-2 text-sm text-gray-700">
                                        {type}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiDollarSign className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Upcoming">Upcoming</option>
                            <option value="Ongoing">Ongoing</option>
                            <option value="Ended">Ended</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-3">
                <button
                    type="submit"
                    onClick={handelUpdate}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditCourse;