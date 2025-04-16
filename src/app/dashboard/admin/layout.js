import AdminRoutes from "../../../privetRoutes/AdminRoutes";
import React from "react";

const AdminLayout = ({ children }) => {
  return <AdminRoutes>{children}</AdminRoutes>;
};

export default AdminLayout;
