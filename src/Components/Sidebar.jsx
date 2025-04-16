"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MdCancel } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecoded } from "../utils/decoded";
import { logOut } from "../Redux/features/Auth/auth.slice";

import { baseApi } from "../Redux/Api/baseApi";
import { adminSidebar, staffRoutes, teacherSidebar, studentRoutes } from "../utils/navitems";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const pathname = usePathname(); // Get current route
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");

  useEffect(() => {
    const decodeToken = async () => {
      if (token) {
        try {
          const decodedData = await jwtDecoded(token);

          setRole(decodedData?.role || ""); // Assuming decodedData has a "role" field
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    };
    decodeToken();
  }, [token]);


  let navItem = [];

  switch (role) {
    case "Admin":
      navItem = adminSidebar;
      break;
    case "Teacher":
      navItem = teacherSidebar;
      break;
    case "Staff":
      navItem = staffRoutes;
      break;
    case "Student":
      navItem = studentRoutes;
      break;
    default:
      navItem = [];
      break;
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white shadow-lg overflow-y-auto overflow-x-hidden transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Sidebar Header */}
      <div className="p-6 flex justify-between items-center border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">{role} Panel</h1>
        <button
          onClick={toggleSidebar}
          className="text-gray-300 md:hidden hover:text-white focus:outline-none"
        >
          <MdCancel size={26} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        <ul className="space-y-2">
          {navItem.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`
            flex items-center gap-4 px-6 py-3 rounded-lg transition-all
            duration-200 ease-in-out
            ${isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white hover:shadow-sm"
                    }
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
            ${isActive ? "font-semibold" : "font-medium"}
          `}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className={`${isActive ? "text-white" : "text-gray-400"}`}>
                    {item.icon}
                  </span>
                  <span className="text-base">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        <span className=" mt-8" >
          <Link
            href={'/'}
            className={`flex items-center  gap-4 px-6 py-3 rounded-md transition-all duration-300 
          
              text-gray-400 hover:bg-gray-800 hover:text-white
              `}
          >
            <FaHome size={18} />
            <span className="text-lg font-medium">Home</span>
          </Link>
        </span>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-6 border-t border-gray-700">
        <button
          onClick={() => {
            dispatch(logOut());
            dispatch(baseApi.util.invalidateTags([
              'course',
              'class',
              'user',
              'student',
              'event',
              'batch',
              'subject',
              'schedule',
              'payment',
              'enroll',
              'agreement',
              'quiz',
              'exam',
              'submission',
            ]))
          }}
          className="w-full flex items-center gap-4 px-6 py-3 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-lg font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
