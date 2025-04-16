"use client";
import { useGetSingleExamOfStudentQuery } from "../../../../../Redux/features/Student/student.api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateSubmission from "./CreateSubmission";

const ExamPage = () => {
  const { id } = useParams();
  const { data } = useGetSingleExamOfStudentQuery(id, { skip: !id });

  // Function to extract the first link from the description
  const extractLink = (description) => {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const matches = description?.match(urlRegex);
    return matches ? matches[0] : null; // Return the first link found (or null if none)
  };
  const exam = data?.data || {};
  console.log(exam.dateline);
  console.log(exam.time);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!exam?.dateline || !exam?.time) return;

    const interval = setInterval(() => {
      const now = new Date();
      const deadline = new Date(exam.dateline);
      deadline.setMinutes(deadline.getMinutes() + exam.time); // add exam.time (in minutes)

      const diff = deadline.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Exam time has passed.");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [exam.dateline, exam.time]);

  if (!data || !data.success) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500">
          No exam data found or an error occurred.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Banner Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-4">
            {exam.title}
          </h1>
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">Subject:</span>{" "}
              {exam.subjectId.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">Deadline:</span>{" "}
              {new Date(exam.dateline).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">Max Score:</span>{" "}
              {exam.maxScore}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">Time Left:</span>{" "}
              {timeLeft}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold text-indigo-600">Time:</span>{" "}
              {exam.time} Minute
            </p>
            {
              <p className="text-gray-700">
                <span className="font-semibold text-indigo-600">
                  Question Link:
                </span>{" "}
                <a
                  href={exam.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Click here to open
                </a>
              </p>
            }
            {extractLink(exam.description) && (
              <p className="text-gray-700">
                <span className="font-semibold text-indigo-600">
                  Extra Link:
                </span>{" "}
                <a
                  href={extractLink(exam.description)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Click here to open
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Additional Content (if needed) */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Exam Description
          </h2>
          <p className="text-gray-700 whitespace-pre-line">
            {exam.description}
          </p>
        </div>
        <CreateSubmission examId={id} />
      </div>
    </div>
  );
};

export default ExamPage;
