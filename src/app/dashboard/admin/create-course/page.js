"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useCreateCourseFromDBMutation } from "../../../../Redux/features/Admin/admin.api";
import { uploadImage } from "../../../../utils/cloudinary";
import showToast from "../../../../utils/toast";

const CreateCourse = () => {
  const [createCourse] = useCreateCourseFromDBMutation();
  const [isLoading, setIsLoading] = useState(false);

  // State for course data
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    image: "",
    courseType: "",
    paymentType: [],
    // startDate: "",
    // endDate: "",
    syllabus: "",
    // routine: "",
    price: "",
    status: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    image: "",
    courseType: "",
    paymentType: "",
    syllabus: "",
    // routine: "",
    // startDate: "",
    // endDate: "",
    price: "",
  });

  // Handle input changes for course data
  const handleInputChange = (e) => {
    const { name, value, type, options } = e.target;

    let newValue;
    if (type === "select-multiple") {
      newValue = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
    } else {
      newValue = value;
    }

    setCourseData({
      ...courseData,
      [name]: newValue,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseData({
          ...courseData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate course data
    const newErrors = {
      title: !courseData.title ? "Title is required" : "",
      syllabus: !courseData.syllabus ? "Syllabus is required" : "",
      // routine: !courseData.syllabus ? "Routine is required" : "",
      description: !courseData.description ? "Description is required" : "",
      image: !courseData.image ? "Image is required" : "",
      courseType: !courseData.courseType ? "Course type is required" : "",
      paymentType: !courseData.paymentType ? "Payment type is required" : "",
      // startDate: !courseData.startDate ? "Start date is required" : "",
      // endDate: !courseData.endDate ? "End date is required" : "",
      price: !courseData.price ? "Price is required" : "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      setIsLoading(true);
      const imageFile = e.target.image.files[0];
      const imageLink = await uploadImage(imageFile);
      const payload = {
        ...courseData,
        image: imageLink,
        price: Number(courseData.price),
      };
      // Send the payload to the backend API
      const response = await createCourse(payload);
      if (response.error) {
        showToast("error", "Error", response.error.data.message);
        setIsLoading(false);
        return;
      }

      // Reset the form after successful submission
      setCourseData({
        title: "",
        description: "",
        image: "",
        courseType: "",
        paymentType: [],
        // startDate: "",
        // endDate: "",
        price: "",
        status: "",
        syllabus: "",
      });
      showToast("success", "Success", "Course created successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating course:", error);
      showToast("error", "Error", "Failed to create course. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="md:max-w-7xl mx-auto bg-white border p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Course Details{" "}
          <span className="text-xs px-[3px] -mt-44 bg-blue-500 text-white rounded-full">
            ?
          </span>
        </h1>

        {/* Course Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column */}
            <div>
              {/* Title */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleInputChange}
                  placeholder="Enter course title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  placeholder="Enter course description"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Course Type */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Course Type
                </label>
                <select
                  name="courseType"
                  value={courseData.courseType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a Course Type</option>
                  <option value="Class Based">Class Based</option>
                  <option value="Topic Based">Topic Based</option>
                </select>
                {errors.courseType && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.courseType}
                  </p>
                )}
              </div>

              {/* Payment Type */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Payment Type
                </label>
                <select
                  name="paymentType"
                  value={courseData.paymentType} // This will now be an array
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  multiple // Allow multiple selections
                  required
                >
                  <option value="One Time">One Time</option>
                  <option value="Monthly">Monthly</option>
                  <option value="3 Monthly">3 Monthly</option>
                  <option value="Half yearly">Half yearly</option>
                </select>
                {errors.paymentType && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.paymentType}
                  </p>
                )}
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Selected Payment Types:
                  </p>
                  <ul className="list-disc list-inside">
                    {courseData?.paymentType?.map((type, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {type}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    {courseData.image ? (
                      <Image
                        src={courseData.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                        height={192}
                        width={192}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, or JPEG (MAX. 5MB)
                        </p>
                      </div>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      name="image"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleImageChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
                {courseData.image && (
                  <button
                    type="button"
                    onClick={() => setCourseData({ ...courseData, image: "" })}
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove Image
                  </button>
                )}
                {errors.image && (
                  <p className="text-sm text-red-600 mt-1">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Price */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={courseData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                {errors.price && (
                  <p className="text-sm text-red-600 mt-1">{errors.price}</p>
                )}
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={courseData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Course Status</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Ended">Ended</option>
                </select>
                {errors.status && (
                  <p className="text-sm text-red-600 mt-1">{errors.status}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Syllabus
                </label>
                <input
                  type="text"
                  name="syllabus"
                  value={courseData.syllabus}
                  onChange={handleInputChange}
                  placeholder="Enter syllabus link (e.g., https://example.com)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  pattern="https?://.+"
                  required
                />
                {errors.syllabus && (
                  <p className="text-sm text-red-600 mt-1">{errors.syllabus}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
