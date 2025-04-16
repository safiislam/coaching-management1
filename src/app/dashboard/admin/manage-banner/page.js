"use client";
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  useGetAllBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "../../../../Redux/features/Admin/admin.api";
import Pagination from "../../../../Components/Pagination";
import showToast from "@/utils/toast";

const ManageBanner = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 40; // Number of users per page
  const [createBanner] = useCreateBannerMutation();
  const [updateBanner] = useUpdateBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    isPublished: false,
  });
  const [editId, setEditId] = useState(null);
  const { data: bannerData } = useGetAllBannerQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: limit },
  ]);
  const banners = bannerData?.data?.result || [];
  const { total } = bannerData?.data.meta || {}; // Get total users

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const response = await updateBanner({ id: editId, payload: form });
      if (response.error) {
        showToast("error", "Error", response.error.data.message);
      }

      if (response.data && typeof window !== "undefined") {
        showToast("success", "Success", "Banner Update successfully!");
      }
    } else {
      const response = await createBanner(form);
      if (response.error) {
        showToast("error", "Error", response.error.data.message);
      }
      if (response.data) {
        showToast("success", "Success", "Banner Created successfully!");
      }
    }

    setForm({ title: "", description: "", image: "", isPublished: false });
    setEditId(null);
    setOpenModal(false);
  };

  const handleEdit = (banner) => {
    setForm(banner);
    setEditId(banner._id);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      const response = await deleteBanner(id);
      if (response.error && typeof window !== "undefined") {
        const iziToast = (await import("izitoast")).default;
        iziToast.error({
          title: "Error",
          message: response.error.data.message,
          position: "topRight",
        });
      }
      if (response.data && typeof window !== "undefined") {
        const iziToast = (await import("izitoast")).default;
        iziToast.success({
          title: "Success",
          message: "Banner Delete successfully!!",
        });
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Banners</h1>
        <button
          onClick={() => {
            setForm({
              title: "",
              description: "",
              image: "",
              isPublished: false,
            });
            setEditId(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          <PlusIcon className="w-5 h-5" />
          Add Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners?.map((banner) => (
          <div key={banner?._id} className="bg-white p-4 rounded shadow">
            <img
              src={banner?.image}
              alt={banner?.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-lg font-bold">{banner?.title}</h2>
            <p className="text-gray-600">{banner?.description}</p>
            <p className="text-sm mt-1 text-green-600">
              {banner?.isPublished ? "Published" : "Unpublished"}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(banner)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                <PencilIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(banner?._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl">
                <Dialog.Title className="text-lg font-bold mb-4">
                  {editId ? "Edit Banner" : "Add New Banner"}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="mt-1 w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      name="image"
                      value={form.image}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={form.isPublished}
                      onChange={handleChange}
                    />
                    <label className="text-sm">Publish Now</label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setOpenModal(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      {editId ? "Update" : "Create"}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* Pagination Component */}
      <div className="mt-6 flex justify-center">
        <Pagination
          itemsPerPage={limit}
          totalItems={total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ManageBanner;
