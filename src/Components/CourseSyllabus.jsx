"use client";
import { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import { useGetSyllabusQuery } from "../Redux/features/Admin/admin.api";

const CourseSyllabus = ({ courseId }) => {
    const [expandedModules, setExpandedModules] = useState({});
    const { data: syllabuses } = useGetSyllabusQuery(courseId, { skip: !courseId });
    const syllabus = syllabuses?.data;

    const toggleModule = (index) => {
        setExpandedModules(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                    Course Learning Path
                </h2>
                <p className="text-xl text-gray-600 max-w-xl mx-auto">
                    {syllabus?.overview || "A structured journey through the course content"}
                </p>
            </div>

            <div className="space-y-6">
                {syllabus?.modules?.map((module, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <button
                            onClick={() => toggleModule(index)}
                            className="w-full flex justify-between items-center px-8 py-6 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold">
                                    {index + 1}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 text-left">
                                    {module.moduleTitle}
                                </h3>
                            </div>
                            {expandedModules[index] ? (
                                <MinusIcon className="w-6 h-6 text-gray-500" />
                            ) : (
                                <PlusIcon className="w-6 h-6 text-gray-500" />
                            )}
                        </button>

                        {expandedModules[index] && (
                            <div className="px-8 pb-6 pt-2 border-t border-gray-100">
                                <div className="space-y-4">
                                    {module.lessons?.map((lesson, i) => (
                                        <div key={i} className="pl-6 border-l-2 border-blue-200">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 mt-1.5">
                                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                </div>
                                                <div className="ml-4">
                                                    <h4 className="text-lg font-medium text-gray-800">
                                                        {lesson.title}
                                                    </h4>
                                                    {lesson.content?.length > 0 && (
                                                        <ul className="mt-2 space-y-2">
                                                            {lesson.content.map((point, idx) => (
                                                                <li key={idx} className="text-gray-600 flex items-start">
                                                                    <span className="flex-shrink-0 mt-1 mr-2">
                                                                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                        </svg>
                                                                    </span>
                                                                    <span>{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseSyllabus;