"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../../Components/Sidebar";
import Breadcrumb from "../../Components/Breadcrumb";
import PrivetRoutes from "../../privetRoutes/PrivetRoutes";
import { useDispatch } from "react-redux";
import { logOut } from "../../Redux/features/Auth/auth.slice";
import { baseApi } from "../../Redux/Api/baseApi";

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle user menu visibility
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Sidebar Toggle Button (Mobile) */}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-600 focus:outline-none lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-indigo-600 inline-block md:hidden">
                Dashboard
              </h1>
            </div>

            {/* Notification and User Avatar */}
            <div className="flex items-center">
              {/* Notification Icon */}
              <button className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* User Avatar */}
              <div className="relative ml-4">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center focus:outline-none"
                >
                  <span className="inline-block size-8 border border-zinc-200 overflow-hidden rounded-full bg-gray-100">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="size-full text-gray-300"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logOut());
                          dispatch(
                            baseApi.util.invalidateTags([
                              "course",
                              "class",
                              "user",
                              "student",
                              "event",
                              "batch",
                              "subject",
                              "schedule",
                              "payment",
                              "enroll",
                              "agreement",
                              "quiz",
                              "exam",
                              "submission",
                            ])
                          );
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="flex w-full pt-16">
        {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-1 lg:p-4 xl:ml-64 w-full">
          <div className="my-4">
            <Breadcrumb />
          </div>
          <div
            style={{ minWidth: "calc(100% - 256px)" }}
            className="bg-white  w-full   p-6 rounded-lg shadow-md"
          >
            <PrivetRoutes>{children}</PrivetRoutes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
