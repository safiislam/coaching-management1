import StudentRoutes from "../../../privetRoutes/StudentRoutes";
import React from "react";

const StudentLayout = ({ children }) => {
  return <StudentRoutes>{children}</StudentRoutes>;
};

export default StudentLayout;
