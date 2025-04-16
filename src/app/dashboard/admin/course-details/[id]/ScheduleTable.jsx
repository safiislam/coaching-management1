import { getFormattedClassTime } from "../../../../../utils/formateDate";
import React from "react";

const ScheduleTable = ({ scheduleData }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                    Schedule for {scheduleData.date}
                </h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time Slot
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Teacher
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {scheduleData.schedules.map((schedule) => (
                            <tr
                                key={schedule._id}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {getFormattedClassTime(schedule.timeSlot)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {schedule.subject}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {schedule.teacherName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleTable;