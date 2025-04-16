import { useEffect, useState } from "react";
import { useGetAllSubjectQuery, useEditScheduleMutation } from "../../../../../Redux/features/Admin/admin.api";
import showToast from "../../../../../utils/toast";

const EditSchedule = ({ scheduleData }) => {
    console.log(scheduleData);
    const [isLoading, setIsLoading] = useState(false);
    const [editSchedule] = useEditScheduleMutation()
    const [isSubjectChange, setIsSubjectChange] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(scheduleData.subject || "");
    const [selectedTeacher, setSelectedTeacher] = useState(scheduleData.teacherId || "");

    // Fetching all subjects
    const { data: subjectData = [] } = useGetAllSubjectQuery([{ name: "limit", value: 1000 }]);
    const subjects = subjectData?.data?.result || [];
    useEffect(() => {
        if (!isSubjectChange) {
            setSelectedSubject(scheduleData.subject || "");
            setSelectedTeacher(scheduleData.teacherId || "");
        }
    }, [isSubjectChange, scheduleData]);
    // Find the selected subject's teachers
    const selectedSubjectData = subjects.find((subject) => subject.name === selectedSubject);
    const availableTeachers = selectedSubjectData?.teacher_ids || [];
    const handelSubmit = async () => {
        const payload = {
            ...scheduleData,
            subject: selectedSubject,
            teacherId: selectedTeacher
        }
        delete payload._id
        const isScheduleEdit = confirm(
            "Are you sure you want to Edit this Schedule?"
        );
        if (isScheduleEdit) {
            setIsLoading(true)
            const response = await editSchedule({ id: scheduleData._id, payload });
            if (response.data) {
                showToast("success", "Success", "Schedule Update successfully!");
                setIsLoading(false)
            } else {
                showToast("error", "Error", response.error.data.message);
                setIsLoading(false)
            }
        }
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <div className="flex justify-between">
                <button
                    onClick={() => setIsSubjectChange((prev) => !prev)}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none active:scale-95"
                >
                    {isSubjectChange ? "Cancel" : "Subject Change"}
                </button>
                <div>
                    Subject: {selectedSubject}
                </div>
            </div>

            {!isSubjectChange ? (
                <div className="mt-6">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Teacher:
                    </label>
                    <select
                        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={selectedTeacher}
                        onChange={(e) => setSelectedTeacher(e.target.value)}
                    >
                        <option value="">Select one</option>
                        {availableTeachers.map((teacher) => (
                            <option key={teacher._id} value={teacher._id}>
                                {`${teacher.email} (${teacher.name})`}
                            </option>
                        ))}
                    </select>

                </div>
            ) : (
                <div className="space-y-6 mt-6">
                    {/* Select Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject:</label>
                        <select
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                        >
                            <option value="">Select a subject</option>
                            {subjects.map((subject) => (
                                <option key={subject._id} value={subject.name}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Select Teacher */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Teacher:</label>
                        <select
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedTeacher}
                            onChange={(e) => setSelectedTeacher(e.target.value)}
                            disabled={!selectedSubject}
                        >
                            <option value="">Select one</option>
                            {availableTeachers.map((teacher) => (
                                <option key={teacher._id} value={teacher._id}>
                                    {`${teacher.email} (${teacher.name})`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    {/* <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin">🔄</span> Creating...
                                </>
                            ) : (
                                "Edit Schedule"
                            )}
                        </button>
                    </div> */}
                </div>
            )}
            <div className="flex justify-end mt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handelSubmit}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <span className="h-5 w-5 animate-spin">Loading..</span> Creating...
                        </>
                    ) : (
                        "Edit Schedule"
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditSchedule;
