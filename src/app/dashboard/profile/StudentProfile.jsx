"use client"
import placeholderImage from "../../../../public/images/theme/profile-placeholder.png";
import Image from 'next/image';

const StudentProfile = ({ profile }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-100">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <Image
                        fill
                        src={profile?.image || placeholderImage}
                        alt="profile-image"
                        className="object-cover"
                    />
                </div>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800 capitalize">
                        {profile?.firstName} {profile?.lastName}
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            Student
                        </span>
                        <span className="text-sm text-gray-500">
                            ID: {profile?.studentId}
                        </span>
                    </div>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="py-6 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Full Name" value={`${profile?.firstName} ${profile?.lastName}`} />
                    <InfoField label="Email" value={profile?.email} />
                    <InfoField label="Phone Number" value={profile?.phone} />
                    <InfoField
                        label="Date of Birth"
                        value={new Date(profile?.dateOfBirth).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    />
                    <InfoField label="Gender" value={profile?.gender} capitalize />
                    <InfoField label="Address" value={profile?.address} />
                </div>
            </div>

            {/* Guardian Information Section */}
            <div className="py-6">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    <h2 className="text-lg font-semibold text-gray-800">Guardian Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Guardian Name" value={profile?.guardianName} />
                    <InfoField label="Guardian Phone" value={profile?.guardianPhone} />
                </div>
            </div>
        </div>
    );
};

// Reusable Info Field Component
const InfoField = ({ label, value, capitalize = false }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-sm font-medium text-gray-800 ${capitalize ? 'capitalize' : ''}`}>
                {value || 'N/A'}
            </p>
        </div>
    );
};

export default StudentProfile;