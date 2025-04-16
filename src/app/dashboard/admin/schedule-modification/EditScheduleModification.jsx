import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import Swal from 'sweetalert2';
import {
    useGetAllScheduleModificationQuery,
    useUpdateScheduleModificationMutation,
} from "../../../../Redux/features/Admin/admin.api";
import showToast from '../../../../utils/toast';

const EditScheduleModification = ({ scheduleStatus }) => {
    const [updateScheduleModification] = useUpdateScheduleModificationMutation();
    const [timeRange, setTimeRange] = useState({
        startTime: '',
        endTime: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    console.log(scheduleStatus);

    // Initialize time range from schedule status
    useEffect(() => {
        if (scheduleStatus?.scheduleId?.timeSlot) {
            const [startTime, endTime] = scheduleStatus.scheduleId.timeSlot.split(" - ");
            setTimeRange({
                startTime: startTime.trim(),
                endTime: endTime.trim()
            });
        }
    }, [scheduleStatus]);

    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setTimeRange(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusChange = async () => {
        try {
            const result = await Swal.fire({
                title: "Update Schedule Confirmation",
                text: "Are you sure you want to update this schedule?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update It!",
                cancelButtonText: "Cancel",
                reverseButtons: true
            });

            if (result.isConfirmed) {
                setIsLoading(true);

                const response = await updateScheduleModification({
                    id: scheduleStatus.scheduleId.scheduleId._id,
                    payload: {
                        timeSlot: `${timeRange.startTime} - ${timeRange.endTime}`,
                        isScheduleChange: "Accepted"  // Or whatever status you need
                    }
                });

                if (response.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Schedule has been updated successfully.",
                        icon: "success",
                        timer: 2000
                    });
                } else {
                    throw new Error(response.message || "Failed to update schedule");
                }
            }
        } catch (error) {
            showToast("error", "Error", response.error.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Time Input */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FiClock className="text-gray-500" />
                        Start Time
                    </label>
                    <input
                        type="time"
                        name="startTime"
                        value={timeRange.startTime}
                        onChange={handleTimeChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                    />
                </div>

                {/* End Time Input */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <FiClock className="text-gray-500" />
                        End Time
                    </label>
                    <input
                        type="time"
                        name="endTime"
                        value={timeRange.endTime}
                        onChange={handleTimeChange}
                        min={timeRange.startTime}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        required
                        disabled={!timeRange.startTime}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <button
                    onClick={handleStatusChange}
                    disabled={!timeRange.startTime || !timeRange.endTime || isLoading}
                    className={`px-5 py-2 font-medium rounded-lg transition flex items-center gap-2 ${(!timeRange.startTime || !timeRange.endTime || isLoading)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        "Request Change"
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditScheduleModification;