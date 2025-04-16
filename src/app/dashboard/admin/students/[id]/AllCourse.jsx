import { useGetAllCourseForStudentQuery } from "../../../../../Redux/features/Admin/admin.api";
import { CalendarIcon, UsersIcon } from "@heroicons/react/24/outline"; // Using Heroicons for icons

const AllCourse = ({ studentId }) => {
    const { data, isLoading } = useGetAllCourseForStudentQuery(studentId, {
        skip: !studentId,
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                </div>
            </div>
        );
    }

    if (!data?.data?.length) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500">No courses found for this student</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Enrolled Courses</h4>

            <div className="grid grid-cols-auto-fill gap-4">
                {data.data.map((course) => (
                    <div
                        key={course._id}
                        className="rounded-lg shadow-md p-4 transition-transform hover:-translate-y-1 bg-white"
                    >
                        <h5 className="text-md font-semibold mb-2">{course.title}</h5>
                        <hr className="my-2" />

                        <div className="flex items-center mb-2">
                            <UsersIcon className="h-5 w-5 mr-2 text-gray-500" />
                            <span className="font-semibold">Available Batches</span>
                        </div>

                        <ul className="space-y-2">
                            {course.batches.map((batch) => (
                                <li key={batch._id} className="flex items-center">
                                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
                                        {batch.name}
                                    </span>
                                    {/* <span className="text-gray-500 text-sm">ID: {batch._id}</span> */}
                                </li>
                            ))}
                        </ul>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllCourse;