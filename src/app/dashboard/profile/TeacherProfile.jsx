"use client"
const TeacherProfile = ({ teacherData }) => {
    const formattedJoinDate = new Date(teacherData?.joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl p-6 text-white">
                    <h1 className="text-3xl font-bold">Teacher Profile</h1>
                    <p className="opacity-90">Detailed information about the teacher</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-b-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Left Side - Profile Image */}
                        <div className="md:w-1/3 bg-indigo-50 p-8 flex flex-col items-center">
                            <div className="relative w-40 h-40 rounded-full border-4 border-white shadow-lg mb-6 overflow-hidden bg-white">
                                {teacherData?.image ? (
                                    <img
                                        src={teacherData?.image}
                                        alt={teacherData?.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                                        <span className="text-6xl font-bold text-indigo-600">
                                            {teacherData?.name?.charAt(0)?.toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">{teacherData?.name}</h2>
                            <p className="text-indigo-600 font-medium mb-4">{teacherData?.subject.name} Teacher</p>
                            <div className="w-full bg-white rounded-lg p-4 shadow-sm">
                                <p className="text-sm text-gray-500">Member Since</p>
                                <p className="font-semibold">{formattedJoinDate}</p>
                            </div>
                        </div>

                        {/* Right Side - Details */}
                        <div className="md:w-2/3 p-8">
                            {/* Personal Information */}
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InfoCard label="Age" value={`${teacherData?.age} years`} icon="calendar" />
                                    <InfoCard label="Email" value={teacherData?.email} icon="mail" />
                                    <InfoCard label="Contact Number" value={teacherData?.contactNumber} icon="phone" />
                                    <InfoCard label="NID Number" value={teacherData?.nidNumber} icon="identification" />
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Professional Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <InfoCard label="Subject" value={teacherData?.subject.name} icon="book-open" />
                                    <InfoCard label="Join Date" value={formattedJoinDate} icon="clock" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer with Actions */}
                    {/* <div className="bg-gray-50 px-8 py-4 border-t flex justify-end space-x-3">
                        <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </button>
                        <button className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Profile
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

// Reusable Info Card Component
const InfoCard = ({ label, value, icon }) => {
    const icons = {
        calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        mail: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
        identification: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
        'book-open': "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    };

    return (
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-indigo-50 transition cursor-default">
            <div className="flex items-start">
                <div className="p-2 bg-indigo-100 rounded-full mr-3">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[icon]} />
                    </svg>
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                    <p className="text-lg font-semibold text-gray-800">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;