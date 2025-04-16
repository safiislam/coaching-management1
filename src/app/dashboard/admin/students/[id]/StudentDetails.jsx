import React from 'react';
import { useGetAStudentDataQuery } from '../../../../../Redux/features/Admin/admin.api';
import placeholderImage from "../../../../../../public/images/theme/profile-placeholder.png";

const StudentDetails = ({ studentId }) => {
    const { data } = useGetAStudentDataQuery(studentId, {
        skip: !studentId
    });
    const profile = data?.data;
    return (
        <div className="max-w-3xl ml-24 pb-24">
            <div className="flex gap-5 items-center">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                    <img
                        fill
                        src={profile?.image || placeholderImage}
                        alt="profile-image"
                    />

                </div>
                <div>
                    <h3 className="capitalize text-xl font-semibold">
                        {profile?.firstName} {profile?.lastName}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-1">
                        Student ID: {profile?.studentId}
                    </p>
                </div>
            </div>
            <hr className="my-6" />
            <div className="">
                <h3 className="font-medium text-lg">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Full Name</p>
                        <p className="text-sm text-gray-900 font-medium capitalize">
                            {profile?.firstName} {profile?.lastName}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                        <p className="text-sm text-gray-900 font-medium capitalize">
                            {profile?.phone}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Date of Birth</p>
                        <p className="text-sm text-gray-900 font-medium">
                            {new Date(profile?.dateOfBirth).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Address</p>
                        <p className="text-sm text-gray-900 font-medium capitalize">
                            {profile?.address}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Gender</p>
                        <p className="text-sm text-gray-900 font-medium capitalize">
                            {profile?.gender}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Email </p>
                        <p className="text-sm text-gray-900 font-medium capitalize">
                            {profile?.email}
                        </p>
                    </div>
                </div>
            </div>
            <hr className="my-6" />
            <div className="">
                <h3 className="font-medium text-lg">Guardian Information</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Guardian Name</p>
                        <p className="text-sm text-gray-900 font-medium capitalize">
                            {profile?.guardianName}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">Guardian Number</p>
                        <p className="text-sm text-gray-900 font-medium capitalize">
                            {profile?.guardianPhone}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;