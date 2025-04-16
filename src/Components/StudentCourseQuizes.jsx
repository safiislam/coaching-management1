import { HandRaisedIcon } from "@heroicons/react/20/solid";
import { useGetAllQuizesByBatchIdQuery } from "../Redux/features/Student/student.api";
import React from "react";
import Link from "next/link";

const StudentCourseQuizes = ({ batchId }) => {
  console.log(batchId);
  const { data: quizes } = useGetAllQuizesByBatchIdQuery(batchId);
  console.log(quizes);
  return (
    <div>
      <h3 className="text-lg font-semibold">All Quizes</h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {quizes?.data?.map((quiz) => (
          <div
            key={quiz?._id}
            className="col-span-1 divide-y divide-gray-200 border rounded-lg bg-white shadow"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <h3 className="truncate text-lg capitalize font-medium text-gray-900">
                  {quiz?.title}
                </h3>

                <p className="mt-0.5 truncate text-sm text-gray-500">
                  {quiz?.description}
                </p>
                <div className="flex items-center gap-10 mt-4">
                  <p className="  text-xs text-gray-500">
                    Total Questions <br></br>{" "}
                    <span className="font-semibold">
                      {quiz?.questions.length}
                    </span>
                  </p>
                  <p className="  text-xs text-gray-500">
                    Total Marks<br></br>{" "}
                    <span className="font-semibold">{quiz?.totalMarks}</span>
                  </p>
                </div>
                <div className="flex items-center  gap-10  mt-1">
                  <p className="mt-3  text-xs text-gray-500">
                    Duration<br></br>{" "}
                    <span className="font-semibold">
                      {quiz?.duration} minutes
                    </span>
                  </p>
                  <p className="mt-3 text-xs text-gray-500">
                    Created By <br></br>{" "}
                    <span className="font-semibold">{quiz?.createdBy}</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <Link
                    href={`/dashboard/student/quiz-details/${quiz._id}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                  >
                    Attend
                    <HandRaisedIcon
                      aria-hidden="true"
                      className="size-5 text-blue-500"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourseQuizes;
