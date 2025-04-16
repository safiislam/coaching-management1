"use client";
import React, { useEffect, useState } from 'react';
import {
    useGetSyllabusQuery,
    useCreateSyllabusMutation,
    useDeleteSyllabusMutation,
    useUpdateSyllabusMutation
} from '../../../../../Redux/features/Admin/admin.api';
import showToast from '../../../../../utils/toast';

const ManageSyllabus = ({ courseId }) => {
    // Default syllabus structure
    const defaultSyllabus = {
        overview: "",
        courseId: courseId || "",
        modules: [{
            moduleTitle: "",
            lessons: [{
                title: "",
                content: [""],
            }],
        }],
    };

    const [syllabus, setSyllabus] = useState(defaultSyllabus);
    const { data: syllabuses, refetch } = useGetSyllabusQuery(courseId, { skip: !courseId });
    const [createSyllabus] = useCreateSyllabusMutation();
    const [updateSyllabus] = useUpdateSyllabusMutation();
    const [deleteSyllabus] = useDeleteSyllabusMutation();

    const syllabusData = syllabuses?.data;

    // Initialize with default or fetched data
    useEffect(() => {
        if (syllabusData) {
            setSyllabus({
                overview: syllabusData.overview || "",
                courseId: courseId || "",
                modules: syllabusData.modules?.length > 0
                    ? syllabusData.modules
                    : defaultSyllabus.modules
            });
        } else {
            setSyllabus(defaultSyllabus);
        }
    }, [syllabusData, courseId]);

    // Handle form submission
    const handleSubmit = async () => {
        console.log(syllabus);
        try {

            const response = await createSyllabus(syllabus);

            if (response.data) {
                showToast("success", "Success", `Syllabus ${syllabusData ? 'Update' : 'Create'} Successfully`);
            }
            if (response.error) {
                showToast("error", "Error", response.error.data.message);
            }
            refetch();

        } catch (error) {
            console.error('Error saving syllabus:', error);
            alert('Failed to save syllabus');
        }
    };

    // Handle syllabus deletion
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this syllabus?')) {
            try {

                const response = await deleteSyllabus(courseId);
                if (response.data) {
                    showToast("success", "Success", "Syllabus delete Successfully");

                }
                if (response.error) {
                    showToast("error", "Error", response.error.data.message);
                }
                setSyllabus(defaultSyllabus);
                refetch();
            } catch (error) {
                console.error('Error deleting syllabus:', error);
                alert('Failed to delete syllabus');
            }
        }
    };

    // CRUD operations for modules
    const addModule = () => {
        setSyllabus(prev => ({
            ...prev,
            modules: [
                ...prev.modules,
                { moduleTitle: "", lessons: [{ title: "", content: [""] }] }
            ]
        }));
    };

    const updateModule = (moduleIndex, updatedModule) => {
        const updatedModules = [...syllabus.modules];
        updatedModules[moduleIndex] = updatedModule;
        setSyllabus({ ...syllabus, modules: updatedModules });
    };

    const removeModule = (moduleIndex) => {
        const updatedModules = syllabus.modules.filter((_, index) => index !== moduleIndex);
        setSyllabus({
            ...syllabus,
            modules: updatedModules.length ? updatedModules : [{ moduleTitle: "", lessons: [] }]
        });
    };

    // Add a new lesson to a module (immutable)
    const addLesson = (moduleIndex) => {
        setSyllabus(prev => {
            const newModules = [...prev.modules];
            newModules[moduleIndex] = {
                ...newModules[moduleIndex],
                lessons: [
                    ...newModules[moduleIndex].lessons,
                    { title: "", content: [""] }
                ]
            };
            return { ...prev, modules: newModules };
        });
    };

    // Update an existing lesson (immutable)
    const updateLesson = (moduleIndex, lessonIndex, updatedLesson) => {
        setSyllabus(prev => {
            const newModules = [...prev.modules];
            newModules[moduleIndex] = {
                ...newModules[moduleIndex],
                lessons: newModules[moduleIndex].lessons.map((lesson, idx) =>
                    idx === lessonIndex ? updatedLesson : lesson
                )
            };
            return { ...prev, modules: newModules };
        });
    };

    // Remove a lesson from a module (immutable)
    const removeLesson = (moduleIndex, lessonIndex) => {
        setSyllabus(prev => {
            const newModules = [...prev.modules];
            newModules[moduleIndex] = {
                ...newModules[moduleIndex],
                lessons: newModules[moduleIndex].lessons.filter(
                    (_, index) => index !== lessonIndex
                )
            };
            return { ...prev, modules: newModules };
        });
    };

    // Correct way to update content lines
    const updateContentLine = (moduleIndex, lessonIndex, contentIndex, value) => {
        setSyllabus(prev => {
            // Create deep copy of modules array
            const updatedModules = [...prev.modules];

            // Create new lesson object with updated content
            updatedModules[moduleIndex] = {
                ...updatedModules[moduleIndex],
                lessons: updatedModules[moduleIndex].lessons.map((lesson, lIndex) => {
                    if (lIndex === lessonIndex) {
                        return {
                            ...lesson,
                            content: lesson.content.map((c, cIndex) =>
                                cIndex === contentIndex ? value : c
                            )
                        };
                    }
                    return lesson;
                })
            };

            return {
                ...prev,
                modules: updatedModules
            };
        });
    };

    // Correct way to add content line
    const addContentLine = (moduleIndex, lessonIndex) => {
        setSyllabus(prev => {
            const updatedModules = [...prev.modules];
            updatedModules[moduleIndex] = {
                ...updatedModules[moduleIndex],
                lessons: updatedModules[moduleIndex].lessons.map((lesson, lIndex) => {
                    if (lIndex === lessonIndex) {
                        return {
                            ...lesson,
                            content: [...lesson.content, ""]
                        };
                    }
                    return lesson;
                })
            };
            return {
                ...prev,
                modules: updatedModules
            };
        });
    };

    // Correct way to remove content line
    const removeContentLine = (moduleIndex, lessonIndex, contentIndex) => {
        setSyllabus(prev => {
            const updatedModules = [...prev.modules];
            updatedModules[moduleIndex] = {
                ...updatedModules[moduleIndex],
                lessons: updatedModules[moduleIndex].lessons.map((lesson, lIndex) => {
                    if (lIndex === lessonIndex) {
                        return {
                            ...lesson,
                            content: lesson.content.filter((_, cIndex) => cIndex !== contentIndex)
                        };
                    }
                    return lesson;
                })
            };
            return {
                ...prev,
                modules: updatedModules
            };
        });
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Overview Section */}
            <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Course Overview</label>
                <textarea
                    value={syllabus.overview}
                    onChange={(e) => setSyllabus({ ...syllabus, overview: e.target.value })}
                    className="w-full p-3 border rounded-md"
                    rows={4}
                />
            </div>

            {/* Modules List */}
            {syllabus.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="mb-6 border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <input
                            type="text"
                            value={module.moduleTitle}
                            onChange={(e) => updateModule(moduleIndex, {
                                ...module,
                                moduleTitle: e.target.value
                            })}
                            className="flex-grow p-2 border rounded-md"
                            placeholder="Module Title"
                        />
                        <button
                            onClick={() => removeModule(moduleIndex)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Delete Module
                        </button>
                    </div>

                    {/* Lessons List */}
                    {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="ml-4 mb-4 pl-4 border-l">
                            <div className="flex items-center gap-3 mb-2">
                                <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => updateLesson(moduleIndex, lessonIndex, {
                                        ...lesson,
                                        title: e.target.value
                                    })}
                                    className="flex-grow p-2 border rounded-md"
                                    placeholder="Lesson Title"
                                />
                                <button
                                    onClick={() => removeLesson(moduleIndex, lessonIndex)}
                                    className="text-red-500 hover:text-red-700 text-sm"
                                >
                                    Delete Lesson
                                </button>
                            </div>

                            {/* Content Lines */}
                            {lesson.content.map((content, contentIndex) => (
                                <div key={contentIndex} className="ml-4 mb-2 flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={content}
                                        onChange={(e) => updateContentLine(
                                            moduleIndex,
                                            lessonIndex,
                                            contentIndex,
                                            e.target.value
                                        )}
                                        className="flex-grow p-2 border rounded-md"
                                        placeholder="Content line"
                                    />
                                    <button
                                        onClick={() => removeContentLine(moduleIndex, lessonIndex, contentIndex)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addContentLine(moduleIndex, lessonIndex)}
                                className="ml-4 text-blue-500 hover:text-blue-700 text-sm"
                            >
                                + Add Content Line
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => addLesson(moduleIndex)}
                        className="ml-4 text-green-500 hover:text-green-700"
                    >
                        + Add Lesson
                    </button>
                </div>
            ))}

            {/* Add Module Button */}
            <button
                onClick={addModule}
                className="mb-6 text-green-500 hover:text-green-700"
            >
                + Add Module
            </button>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
                {syllabusData && (
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete Syllabus
                    </button>
                )}
                <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ml-auto"
                >
                    {syllabusData ? 'Update Syllabus' : 'Create Syllabus'}
                </button>
            </div>
        </div>
    );
};

export default ManageSyllabus;