import { useState } from "react";
import { useCreateUserMutation } from "../Redux/features/Admin/admin.api";
import showToast from "../utils/toast";

const AdminCreateForm = () => {
  const [createUser] = useCreateUserMutation()
  const [adminData, setAdminData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Admin",
  });
  const handleAdminData = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };
  const handleAddAdmin = async () => {
    const response = await createUser(adminData)
    if (response.error) {
      showToast("error", "Error", response.error.data.message);
      return;
    }
    setTeacherData({
      username: "",
      email: "",
      password: "",
      role: "admin",
    })
    showToast("success", "Success", "Staff Created successfully!");
  };
  return (
    <div>
      <div className="flex gap-2 mt-4">
        <div className="w-full lg:w-1/2 relative border rounded">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            User name
          </label>
          <input
            onChange={handleAdminData}
            value={adminData.username}
            name="username"
            id="username"
            type="text"
            placeholder="Jane Smith"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="w-full lg:w-1/2 relative border rounded">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Email
          </label>
          <input
            onChange={handleAdminData}
            value={adminData.email}
            name="email"
            type="email"
            placeholder="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div className="w-full relative border rounded mt-4">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
        >
          Password
        </label>
        <input
          onChange={handleAdminData}
          name="password"
          type="password"
          placeholder="password"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
      <button
        onClick={handleAddAdmin}
        className="bg-cyan-600 mt-5 text-white px-4 py-1.5 text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add
      </button>
    </div>
  );
};

export default AdminCreateForm;
