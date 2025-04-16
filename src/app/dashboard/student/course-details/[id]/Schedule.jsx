import { useRef, useState } from "react";
import PdfConverter from "../../../../../Components/PdfConverter";
import { useGetAllScheduleOfStudentQuery } from "../../../../../Redux/features/Student/student.api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ScheduleTable from "./ScheduleTable";

const Schedule = ({ batchId }) => {
    const pdfRef = useRef();
    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("all");
    const [date, setDate] = useState("");
    const [openDates, setOpenDates] = useState({});

    const toggleDate = (selectedDate) => {
        setOpenDates((prev) => ({
            ...prev,
            [selectedDate]: !prev[selectedDate],
        }));
    };

    const payload = {
        id: batchId,
        args: [
            { name: "dateFilter", value: dateFilter.trim() },
            { name: "fixedDate", value: date },
        ],
    };

    const { data: scheduleData, isLoading } = useGetAllScheduleOfStudentQuery(payload, {
        skip: !batchId,
    });

    // Group schedules by date
    const groupedSchedules = scheduleData?.data?.reduce((acc, schedule) => {
        const scheduleDate = new Date(schedule.date).toLocaleDateString();
        if (!acc[scheduleDate]) {
            acc[scheduleDate] = [];
        }
        acc[scheduleDate].push(schedule);
        return acc;
    }, {}) || {};

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Schedule</h1>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {["all", "today", "tomorrow", "next7Days"].map((filter) => (
                    <button
                        key={filter}
                        onClick={() => {
                            setDateFilter(filter);
                            if (filter === "all") {
                                setDate("");
                                setSearch("");
                            }
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${dateFilter === filter
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {filter === "all"
                            ? "All Schedules"
                            : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
                <input
                    type="text"
                    placeholder="Search schedules..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none w-64"
                />
                <button
                    onClick={() => pdfRef.current?.convertToPdf()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Download as PDF
                </button>
            </div>

            {/* Schedule List */}
            <div>
                <div className="space-y-4">
                    {isLoading ? (
                        <p className="text-gray-500">Loading schedules...</p>
                    ) : Object.keys(groupedSchedules).length > 0 ? (
                        Object.entries(groupedSchedules).map(([scheduleDate, schedules]) => (
                            <div key={scheduleDate} className="border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => toggleDate(scheduleDate)}
                                    className="w-full flex justify-between items-center bg-gray-100 px-4 py-3 text-gray-800 font-medium"
                                >
                                    <span>{scheduleDate}</span>
                                    {openDates[scheduleDate] ? <FaChevronUp /> : <FaChevronDown />}
                                </button>

                                {openDates[scheduleDate] && (
                                    <div className="p-4 space-y-4">
                                        {schedules.map((schedule) => (
                                            <div
                                                key={schedule._id}
                                                className="border p-4 rounded-lg bg-gray-50 hover:shadow transition-all"
                                            >
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Time Slot:</span>{" "}
                                                    {schedule.timeSlot}
                                                </p>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Subject:</span>{" "}
                                                    {schedule.subject}
                                                </p>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Batch:</span>{" "}
                                                    {schedule.batchId?.name || "-"}
                                                </p>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Course:</span>{" "}
                                                    {schedule.batchId?.course_id?.title || "-"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No schedules found.</p>
                    )}
                </div>
            </div>
            <div className="hidden">
                <PdfConverter ref={pdfRef}>
                    <ScheduleTable schedules={scheduleData?.data} />
                </PdfConverter>
            </div>
        </div>
    );
};

export default Schedule;
