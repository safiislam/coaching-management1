"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
const Breadcrumb = () => {
  const location = usePathname();
  const pathArray = location.split("/").slice(1); // Remove first empty string

  // Function to capitalize the first letter of each word
  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <nav className="text-black text-sm   ">
      <p className="font-medium flex items-center gap-1 bg-white p-2">
        {pathArray.map((item, index) => (
          <span key={index} className="flex items-center gap-4">
            {index > 0 && (
              <ChevronDoubleRightIcon className="size-5"></ChevronDoubleRightIcon>
            )}
            {capitalize(item)}
          </span>
        ))}
      </p>
    </nav>
  );
};

export default Breadcrumb;
