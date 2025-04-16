
import {
  useCreateAgreementMutation,
  useGetAllBatchByCourseIdQuery,
  useGetAllCourseQuery,
  useGetAllTeachersQuery,
} from "../Redux/features/Admin/admin.api";
import React, { useState } from "react";
import showToast from "../utils/toast";

const CreateAgreement = () => {
  const { data: teachers } = useGetAllTeachersQuery();
  const { data: courses } = useGetAllCourseQuery();
  const [createAgreement] = useCreateAgreementMutation();
  const [courseId, setCourseId] = useState("");
  const { data: batches } = useGetAllBatchByCourseIdQuery(courseId, {
    skip: !courseId,
  });
  const [agreementData, setAgreementData] = useState({
    teacherId: "",
    batchId: "",
    amount: "",
    agreementType: "",
  });
  const handleAgreementData = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAgreementData({
      ...agreementData,
      [name]: value,
    });
  };
  const handleAmount = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setAgreementData({
      ...agreementData,
      amount: value,
    });
  };
  const handleSubmitAgreement = async (e) => {
    e.preventDefault();
    console.log(agreementData);

    const newAgreementData = {
      ...agreementData,
      amount: Number(agreementData.amount),
    };

    const response = await createAgreement(newAgreementData);
    if (response.error) {
      showToast("error", "Error", response.error.data.message);
      return;
    }
    setAgreementData({
      teacherId: "",
      batchId: "",
      amount: "",
      agreementType: "",
    });
    showToast("success", "Success", "Agreement Created successfully!");
  };
  return (
    <form className="mt-4 space-y-6">
      <div className="relative">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
        >
          Teacher
        </label>
        <select
          name="teacherId"
          value={agreementData.teacherId}
          onChange={handleAgreementData}
          className="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        >
          <option>Select a teacher</option>
          {teachers?.data?.map((teacher) => {
            return (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name} - {teacher.email}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-2">
        <div className="relative w-full md:w-1/2">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Course
          </label>
          <select
            name="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option>Select a course</option>
            {courses?.data?.result?.map((course) => {
              return (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="relative w-full md:w-1/2">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Batch
          </label>
          <select
            onChange={handleAgreementData}
            name="batchId"
            value={agreementData.batchId}
            className="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option>Select a batch</option>
            {batches?.data?.map((batch) => {
              return (
                <option key={batch._id} value={batch._id}>
                  {batch.name} - ({batch.class_time})
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative w-full md:w-1/2">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Agreement Type
          </label>
          <select
            name="agreementType"
            value={agreementData.agreementType}
            onChange={handleAgreementData}
            className="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option>Select agreement type</option>

            <option value={"Monthly"}>Monthly</option>
            <option value={"Per Class"}>Per Class</option>
            <option value={"Per Course"}>Per Course</option>
          </select>
        </div>
        <div className="relative w-full md:w-1/2">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-1 text-xs font-medium text-gray-900"
          >
            Amount
          </label>
          <input
            className="col-start-1 row-start-1 border w-full appearance-none rounded-md bg-white py-3 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            type="text"
            name="amount"
            placeholder="Enter amount"
            onChange={handleAmount}
            value={agreementData?.amount?.toString()}
          />
        </div>
      </div>
      <button
        onClick={handleSubmitAgreement}
        type="submit"
        className="bg-indigo-600 text-white  px-4 py-2 rounded "
      >
        Submit
      </button>
    </form>
  );
};

export default CreateAgreement;
