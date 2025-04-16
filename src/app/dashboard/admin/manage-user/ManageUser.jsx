"use client";
import { useEffect, useState } from "react";
import {
    useGetAllUserQuery,
    useRoleChangeMutation,
} from "../../../../Redux/features/Admin/admin.api";
import Pagination from "../../../../Components/Pagination";
import { TrashIcon } from "@heroicons/react/20/solid";
import Dialog from "../../../../Components/Dialog";
import dynamic from "next/dynamic";
const TeacherCreateForm = dynamic(
    () => import("../../../../Components/TeacherCreateForm"),
    {
        ssr: false,
    }
);
const AdminCreateForm = dynamic(
    () => import("../../../../Components/AdminCreateForm"),
    {
        ssr: false,
    }
);
import showToast from "../../../../utils/toast";

const ManageUser = () => {
    const roles = ["Admin", "Teacher", "Student", "Accountant", "Staff"];
    const [roleChange] = useRoleChangeMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddDropDown, setShowAddDropDown] = useState(false);
    const [showModal, setShowModal] = useState(null);
    const limit = 40; // Number of users per page
    const [search, setSearch] = useState("");

    // Fetch users with pagination
    const { data: userData = {} } = useGetAllUserQuery([
        { name: "page", value: currentPage },
        { name: "limit", value: limit },
        { name: "searchTerm", value: search },
    ]);

    const users = userData?.data || [];
    console.log(users);
    const { total } = userData?.meta || {}; // Get total users

    // Handle page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handelRoleChange = async (data) => {
        const isRoleChange = confirm("Do you want role Change");
        if (isRoleChange) {
            const result = await roleChange(data);
            if (result.data) {
                showToast("success", "Success", "Role Update successfully!");
            }
        }
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".add-user-dropdown")) {
                setShowAddDropDown(null);
            }
        };

        // Only add event listener on the client side
        if (typeof window !== "undefined") {
            document.addEventListener("mousedown", handleClickOutside);

            // Clean up the event listener on component unmount
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                {/* Search Input */}
                <input
                    name="search"
                    type="text"
                    placeholder="Search by username"
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Role Dropdown */}
                <select
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Roles</option>
                    {roles.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                {/* Add User Button */}
                <div className="relative">
                    <button
                        onClick={() => setShowAddDropDown(!showAddDropDown)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {!showAddDropDown ? "Add" : "Close"}
                    </button>
                    <div
                        className={`${showAddDropDown ? "flex" : "hidden"
                            } bg-zinc-100 shadow-lg border add-user-dropdown  flex-col gap-2 p-4 absolute left-full min-w-52 top-0 ml-4`}
                    >
                        <button
                            onClick={() => setShowModal("Teacher")}
                            className="bg-cyan-600 text-white px-4 py-1.5 text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Add Teacher
                        </button>
                        <button
                            onClick={() => setShowModal("Staff")}
                            className="bg-teal-600 text-white px-4 py-1.5 text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Add Staff
                        </button>
                    </div>
                </div>
                <Dialog
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title={`Add ${showModal}` || ""}
                >
                    {showModal === "Teacher" ? (
                        <TeacherCreateForm></TeacherCreateForm>
                    ) : (
                        <AdminCreateForm></AdminCreateForm>
                    )}
                </Dialog>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full bg-white  shadow">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white text-sm">
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id} className="border-b">
                                <td className="py-3 px-4 capitalize  text-sm">
                                    {user.username}
                                </td>
                                <td className="py-3 px-4 text-sm">{user.email}</td>
                                <td>
                                    <span
                                        className={`py-2 rounded-full px-4 text-sm ${user.role === "Admin"
                                            ? "text-green-700 bg-green-100"
                                            : user.role === "Teacher"
                                                ? "text-cyan-700 bg-cyan-100"
                                                : user.role === "Student"
                                                    ? "text-indigo-700 bg-indigo-100"
                                                    : user.role === "Staff"
                                                        ? "text-red-700 bg-red-100"
                                                        : ""
                                            } `}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm flex items-center">
                                    <div className=" mr-2">
                                        <select
                                            onChange={(e) =>
                                                handelRoleChange({
                                                    payload: e.target.value,
                                                    id: user._id,
                                                })
                                            }
                                            defaultValue={user.role}
                                            className="w-fit md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="" disabled>
                                                All Roles
                                            </option>
                                            {roles.map((item, index) => (
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className="text-red-600 hover:text-red-900">
                                        <TrashIcon className="size-6"></TrashIcon>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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

export default ManageUser;
