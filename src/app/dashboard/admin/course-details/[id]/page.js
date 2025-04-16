"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
const CourseDetailsPage = dynamic(() => import("./CourseDetailsPage"), {
  ssr: false,
});

const DynamicCoursePage = () => {
  const { id } = useParams();
  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default DynamicCoursePage;
