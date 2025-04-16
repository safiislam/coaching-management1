import { getFormattedClassTime } from "../../../../../utils/formateDate";
import {
  useGetSingleCourseQuery,
  useGetAllSubjectQuery,
  useCreateScheduleMutation,
} from "../../../../../Redux/features/Admin/admin.api";
import { useState, useEffect } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import showToast from "../../../../../utils/toast";

const ScheduleForm = ({ batchId, onClose, courseId, classTime }) => {
  const [createSchedule] = useCreateScheduleMutation();
  const { data: subjectData = [] } = useGetAllSubjectQuery([
    { name: "limit", value: 1000 },
  ]);
  // const { data: courseData = {} } = useGetSingleCourseQuery(courseId);
  // const { startDate, endDate } = courseData?.data || {};
  const [isLoading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    batchId,
    // startDate,
    // endDate,
    subjects: [], // Will be populated with selected subjects
    availableTimeSlots: [], // Will store time slots as strings like ["11:00 - 12:00"]
  });
  useEffect(() => {
    if (batchId) {
      setFormData((preFormData) => ({
        ...preFormData,
        batchId,
      }));
    }
  }, [batchId]);

  const [errors, setErrors] = useState({}); // To store validation errors

  const subjects = subjectData?.data?.result;

  // Parse classTime into start and end times
  const [classStart, classEnd] = classTime ? classTime.split(" - ") : ["", ""];

  // Validate if a time slot is within classTime range
  const validateTimeSlot = (startTime, endTime) => {
    if (!classTime) return true; // No validation if classTime is not provided

    const isStartValid = startTime >= classStart && startTime <= classEnd;
    const isEndValid = endTime >= classStart && endTime <= classEnd;
    return isStartValid && isEndValid;
  };
  const handleSubjectChange = (subjectId, isChecked, totalClass = 0) => {
    const updatedSubjects = [...formData.subjects];
    if (isChecked) {
      // Add subject to the list
      updatedSubjects.push({ subject: subjectId, teachers: [], totalClass });
    } else {
      // Remove subject from the list
      const index = updatedSubjects.findIndex(
        (sub) => sub.subject === subjectId
      );
      if (index !== -1) {
        updatedSubjects.splice(index, 1);
      }
    }
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  // Handle total class input change
  const handleTotalClassChange = (subjectId, totalClass) => {
    const updatedSubjects = formData.subjects.map((sub) =>
      sub.subject === subjectId
        ? { ...sub, totalClass: parseInt(totalClass, 10) || 0 }
        : sub
    );
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  // Handle teacher selection for a subject
  const handleTeacherChange = (subjectId, teacherId) => {
    const updatedSubjects = formData.subjects.map((sub) =>
      sub.subject === subjectId ? { ...sub, teachers: [teacherId] } : sub
    );
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  // Handle adding a new time slot
  const handleAddTimeSlot = () => {
    setFormData((prev) => ({
      ...prev,
      availableTimeSlots: [...prev.availableTimeSlots, ""], // Add an empty string for a new time slot
    }));
  };

  // Handle time slot input change
  const handleTimeSlotChange = (index, value) => {
    const updatedTimeSlots = [...formData.availableTimeSlots];
    updatedTimeSlots[index] = value; // Update the time slot at the given index

    // Validate the updated time slot
    const [startTime, endTime] = value.split(" - ");
    const isValid = validateTimeSlot(startTime, endTime);

    // Update errors state
    setErrors((prev) => ({
      ...prev,
      [index]: isValid ? null : "Time slot is outside the allowed range.",
    }));

    setFormData({ ...formData, availableTimeSlots: updatedTimeSlots });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.availableTimeSlots.length === 0) {
      alert("Please Set Available Time Slots");
      return;
    }
    if (formData.subjects.length === 0) {
      alert("Please Select a Subject");
      return;
    }
    if (!formData.batchId) {
      alert("Select A Batch");
      return;
    }
    if (!formData.subjects) {
      alert("Select A Batch");
      return;
    }

    // Check for validation errors
    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      alert("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    const response = await createSchedule(formData);
    if (response.data) {
      showToast("success", "Success", "Schedule generated successfully!");
      setLoading(false);
    } else {
      showToast("error", "Error", response.error.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Subjects Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subjects:
          </label>
          <div className="space-y-4">
            {subjects?.map((subject) => (
              <div
                key={subject._id}
                className="flex flex-col space-y-4 p-4 border rounded-lg"
              >
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600 rounded"
                    onChange={(e) =>
                      handleSubjectChange(subject.name, e.target.checked)
                    }
                  />
                  <span className="text-gray-700">{subject.name}</span>
                </label>

                {/* Total Classes Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Classes:
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter total classes"
                    onChange={(e) =>
                      handleTotalClassChange(subject.name, e.target.value)
                    }
                  />
                </div>

                {/* Teacher Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Teacher:
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      handleTeacherChange(subject.name, e.target.value)
                    }
                  >
                    <option value="">Select one</option>
                    {subject?.teacher_ids?.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                        {`${teacher.email} (${teacher.name})`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Time Slots Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Time Slots:{getFormattedClassTime(classTime)}
          </label>
          <div className="space-y-4">
            {formData.availableTimeSlots.map((slot, index) => (
              <div key={index} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4">
                  <input
                    type="time"
                    className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={slot.split(" - ")[0]} // Extract start time
                    onChange={(e) => {
                      const startTime = e.target.value;
                      const endTime = slot.split(" - ")[1] || "";
                      const formattedSlot = `${startTime} - ${endTime}`;
                      handleTimeSlotChange(index, formattedSlot);
                    }}
                  />
                  <span>to</span>
                  <input
                    type="time"
                    className="w-1/2 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={slot.split(" - ")[1]} // Extract end time
                    onChange={(e) => {
                      const startTime = slot.split(" - ")[0] || "";
                      const endTime = e.target.value;
                      const formattedSlot = `${startTime} - ${endTime}`;
                      handleTimeSlotChange(index, formattedSlot);
                    }}
                  />
                </div>
                {errors[index] && (
                  <p className="text-red-500 text-sm">{errors[index]}</p>
                )}
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleAddTimeSlot}
            >
              Add Time Slot
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />{" "}
                {/* Loading spinner */}
                Creating...
              </>
            ) : (
              "Create Schedule"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
