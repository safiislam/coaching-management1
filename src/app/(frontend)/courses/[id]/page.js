"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
const CourseDetailsPage = dynamic(() => import("./CourseDetailsPage"), {
  ssr: false,
});

const CourseDetails = ({ params }) => {
  const { id } = useParams(params);

  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default CourseDetails;
