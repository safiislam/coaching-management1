"use client";
import { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import {
  useGetAllSubjectQuery,
  useSubjectCreateMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} from "../../../../Redux/features/Admin/admin.api";
import Dialog from "../../../../Components/Dialog";

import showToast from "../../../../utils/toast";
const ManageSubject = () => {
  const { data: subjectData, refetch } = useGetAllSubjectQuery();
  const [createSubject] = useSubjectCreateMutation();
  const [updateSubject] = useUpdateSubjectMutation();
  const [deleteSubject] = useDeleteSubjectMutation();
  const [isLoading, setIsLoading] = useState(false);

  const subjects = subjectData?.data?.result || [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subject_code: "",
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const openDialog = (subject = null) => {
    if (subject) {
      setFormData(subject);
      setIsEditing(true);
      setEditId(subject._id);
    } else {
      setFormData({
        name: "",
        description: "",
        subject_code: "",
        isActive: true,
      });
      setIsEditing(false);
      setEditId(null);
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      setIsLoading(true);
      const response = await updateSubject({ id: editId, data: formData });
      if (response.data) {
        showToast("success", "Success", "Subject Update successfully!");
        setIsLoading(false);
      } else {
        showToast("error", "Error", response.error.data.message);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      const response = await createSubject(formData);
      if (response.data) {
        showToast("success", "Success", "Subject Created successfully!");
        setIsLoading(false);
      } else {
        showToast("error", "Error", response.error.data.message);
        setIsLoading(false);
      }
    }
    refetch();
    closeDialog();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      setIsLoading(true);
      const response = await deleteSubject(id);
      if (response.data) {
        showToast("success", "Success", "Subject Deleted successfully!");
        setIsLoading(false);
      } else {
        showToast("error", "Error", response.error.data.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Manage Subjects</h2>
      <button
        onClick={() => openDialog()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Subject
      </button>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Code</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject._id} className="text-center border-b">
                <td className="border p-2">{subject.name}</td>
                <td className="border p-2">{subject.description}</td>
                <td className="border p-2">{subject.subject_code}</td>
                <td className="border p-2">
                  {subject.isActive ? "Active" : "Inactive"}
                </td>
                <td className="border p-2 flex justify-center gap-2">
                  <button
                    onClick={() => openDialog(subject)}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={isEditing ? "Edit Subject" : "Add Subject"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Subject Name"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="subject_code"
            value={formData.subject_code}
            onChange={handleChange}
            placeholder="Subject Code"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg"
          ></textarea>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label>Active</label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                {isEditing ? "Updating..." : "Creating..."}
              </>
            ) : isEditing ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        </form>
      </Dialog>
    </div>
  );
};

export default ManageSubject;
