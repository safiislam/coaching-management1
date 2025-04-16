"use client";

import { useGetMeQuery } from "../../../../../Redux/features/Auth/auth.api";
import {
  useCheckQuizResponseMutation,
  useGetSingleQuizQuery,
} from "../../../../../Redux/features/Student/student.api";
import React, { use, useState } from "react";
import Dialog from "../../../../../Components/Dialog";
import showToast from "../../../../../utils/toast";

const QuizDetailsPage = ({ params }) => {
  const { id } = use(params);
  const { data } = useGetSingleQuizQuery(id);
  const { data: profile } = useGetMeQuery();
  const [checkQuizResponse] = useCheckQuizResponseMutation();
  const [responses, setResponses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scoreResponse, setScoreResponse] = useState({});
  const quiz = data?.data || {};
  const studentId = profile?.data?._id;
  const handleAnswer = (e) => {
    const { name, value } = e.target;

    const prevQuestion = responses.find((res) => res.question === name);

    if (prevQuestion) {
      prevQuestion.selectedAnswer = value;
      return;
    } else {
      setResponses((prev) => [
        ...prev,
        { question: name, selectedAnswer: value },
      ]);
    }
  };
  const handleSubmit = async () => {
    try {
      const result = await checkQuizResponse({
        quizId: id,
        data: {
          studentId,
          responses,
        },
      });
      if (result.data) {
        console.log(result);
        setIsModalOpen(true);
        setScoreResponse(result.data.data);
        showToast("success", "Success", "Quiz submitted successfully!");
      } else {
        showToast("error", "Error", result.error.data.message);
      }
    } catch (e) {
      showToast("error", "Error", e.error.data.message);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  console.log(scoreResponse);
  return (
    <div>
      <div className="mt-5">
        {/* Quiz Title */}
        <h4 className="text-2xl capitalize font-semibold">{quiz?.title}</h4>
        {/* Quiz Description */}
        <p className="text-sm mt-2">{quiz?.description}</p>
      </div>
      <div className="mt-5 bg-gray-100 p-10">
        <h4 className="text-base capitalize font-semibold">Questions</h4>
        <hr></hr>
        {/* Quiz Questions */}
        {quiz?.questions?.map((question, index) => (
          <div key={index} className="mt-5">
            <h6 className="text-xl font-semibold">
              {index + 1}. {question.question}
            </h6>
            <div className="flex items-center gap-6 text-sm mt-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="radio"
                    onChange={handleAnswer}
                    name={question.question}
                    value={option}
                  />{" "}
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <hr className="mt-6"></hr>
        <div className="mt-6 flex gap-2">
          <button
            onClick={handleSubmit}
            className="text-sm bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
        <Dialog isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="p-10">
            <h4 className="text-xl text-center  font-semibold">
              Quiz Submission
            </h4>
            <p className="text-center my-3 flex flex-col text-lg ">
              Score
              <span className="text-4xl text-blue-700 font-bold text-center">
                {" "}
                {scoreResponse.score}
              </span>
            </p>
            {scoreResponse?.result?.map((res, i) => {
              return (
                <div
                  key={i}
                  className={`border mt-4 p-5 rounded ${
                    res.isCorrect
                      ? "bg-green-50 border-green-700"
                      : "bg-red-50 border-red-700"
                  }`}
                >
                  <p className="font-semibold text-xl">
                    {i + 1} - {res.question}
                  </p>
                  <p className="text-sm mt-2">
                    Your Answer: {res.selectedAnswer}
                  </p>
                  <p className="text-sm ">
                    Correct Answer: {res.correctAnswer}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleModalClose}
              className="text-sm bg-gray-400 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default QuizDetailsPage;
