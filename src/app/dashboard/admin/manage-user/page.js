"use client";

import dynamic from "next/dynamic";
const ManageUser = dynamic(() => import("./ManageUser"), {
  ssr: false,
});

const UserPage = () => {
  return (
    <div>
      <ManageUser />
    </div>
  );
};

export default UserPage;
