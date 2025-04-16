"use client";
import { uploadImage } from "../../../../utils/cloudinary";
import { useCreateAdmissionDBMutation } from "../../../../Redux/features/Admin/admin.api";
import { useState } from "react";
import showToast from "../../../../utils/toast";

const CreateAdmission = () => {
  const [admission, { isLoading }] = useCreateAdmissionDBMutation();
  // State for student data
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
  });
  // State for validation errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
  });

  // Handle input changes for course data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate course data
    const newErrors = {
      firstName: !studentData.firstName ? "First name is required" : "",
      lastName: !studentData.lastName ? "Last name is required" : "",
      email: !studentData.email ? "Email is required" : "",
      phone: !studentData.phone ? "Phone number is required" : "",
      address: !studentData.address ? "Address is required" : "",
      dateOfBirth: !studentData.dateOfBirth ? "Date of birth is required" : "",
      guardianName: !studentData.guardianName
        ? "Guardian name is required"
        : "",
      guardianPhone: !studentData.guardianPhone
        ? "Guardian phone number is required"
        : "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      // Send the payload to the backend API
      const imageFile = e.target.image.files[0];
      const imageLink = await uploadImage(imageFile);
      const payload = {
        ...studentData,
        image: imageLink,
      };
      console.log(payload);
      const response = await admission(payload);
      if (response.error) {
        showToast("error", "Error", response.error.data.message);
        return;
      }

      // Reset the form after successful submission
      setStudentData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        paymentWay: "",
        dateOfBirth: "",
        gender: "",
        guardianName: "",
        guardianPhone: "",
      });
      showToast("success", "Success", "Course Created successfully!");
    } catch (error) {
      console.error("Error creating course:", error);
      showToast("error", "Error", response.error.data.message);
    }
  };
  return (
    <div className="min-h-screen p-6">
      <div className="md:max-w-7xl mx-auto bg-white border p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 ">
          Student Admission{" "}
          <span className="text-xs px-[3px] -mt-44 bg-blue-500 text-white rounded-full">
            ?
          </span>
        </h1>
        {/* Course Form */}
        <form onSubmit={handleSubmit}>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* First name */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={studentData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={studentData.lastName}
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter your last name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>
              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  value={studentData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="Enter your email address..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>
              {/* Phone number */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={studentData.phone}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your phone number..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>
              {/* Address */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Address
                </label>
                <input
                  name="address"
                  value={studentData.address}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter your address..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  name="dateOfBirth"
                  value={studentData.dateOfBirth}
                  onChange={handleInputChange}
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
              {/* Gender */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Gender
                </label>
                <div className="flex gap-4">
                  {["Male", "Female", "Other"].map((gender) => (
                    <label key={gender} className="flex items-center gap-2">
                      <input
                        name="gender"
                        value={gender}
                        onChange={handleInputChange}
                        type="radio"
                        className="focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
                {errors.gender && (
                  <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
                )}
              </div>
              {/* Guardian Name */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Guardian Name
                </label>
                <input
                  name="guardianName"
                  value={studentData.guardianName}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.guardianName && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.guardianName}
                  </p>
                )}
              </div>
              {/* Guardian Phone */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Guardian Phone
                </label>
                <input
                  name="guardianPhone"
                  value={studentData.guardianPhone}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.guardianPhone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.guardianPhone}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Image
                </label>
                <input
                  name="image"
                  value={studentData.image}
                  onChange={handleInputChange}
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.guardianPhone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.guardianPhone}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className=" bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isLoading ? "loading.." : "Admit"}
            </button>
          </div>
          {/* Submit Button */}
        </form>
      </div>
    </div>
  );
};

export default CreateAdmission;
