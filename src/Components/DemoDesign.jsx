import React, { useState } from "react";
export const WeekDays = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
}

const DemoDesign = () => {
    const [formData, setFormData] = useState({
        course_id: "",
        max_students: "",
        name: "",
        week_days: [],
        start_time: "",
        end_time: ''
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Batch</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Course ID */}
                    <div>
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
                    </div>

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

export default DemoDesign;