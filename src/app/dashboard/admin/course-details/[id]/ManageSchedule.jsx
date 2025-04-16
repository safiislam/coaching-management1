import { useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ScheduleForm from "./ScheduleForm";
import { useGetAllScheduleByBatchIdQuery } from "../../../../../Redux/features/Admin/admin.api";
import Dialog from "../../../../../Components/Dialog";
import EditSchedule from "./EditSchedule";
import PdfConverter from "../../../../../Components/PdfConverter";
import ScheduleTable from "./ScheduleTable";

const ManageSchedule = ({ batchId, courseId, classTime, courseDetails }) => {
  const pdfRef = useRef();
  const [search, setSearch] = useState("");
  const payload = {
    id: batchId,
    args: [{ name: "teacherName", value: search }],
  };
  const { data, isLoading } = useGetAllScheduleByBatchIdQuery(payload, {
    skip: !batchId,
  });
  const [scheduleData, setScheduleData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [openDates, setOpenDates] = useState({});
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const openEditDialog = () => setIsEditDialogOpen(true);
  const closeEditDialog = () => setIsEditDialogOpen(false);

  const toggleDate = (date) => {
    setOpenDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800 ">
          Manage Schedule
        </h2>
        <input
          type="text"
          placeholder="Search Teacher Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4 md:mt-0"
        />
        {batchId && (
          <button
            onClick={openDialog}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Add Schedule
          </button>
        )}
      </div>
      <hr className="mb-4" />
      {isLoading ? (
        <p className="text-gray-600">Loading schedules...</p>
      ) : !data || data?.data?.length === 0 ? (
        <p className="text-gray-500">No schedules available for this batch.</p>
      ) : (
        <div className="space-y-4 h-[500px] overflow-y-auto">
          {data?.data?.map((scheduleData) => (
            <div
              key={scheduleData.date}
              className="border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleDate(scheduleData.date)}
                className="w-full flex justify-between items-center bg-gray-100 px-4 py-3 text-gray-800 font-medium"
              >
                <span>{scheduleData.date}</span>
                {openDates[scheduleData.date] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>

              {openDates[scheduleData.date] && (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                          Time Slot
                        </th>
                        <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                          Subject
                        </th>
                        <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                          Teacher
                        </th>
                        <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                          Conflict
                        </th>
                        <th className="px-4 py-2 border text-left text-sm font-medium text-gray-600">
                          action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData?.schedules?.map((schedule) => (
                        <tr
                          key={schedule._id}
                          classNam={`border-b hover:bg-gray-50 ${schedule.isConflict && "bg-red-500"
                            }`}
                        >
                          <td className="px-4 py-2 border text-gray-700">
                            {schedule.timeSlot}
                          </td>
                          <td className="px-4 py-2 border text-gray-700">
                            {schedule.subject}
                          </td>
                          <td className="px-4 py-2 border text-gray-700">
                            {schedule.teacherName}
                          </td>
                          <td className="px-4 py-2 border text-gray-700">
                            {schedule.isConflict ? "Conflicted" : "None"}
                          </td>
                          <td className="px-4 py-2 border text-gray-700">
                            <button
                              onClick={() => {
                                openEditDialog();
                                setScheduleData(schedule);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="hidden">
        <PdfConverter ref={pdfRef}>
          <div className=" bg-gray-50 rounded-lg shadow-sm">
            {/* Course Header */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {courseDetails.courseName}
              </h1>
              <p className="text-lg text-gray-600">
                Batch: {courseDetails.batchName}
              </p>
            </div>

            {/* Schedule List */}
            <div className="space-y-4">
              {data?.data?.map((schedule) => (
                <ScheduleTable
                  key={schedule._id}
                  scheduleData={schedule}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        </PdfConverter>
      </div>

      <button
        onClick={() => pdfRef.current?.convertToPdf()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Download as PDF
      </button>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Create New Schedule"
      >
        <ScheduleForm
          classTime={classTime}
          courseId={courseId}
          batchId={batchId}
        />
      </Dialog>

      <Dialog
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        title="Edit Schedule"
      >
        <EditSchedule scheduleData={scheduleData} />
      </Dialog>
    </div>
  );
};

export default ManageSchedule;
