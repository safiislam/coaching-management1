"use client";
import { useGetMeQuery } from "../../../Redux/features/Auth/auth.api";
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { jwtDecoded } from "../../../utils/decoded";
import AdminProfile from "./AdminProfile";

const ProfilePage = () => {
  const { data } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const profile = data?.data;
  const [role, setRole] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const decodeToken = async () => {
      if (token) {
        const decoded = await jwtDecoded(token);
        setRole(decoded.role);
      } else {
        setRole("");
      }
    };

    decodeToken();
  }, [token]);
  return (
    <div>
      {role === "Student" && <StudentProfile profile={profile} />}

      {role === "Teacher" && <TeacherProfile teacherData={profile} />}
      {role === "Admin" && <AdminProfile adminData={profile} />}
    </div>
  );
};

export default ProfilePage;
