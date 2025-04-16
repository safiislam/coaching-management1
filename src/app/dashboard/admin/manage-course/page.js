// app/dashboard/admin/manage-course/page.tsx
"use client";

import dynamic from "next/dynamic";

// Dynamically import the ManageCourse component with SSR disabled
const ManageCourse = dynamic(() => import("./ManageCourse"), {
  ssr: false,
});

const Page = () => {
  return <ManageCourse />;
};

export default Page;
