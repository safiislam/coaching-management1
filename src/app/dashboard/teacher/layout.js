import TeacherRoutes from "../../../privetRoutes/TeacherRoutes";
import React from "react";

const TeacherLayout = ({ children }) => {
  return <TeacherRoutes>{children}</TeacherRoutes>;
};

export default TeacherLayout;
