import { FiClock, FiBook, FiUser, FiCalendar, FiCheck, FiX } from 'react-icons/fi';

const ScheduleTable = ({ schedules }) => {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <FiCalendar className="text-gray-400" />
                                Date
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <FiClock className="text-gray-400" />
                                Time Slot
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <FiBook className="text-gray-400" />
                                Subject
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <FiUser className="text-gray-400" />
                                Batch
                            </div>
                        </th>

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {schedules?.map((schedule) => (
                        <tr key={schedule._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {new Date(schedule.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        weekday: 'short'
                                    })}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {schedule.timeSlot}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {schedule.subject}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                    {schedule.batchId.name}
                                    <div className="text-xs text-gray-500">
                                        {schedule.batchId.course_id.title}
                                    </div>
                                </div>
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">
                                {schedule.isConflict ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                        <FiX className="mr-1" />
                                        Conflict
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <FiCheck className="mr-1" />
                                        Available
                                    </span>
                                )}
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;