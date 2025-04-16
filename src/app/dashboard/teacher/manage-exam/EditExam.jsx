import { useState, useEffect } from "react";
import { useGetAllBatchForTeacherQuery, useGetAllCourseForTeacherQuery, useUpdateExamMutation } from "../../../../Redux/features/teacher/teacher.api";
import Swal from "sweetalert2";
import showToast from "../../../../utils/toast";

const EditExam = ({ examData }) => {
    const [updateExam, { isLoading }] = useUpdateExamMutation();
    const [courseId, setCourseId] = useState(examData?.batchId?.course_id?._id || '');
    const [editExamData, setEditExamData] = useState({
        title: examData?.title || '',
        description: examData?.description || "",
        batchId: examData?.batchId?._id || "",
        subjectId: examData?.subjectId?._id || "",
        dateline: examData?.dateline ? new Date(examData.dateline).toISOString().split('T')[0] : "",
        maxScore: examData?.maxScore || "",
        status: examData?.status || "Pending", // Pre-fill status
        file: examData?.file || "", // Pre-fill status
        time: examData?.time || "", // Pre-fill status

    });

    const limit = 1000;
    const { data: getCourse } = useGetAllCourseForTeacherQuery([{ name: "limit", value: limit }, { name: "sort", value: "-createdAt" }]);
    const { data: batches } = useGetAllBatchForTeacherQuery(courseId, { skip: !courseId });

    // Update batch options when course changes
    useEffect(() => {
        if (examData?.batchId?.course_id?._id) {
            setCourseId(examData.batchId.course_id._id);
        }
    }, [examData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditExamData({
            ...editExamData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        Swal.fire({
            title: "Are you sure to update this exam?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await updateExam({ id: examData._id, data: { ...editExamData, maxScore: Number(editExamData.maxScore), time: Number(editExamData.time) } });
                if (response.data) {
                    Swal.fire({
                        title: "Exam Updated",
                        text: "Exam updated successfully",
                        icon: "success",
                    });
                } else {
                    showToast("error", "Error", response.error.data.message);
                }
            }
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
            {/* Course Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Course
                </label>
                <select
                    name="courseId"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                    required
                >
                    <option value="">Choose a Course</option>
                    {getCourse?.data?.map((course) => (
                        <option key={course._id} value={course._id}>
                            {course.title} - ${course.price}
                        </option>
                    ))}
                </select>
            </div>

            {/* Batch Selection */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Batch
                </label>
                <select
                    name="batchId"
                    value={editExamData.batchId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                    required
                >
                    <option value="">Choose a Batch</option>
                    {batches?.data?.map((batch) => (
                        <option key={batch._id} value={batch._id}>
                            {batch.name} - {batch.class_time} - Seats left: {batch.availableSeats}
                        </option>
                    ))}
                </select>
            </div>

            {/* Exam Details */}
            <div>
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={editExamData.title}
                        onChange={handleInputChange}
                        placeholder="Enter exam title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                        required
                    />
                </div>

                {/* Description */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={editExamData.description}
                        onChange={handleInputChange}
                        placeholder="Enter exam description"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50 resize-none"
                        required
                    />
                </div>

                {/* Dateline and Max Score */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Dateline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dateline</label>
                        <input
                            type="datetime-local"
                            name="dateline"
                            value={editExamData.dateline}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                            required
                        />
                    </div>

                    {/* Max Score */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Score</label>
                        <input
                            type="number"
                            name="maxScore"
                            value={editExamData.maxScore}
                            onChange={handleInputChange}
                            placeholder="Enter max score"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                            <input
                                type="text"
                                name="file"
                                value={editExamData.file}
                                onChange={handleInputChange}
                                placeholder="Enter question file"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                                required
                            />
                        </div>


                    </div>
                    <div>
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time(minute)</label>
                            <input
                                type="text"
                                name="time"
                                value={editExamData.time}
                                onChange={handleInputChange}
                                placeholder="Enter question file"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                                required
                            />
                        </div>


                    </div>
                </div>

                {/* Status */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={editExamData.status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-50"
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="Submit">Submit</option>
                    </select>
                </div>
            </div>

            {/* Submit Button */}
            <button
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-medium transition"
            >
                {isLoading ? "Updating..." : 'Update Exam'}
            </button>
        </div>
    );
};

export default EditExam;