import { useState } from 'react';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { useCreateScheduleModifierMutation } from '../../../../Redux/features/teacher/teacher.api';
import Swal from 'sweetalert2';
import showToast from '../../../../utils/toast';
// import { useCreateScheduleModifierMutation } from '@/Redux/features/teacher/teacher.api';

const NeedScheduleChange = ({ scheduleId }) => {
    const [scheduleModifier] = useCreateScheduleModifierMutation()
    const [timeRange, setTimeRange] = useState({
        startTime: '',
        endTime: '',
        causes: ''
    });

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setTimeRange(prev => ({
            ...prev,
            [name]: value
        }));

        // Optional: Call parent handler if needed

    };

    const handelSubmit = () => {
        Swal.fire({
            title: "Are you sure to update this Schedule?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await scheduleModifier({ scheduleId, timeSlot: `${timeRange.startTime} - ${timeRange.endTime}`, causes: timeRange.causes });
                if (response.data) {
                    Swal.fire({
                        title: "Schedule Change Request Submit",
                        text: "Exam updated successfully",
                        icon: "success",
                    });
                } else {
                    showToast("error", "Error", response.error.data.message);
                }
            }
        });

    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                    <FiClock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                    Reschedule Time Slot
                </h3>
            </div>

            <div className="space-y-5">
                <div className="flex flex-col sm:flex-row gap-5">
                    {/* Start Time */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <FiCalendar className="text-gray-400" />
                            Start Time
                        </label>
                        <div className="relative">
                            <input
                                type="time"
                                name="startTime"
                                value={timeRange.startTime}
                                onChange={handleTimeChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white"
                                required
                            />
                        </div>
                    </div>

                    {/* End Time */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <FiCalendar className="text-gray-400" />
                            End Time
                        </label>
                        <div className="relative">
                            <input
                                type="time"
                                name="endTime"
                                value={timeRange.endTime}
                                onChange={handleTimeChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-white"
                                required
                                min={timeRange.startTime} // Ensures end time can't be before start
                            />
                        </div>
                    </div>
                </div>

                {/* Date Picker (if needed) */}
                {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div> */}

                {/* Reason (optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Change
                    </label>
                    <textarea
                        placeholder="Briefly explain why this change is needed..."
                        rows={3}
                        name='causes'
                        value={timeRange.causes}
                        onChange={handleTimeChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={handelSubmit}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={!timeRange.startTime || !timeRange.endTime}
                >
                    Request Change
                </button>
            </div>
        </div>
    );
};

export default NeedScheduleChange;