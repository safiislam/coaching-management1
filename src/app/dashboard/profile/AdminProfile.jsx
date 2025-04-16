"use client"
import React from 'react';
import { FiUser, FiMail, FiShield, FiCalendar, FiKey, FiClock } from 'react-icons/fi';

const AdminProfile = ({ adminData }) => {
    const admin = adminData;

    // Format dates to be more readable
    const createdAt = new Date(admin?.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const updatedAt = new Date(admin?.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{admin?.username}</h1>
                            <div className="flex items-center mt-2">
                                <FiShield className="mr-2" />
                                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    {admin?.role}
                                </span>
                            </div>
                        </div>
                        <div className="relative h-20 w-20 rounded-full border-4 border-white/30 bg-white/10 flex items-center justify-center">
                            <FiUser className="text-3xl text-white" />
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Account Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                <FiUser className="mr-2 text-blue-600" />
                                Account Information
                            </h2>

                            <InfoCard
                                icon={<FiMail />}
                                label="Email"
                                value={admin?.email}
                            />

                            <InfoCard
                                icon={<FiShield />}
                                label="Role"
                                value={admin?.role}
                            />

                            <InfoCard
                                icon={<FiKey />}
                                label="Password Status"
                                value={admin?.needPasswordChange ? "Change Required" : "Up to Date"}
                                status={admin?.needPasswordChange ? "warning" : "success"}
                            />
                        </div>

                        {/* System Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                                <FiClock className="mr-2 text-blue-600" />
                                System Information
                            </h2>

                            <InfoCard
                                icon={<FiCalendar />}
                                label="Account Created"
                                value={createdAt}
                            />

                            <InfoCard
                                icon={<FiClock />}
                                label="Last Updated"
                                value={updatedAt}
                            />

                            {/* <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                                    Admin ID
                                </p>
                                <p className="text-sm font-mono text-gray-700">
                                    {admin?._id}
                                </p>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="bg-gray-50 px-6 py-4 border-t flex justify-end space-x-3">
                    <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition flex items-center">
                        Edit Profile
                    </button>
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center">
                        Change Password
                    </button>
                </div> */}
            </div>
        </div>
    );
};

// Reusable Info Card Component
const InfoCard = ({ icon, label, value, status = "default" }) => {
    const statusColors = {
        default: "bg-gray-50 text-gray-800",
        success: "bg-green-50 text-green-800",
        warning: "bg-yellow-50 text-yellow-800",
        error: "bg-red-50 text-red-800"
    };

    return (
        <div className={`${statusColors[status]} p-4 rounded-lg`}>
            <div className="flex items-start">
                <div className="p-2 bg-white rounded-full mr-3 shadow-sm">
                    {React.cloneElement(icon, { className: "text-gray-600" })}
                </div>
                <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;