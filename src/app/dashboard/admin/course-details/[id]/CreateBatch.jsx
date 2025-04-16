import { useCreateBatchByCourseIdMutation } from "../../../../../Redux/features/Admin/admin.api";
import React, { useState } from "react";
import showToast from "../../../../../utils/toast";
export const WeekDays = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

const CreateBatch = ({ courseId }) => {
  const [createBatch] = useCreateBatchByCourseIdMutation();
  const [formData, setFormData] = useState({
    course_id: courseId,
    max_students: "",
    name: "",
    week_days: [],
    start_time: "",
    end_time: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWeekDaysChange = (day) => {
    setFormData((prev) => {
      const updatedWeekDays = prev.week_days.includes(day)
        ? prev.week_days.filter((d) => d !== day) // Remove if already selected
        : [...prev.week_days, day]; // Add if not selected
      return { ...prev, week_days: updatedWeekDays };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new payload without mutating formData
    const { start_time, end_time, max_students, ...rest } = formData;

    const payload = {
      ...rest,
      max_students: Number(max_students),
      class_time: `${start_time} - ${end_time}`,
    };
    const response = await createBatch(payload);
    if (response.data) {
      showToast("success", "Success", "Batch Create successfully!");
    }
    if (response.error) {
      showToast("error", "Error", response.error.data.message);
    }
    console.log("Form Data:", payload);
  };

  return (
    <div className="">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Batch</h1> */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course ID */}
          {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Course ID
                        </label>
                        <input
                            type="text"
                            name="course_id"
                            value={formData.course_id}
                            onChange={handleChange}
                            placeholder="Enter Course ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div> */}

          {/* Max Students */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Students
            </label>
            <input
              type="number"
              name="max_students"
              value={formData.max_students}
              onChange={handleChange}
              placeholder="Enter Max Students"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Batch Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Batch Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Batch Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Week Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Week Days
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.values(WeekDays).map((day) => (
                <div key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    id={day}
                    checked={formData.week_days.includes(day)}
                    onChange={() => handleWeekDaysChange(day)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={day} className="ml-2 text-sm text-gray-700">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {/* {errors.startDate && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.startDate}
                </p>
              )} */}
            </div>
            {/* End Date */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              {/* {errors.endDate && (
                <p className="text-sm text-red-600 mt-1">{errors.endDate}</p>
              )} */}
            </div>
          </div>

          {/* Class Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Batch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatch;
