"use client";
import { jwtDecoded } from "../../../../../utils/decoded";
import {
  useGetAllBatchByCourseIdQuery,
  useGetAllCourseQuery,
} from "../../../../../Redux/features/Admin/admin.api";
import {
  ChevronDownIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateQuizMutation } from "../../../../../Redux/features/teacher/teacher.api";
import Papa from "papaparse";
import showToast from "../../../../../utils/toast";

const AddQuiz = () => {
  const { data: courses } = useGetAllCourseQuery();
  const [createQuiz] = useCreateQuizMutation();
  const [selectedCourseid, setSelectedCourseid] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [userEmail, setUserEmail] = useState("");
  const { data: batches } = useGetAllBatchByCourseIdQuery(selectedCourseid, {
    skip: !selectedCourseid,
  });

  useEffect(() => {
    const decodeToken = async () => {
      if (token) {
        try {
          const decodedData = await jwtDecoded(token);

          setUserEmail(decodedData?.email); // Assuming decodedData has a "email" field
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    };
    decodeToken();
  }, [token]);

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", ""],
      answer: "",
    },
  ]);

  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    startTime: "",
    duration: "",
    totalMarks: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "totalMarks") {
      setQuizData({ ...quizData, [name]: parseInt(value) });
    } else {
      setQuizData({ ...quizData, [name]: value });
    }
  };

  const handleAddNewOption = (e, questionIndex) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length < 4) {
      updatedQuestions[questionIndex].options.push("");
      setQuestions(updatedQuestions);
    } else {
      return showToast(
        "error",
        "Error",
        "Maximum of four options are allowed per question."
      );
    }
  };

  const handleNewQuestion = (e) => {
    e.preventDefault();
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", ""],
        answer: "",
      },
    ]);
  };

  const handleDeleteQuestion = (e, questionIndex) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };
  const handleDeleteOption = (e, questionIndex, optionIndex) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].options.length > 2) {
      const remainingOptions = updatedQuestions[questionIndex].options?.filter(
        (option, i) => optionIndex !== i
      );
      updatedQuestions[questionIndex].options = remainingOptions;
      setQuestions(updatedQuestions);
    } else {
      return showToast(
        "error",
        "Error",
        "At least two options are required for each question."
      );
    }
  };

  const handleChangeOption = (e, questionIndex, optionIndex, value) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswer = (e, questionIndex, value) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answer = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    try {
      const response = await createQuiz({
        ...quizData,
        questions,
        createdBy: userEmail,
        batchId: selectedBatchId,
      });
      console.log({
        ...quizData,
        questions,
        createdBy: userEmail,
        batchId: selectedBatchId,
      });
      if (response.data) {
        showToast("success", "Success", "Quiz Created successfully!");
        setQuizData({
          title: "",
          description: "",
          startTime: "",
          duration: "",
          totalMarks: 0,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleBatchSelect = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setSelectedBatchId(selectedOptions);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const formattedQuestions = results.data
          .map((item) => {
            const options = Object.keys(item)
              .filter((key) => key.toLowerCase().startsWith("option"))
              .map((key) => item[key])
              .filter(Boolean); // remove empty values

            return {
              question: item.question || "",
              options,
              answer: item.answer || "",
            };
          })
          .filter((q) => q.question);

        setQuestions(formattedQuestions);
      },
      error: (error) => {
        console.error("CSV Error:", error);
        alert("Failed to parse CSV file. Please check the format.");
      },
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 sm:mb-6">Create New Quiz</h1>
      <form>
        <div className="flex gap-5">
          <div className="bg-gray-100 p-5 rounded w-full xl:w-2/3">
            {/* quiz title  */}
            <div>
              <label
                htmlFor="name"
                className="ml-px block pl-2 text-sm/6 font-medium text-gray-900"
              >
                Quiz Title
              </label>
              <div className="mt-2">
                <input
                  value={quizData.title}
                  onChange={handleInputChange}
                  name="title"
                  type="text"
                  placeholder="Enter quiz title here..."
                  className="block w-full border rounded bg-white px-4 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/* quiz description   */}
            <div className="mt-4">
              <label
                htmlFor="name"
                className="ml-px block pl-2 text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  value={quizData.description}
                  onChange={handleInputChange}
                  name="description"
                  type="text"
                  placeholder="Enter quiz description here..."
                  className="block w-full border rounded bg-white px-4 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Upload CSV File
              </label>
              <div className="relative">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="csv-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        CSV files only (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                File should contain questions with options and answers in CSV
                format
              </p>
            </div>
            {/* quiz questions here  */}
            <div className="bg-white mt-8 p-4">
              {questions?.map((question, index) => {
                return (
                  <div key={index} className="mb-8 border-b pb-6">
                    <label
                      htmlFor="question"
                      className="ml-px flex items-center gap-4  pl-2 text-lg/6 font-medium text-gray-900"
                    >
                      Question {index + 1}{" "}
                      <button onClick={(e) => handleDeleteQuestion(e, index)}>
                        <TrashIcon className="text-red-600 size-5"></TrashIcon>
                      </button>
                    </label>
                    <div className="mt-2">
                      <input
                        name="question"
                        type="text"
                        placeholder={`Enter question ${index + 1} here...`}
                        value={question.question}
                        onChange={(e) =>
                          setQuestions(
                            questions.map((q, i) =>
                              i === index
                                ? { ...q, question: e.target.value }
                                : q
                            )
                          )
                        }
                        className="block w-full border rounded bg-white px-4 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                      />
                    </div>
                    <div className="mt-4 ml-6">
                      {/* Options */}
                      <label
                        htmlFor="options"
                        className="ml-px block pl-2 text-sm/6 font-medium text-gray-900"
                      >
                        Options
                      </label>

                      {/* Options */}
                      {question.options.map((option, i) => {
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2 ml-4 mt-2"
                          >
                            <input
                              onChange={(e) =>
                                handleChangeOption(e, index, i, e.target.value)
                              }
                              value={option}
                              className=" border px-2 flex-1 py-1 rounded"
                              type="text"
                              placeholder={`option ${i + 1}`}
                            ></input>
                            <button
                              onClick={(e) => handleDeleteOption(e, index, i)}
                            >
                              <TrashIcon
                                width={20}
                                className="text-red-600 "
                              ></TrashIcon>
                            </button>
                          </div>
                        );
                      })}
                      <button
                        onClick={(e) => handleAddNewOption(e, index)}
                        className="flex items-center mt-2 ml-4 gap-1 text-blue-600"
                      >
                        new option{" "}
                        <PlusCircleIcon
                          width={18}
                          className="text-blue-600"
                        ></PlusCircleIcon>
                      </button>
                      <label
                        htmlFor="options"
                        className="ml-px block pl-2 mt-4 text-sm/6 font-medium text-gray-900"
                      >
                        Define correct Answer
                      </label>
                      <select
                        className="border text-sm mx-2 rounded py-2 px-4 w-full mt-2"
                        value={questions[index].answer}
                        onChange={(e) => handleAnswer(e, index, e.target.value)}
                      >
                        <option value="">Select answer</option>
                        {question.options.map((option, j) => {
                          return (
                            <option key={j} value={option}>
                              {option}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                );
              })}
              <button
                onClick={handleNewQuestion}
                className="flex items-center bg-blue-600 rounded py-1 px-2 mt-2 ml-4 gap-1 text-white"
              >
                Add Question{" "}
                <PlusCircleIcon
                  width={18}
                  className="text-white"
                ></PlusCircleIcon>
              </button>
            </div>
          </div>
          <div className="bg-gray-100 w-full xl:w-1/3 rounded p-5">
            {/* Course */}
            <div>
              <label
                htmlFor="duration"
                className="ml-px block pl-2 text-sm/6 font-medium text-gray-900"
              >
                Select Course
              </label>
              <div className="mt-2">
                <div className="mt-2 grid grid-cols-1">
                  <select
                    name="courseId"
                    value={selectedCourseid}
                    onChange={(e) => setSelectedCourseid(e.target.value)}
                    className="col-start-1 row-start-1 w-full appearance-none rounded bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>Select a course</option>
                    {courses?.data?.result?.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
            </div>
            {/* batch */}
            <div className="mt-4">
              <label
                htmlFor="batch"
                className="ml-px block pl-2 text-sm/6 font-medium text-gray-900"
              >
                Select Batch
              </label>
              <div className="mt-2">
                <div className="mt-2 grid grid-cols-1">
                  <select
                    name="batchId"
                    value={selectedBatchId}
                    multiple
                    onChange={handleBatchSelect}
                    className="col-start-1 row-start-1 w-full appearance-none rounded bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    {batches?.data?.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
            </div>
            {/* Start Time */}
            <div className="mt-4">
              <label
                htmlFor="startTime"
                className="ml-px block pl-2 text-sm/6 font-medium text-gray-900"
              >
                Start time
              </label>
              <div className="mt-2">
                <input
                  value={quizData.startTime}
                  onChange={handleInputChange}
                  name="startTime"
                  type="datetime-local"
                  className="block w-full border rounded bg-white px-4 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/* Duration */}
            <div className="mt-4">
              <label
                htmlFor="duration"
                className="ml-px block pl-2 text-sm/6 font-medium text-gray-900"
              >
                Duration (minutes)
              </label>
              <div className="mt-2">
                <input
                  value={quizData.duration}
                  onChange={handleInputChange}
                  name="duration"
                  type="text"
                  placeholder="Enter quiz duration here..."
                  className="block w-full border rounded bg-white px-4 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/* Total Marks */}
            <div className="mt-4">
              <label
                htmlFor="totalMarks"
                className="ml-px block pl-2 text-sm/6 font-medium text-gray-900"
              >
                Total Marks
              </label>
              <div className="mt-2">
                <input
                  value={quizData.totalMarks || 0}
                  onChange={handleInputChange}
                  name="totalMarks"
                  type="number"
                  placeholder="Enter total marks here..."
                  className="block w-full border rounded bg-white px-4 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="  mt-10 ">
              <button
                type="submit"
                onClick={handleSubmitQuiz}
                className="flex  bg-blue-600 rounded py-2 px-3  gap-1 text-white"
              >
                Save Quiz
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddQuiz;
