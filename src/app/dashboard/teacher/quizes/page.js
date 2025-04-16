"use client";
import dynamic from "next/dynamic";
const ManageQuize = dynamic(() => import("./ManageQuize"), {
  ssr: false,
});
const Quizes = () => {
  return (
    <div>
      <ManageQuize />
    </div>
  );
};

export default Quizes;
