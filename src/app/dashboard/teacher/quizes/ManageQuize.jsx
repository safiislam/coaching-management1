"use client";
import {
    useGetAllQuizesQuery,
    useUpdateQuizStatusMutation,
} from "../../../../Redux/features/teacher/teacher.api";
import {
    ChevronDownIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";
import showToast from "../../../../utils/toast";

const ManageQuize = () => {
    const { data: quizes } = useGetAllQuizesQuery();
    const [updateQuizStatus] = useUpdateQuizStatusMutation();
    const handleUpdateQuizStatus = async (quizId, value) => {
        try {
            const res = await updateQuizStatus({
                id: quizId,
                data: { status: value },
            });
            if (res.data) {
                showToast("success", "Success", "Quiz status updated successfully!");
            }
        } catch (error) {
            console.error(error);
            showToast("error", "Error", error.data.message);
        }
    };
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-bold">Quizes</h1>
                    <Link href={"/dashboard/teacher/quizes/add-quiz"}>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded">
                            Add Quiz <PlusCircleIcon className="size-5"></PlusCircleIcon>
                        </button>
                    </Link>
                </div>
                <input
                    type="text"
                    placeholder="Search Quiz..."
                    //   value={searchQuery}
                    //   onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-72 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            SL
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Total Marks
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Start Time
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Duration
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Created By
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pr-4 pl-3 sm:pr-6"
                                        >
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {quizes?.data?.map((quiz, i) => (
                                        <tr key={i}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                                                {i + 1}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                <Link href={`quizes/${quiz._id}`}>{quiz.title}</Link>
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {quiz.totalMarks}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {quiz.startTime
                                                    ? new Date(quiz?.startTime).toLocaleString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",

                                                        minute: "2-digit",
                                                        hour: "2-digit",
                                                        hour12: true,
                                                    })
                                                    : "Start time is not specified"}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {quiz.duration}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {quiz.createdBy || "Unknown"}
                                            </td>
                                            <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                                                <span
                                                    className={`inline-flex items-center rounded-full 
                          ${quiz.status === "Published"
                                                            ? "bg-green-50 text-green-700 ring-green-600/20"
                                                            : quiz.status === "Pending"
                                                                ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20"
                                                                : "bg-red-50 text-red-700 ring-red-600/20"
                                                        } px-2 py-1 text-xs font-medium  ring-1  ring-inset`}
                                                >
                                                    {quiz.status}
                                                </span>
                                            </td>
                                            <td className="relative py-4 pr-4 pl-3 flex gap-2 items-center text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                                                <div className="mt-2 grid grid-cols-1 border rounded">
                                                    <select
                                                        name="status"
                                                        onChange={(e) =>
                                                            handleUpdateQuizStatus(quiz._id, e.target.value)
                                                        }
                                                        value={quiz.status}
                                                        className="col-start-1  row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                    >
                                                        <option value={"Pending"}>Pending</option>
                                                        <option value={"Published"}>Published</option>
                                                        <option value={"Ended"}>Ended</option>
                                                    </select>
                                                    <ChevronDownIcon
                                                        aria-hidden="true"
                                                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                                    />
                                                </div>
                                                <button className="text-red-600">
                                                    <TrashIcon width={20}></TrashIcon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageQuize;
