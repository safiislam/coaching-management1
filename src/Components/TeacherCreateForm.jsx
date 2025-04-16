import { useState } from "react";
import { useGetAllSubjectQuery, useCreateTeacherMutation } from "../Redux/features/Admin/admin.api";
import Image from "next/image";
import { uploadImage } from "../utils/cloudinary";
import showToast from "../utils/toast";

const TeacherCreateForm = () => {
  const { data: subjects } = useGetAllSubjectQuery();
  const [createTeacher, { isLoading }] = useCreateTeacherMutation()
  const [teacherData, setTeacherData] = useState({
    name: "",
    age: "",
    image: "",
    contactNumber: "",
    nidNumber: "",
    subject: "",
    email: "",
    joinDate: ""
  });
  const handleTeacherData = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeacherData({
          ...teacherData,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault()
    console.log(teacherData);
    const imageFile = e.target.image.files[0];
    const imageLink = await uploadImage(imageFile);
    const payload = {
      ...teacherData,
      image: imageLink,
      age: Number(teacherData.age)
    };
    const response = await createTeacher(payload)
    if (response.error) {
      showToast("error", "Error", response.error.data.message);
      return;
    }
    setTeacherData({
      name: "",
      age: "",
      image: "",
      contactNumber: "",
      nidNumber: "",
      subject: "",
      email: "",
    })
    showToast("success", "Success", "Teacher Created successfully!");
  }
  return (
    <form onSubmit={handelSubmit} className="mt-5">
      <div className="flex gap-2">
        <div className="w-full lg:w-1/2 relative border rounded">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Name
          </label>
          <input
            onChange={handleTeacherData}
            value={teacherData.name}
            name="name"
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
            Age
          </label>
          <input
            name="age"
            onChange={handleTeacherData}
            value={teacherData.age}
            type="text"
            placeholder="28"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="w-full lg:w-1/2 relative border rounded">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Email
          </label>
          <input
            name="email"
            onChange={handleTeacherData}
            value={teacherData.email}
            type="email"
            placeholder="example@example.com"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="w-full lg:w-1/2 relative border rounded">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Contact Number
          </label>
          <input
            name="contactNumber"
            onChange={handleTeacherData}
            value={teacherData.contactNumber}
            type="text"
            placeholder="+8800000000000"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <div className="w-full lg:w-1/2 relative border rounded">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Nid Number
          </label>
          <input
            name="nidNumber"
            onChange={handleTeacherData}
            value={teacherData.nidNumber}
            type="text"
            placeholder="000 0000 0000"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        <div className="w-full lg:w-1/2 relative border rounded">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Subject
          </label>
          <select
            name="subject"
            onChange={handleTeacherData}
            value={teacherData.subject}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select a Course Type</option>
            {subjects?.data?.result?.map((sub, i) => {
              return (
                <option key={i} value={sub._id}>
                  {sub?.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        {/* Image Upload */}
        <div className="w-full lg:w-1/2 relative border rounded-lg p-2">
          <label
            htmlFor="image"
            className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-900"
          >
            Image
          </label>
          <input
            onChange={handleImageChange}
            id="image"
            name="image"
            type="file"
            className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 outline-none"
          />
        </div>

        {/* Join Date */}
        <div className="w-full lg:w-1/2 relative border rounded-lg p-2">
          <label
            htmlFor="joinDate"
            className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-900"
          >
            Join Date
          </label>
          <input
            id="joinDate"
            name="joinDate"
            onChange={handleTeacherData}
            type="date"
            className="block w-full rounded-md bg-white px-3 py-2 text-sm text-gray-900 border border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 outline-none"
          />
        </div>
      </div>

      {teacherData.image && (
        <div className="mt-2">
          <Image
            src={teacherData.image}
            alt="Preview"
            className="h-28 object-contain rounded-lg"
            height={192}
            width={192}
          />
        </div>
      )}
      <button
        disabled={isLoading}
        className="bg-cyan-600 mt-5 text-white px-4 py-1.5 text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {isLoading ? "loading.." : "Add"}
      </button>
    </form>
  );
};

export default TeacherCreateForm;
