import React, { useEffect, useState } from "react";
import {
  useGetClassByScheduleQuery,
  useCreateClassMutation,
  useDeleteClassMutation,
} from "../../../../Redux/features/Admin/admin.api";
import Dialog from "../../../../../Components/Dialog";
import showToast from "../../../../../utils/toast";

const ManageClass = ({ courseId, scheduleId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: classData, refetch } = useGetClassByScheduleQuery(scheduleId, {
    skip: !scheduleId,
  });
  const [addClass] = useCreateClassMutation();
  // const [updateClass] = useUpdateClassMutation();
  const [deleteClass] = useDeleteClassMutation();
  // Open and close dialog
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const [newClass, setNewClass] = useState({
    type: "",
    schedule: "",
    courseId: "",
  });
  useEffect(() => {
    setNewClass({ schedule: scheduleId, courseId });
  }, [scheduleId]);

  const handleAddClass = async () => {
    const res = await addClass(newClass);
    if (res.data) {
      showToast("success", "Success", "Class Created successfully!");
      setNewClass({ type: "live", schedule: scheduleId, courseId });
      closeDialog();
    }
  };

  const handleUpdateClass = async (id, updates) => {
    await updateClass({ id, updates });
    refetch();
  };

  const handleDeleteClass = async (id) => {
    const isDelete = confirm("Do You Want Delete A Class");
    if (isDelete) {
      const res = await deleteClass(id);
      if (res.data) {
        showToast("success", "Success", "Class Delete successfully!");
        setNewClass({ type: "live", schedule: scheduleId, courseId });
      }
    }
  };

  return (
    <div className=" px-6">
      <div className="w-full py-3  flex justify-between items-center">
        <h2 className="text-2xl font-bold ">Classes</h2>
        <button
          onClick={openDialog}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
        >
          Add Class
        </button>
      </div>
      <hr />
      {/* Display Classes */}
      <div className="mt-4 w-full">
        <h3 className="text-xl font-semibold mb-4">Class List</h3>
        <div className="h-[500px] overflow-y-auto">
          {classData?.data.length > 0 ? (
            classData.data.map((cls) => (
              <div
                key={cls._id}
                className="bg-white p-4 rounded-lg shadow-md mb-4"
              >
                <p className="text-gray-700">
                  <span className="font-semibold">Type:</span> {cls.type}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Materials:</span>{" "}
                  {cls.materials?.join(", ")}
                </p>
                <div className="mt-3">
                  <button
                    onClick={() =>
                      handleUpdateClass(cls._id, { type: "offline" })
                    }
                    className="bg-green-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-green-600 transition duration-200"
                  >
                    Change to Offline
                  </button>
                  <button
                    onClick={() => handleDeleteClass(cls._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-500">No classes available.</p>
                <p className="text-sm text-gray-400 mt-2">
                  Add a new class to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Dialog for Adding Schedule */}
      <Dialog isOpen={isDialogOpen} onClose={closeDialog} title="Add Schedule">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4">Add New Class</h3>
          <select
            value={newClass.type}
            onChange={(e) => setNewClass({ ...newClass, type: e.target.value })}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select one Class</option>
            <option value="live">Live</option>
            <option value="offline">Offline</option>
          </select>
          <input
            type="text"
            placeholder="Materials (comma separated)"
            value={newClass.materials?.join(",") || ""}
            onChange={(e) =>
              setNewClass({ ...newClass, materials: e.target.value.split(",") })
            }
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddClass}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Class
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageClass;
