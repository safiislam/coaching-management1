"use client";
import { use } from "react";
import { useGetSingleQuizQuery } from "../../../../../Redux/features/teacher/teacher.api";
import React from "react";

const QuizDetailsPage = ({ params }) => {
  const { id } = use(params);
  const { data } = useGetSingleQuizQuery(id, { skip: !id });
  const quiz = data?.data;
  return (
    <div>
      <h1 className="text-2xl font-bold">Quiz Details</h1>
      <div className="mt-6">
        <h2 className="font-medium text-lg">{quiz?.title}</h2>
        <p className="text-sm mt-2">
          <span>Total marks: </span> {quiz?.totalMarks}
        </p>
        <p className="text-sm mt-2">
          <span>Duration: </span> {quiz?.duration}
        </p>
        <div>
          <h3 className="font-medium mt-10">Scores of students</h3>
          <div className="mt-4 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr className="bg-zinc-100">
                      <th
                        scope="col"
                        className="py-3.5 pr-3 pl-4  text-center text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Sl
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Student Id
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {quiz?.studentScores.length > 0 ? (
                      quiz?.studentScores?.map((item, i) => (
                        <tr key={i}>
                          <td className="py-4 pr-3 pl-4 text-sm text-center font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                            {i + 1}
                          </td>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                            {item.studentId}
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {item.score}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center pt-4">
                          No one has submitted this quiz
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailsPage;
