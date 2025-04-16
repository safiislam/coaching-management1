import {
    FaHome,
    FaShoppingCart,
    FaUsers,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaFileContract,
    FaBook,
    FaLayerGroup,
    FaMoneyBillWave,
    FaClipboardList,
    FaImage,
    FaBookOpen,
    FaCalendarAlt,
    FaClipboardCheck,
    FaFileAlt,
    FaUniversity,
    FaCreditCard
} from "react-icons/fa";

export const adminSidebar = [
    { path: "/dashboard", label: "Dashboard", icon: <FaHome size={18} /> },
    { path: "/dashboard/admin", label: "Admin", icon: <FaShoppingCart size={18} /> },
    { path: "/dashboard/admin/create-admission", label: "Admission", icon: <FaUserGraduate size={18} /> },
    { path: "/dashboard/admin/students", label: "Students", icon: <FaUsers size={18} /> },
    { path: "/dashboard/admin/teachers", label: "Teachers", icon: <FaChalkboardTeacher size={18} /> },
    { path: "/dashboard/admin/agreements", label: "Agreements", icon: <FaFileContract size={18} /> },
    { path: "/dashboard/admin/manage-user", label: "Manage User", icon: <FaUsers size={18} /> },
    { path: "/dashboard/admin/create-course", label: "Create Course", icon: <FaBook size={18} /> },
    { path: "/dashboard/admin/manage-course", label: "Manage Course", icon: <FaLayerGroup size={18} /> },
    { path: "/dashboard/admin/manage-subject", label: "Manage Subject", icon: <FaBookOpen size={18} /> },
    { path: "/dashboard/admin/schedule-modification", label: "Modification Schedule", icon: <FaCalendarAlt size={18} /> },
    { path: "/dashboard/admin/manage-payment", label: "Manage Payment", icon: <FaMoneyBillWave size={18} /> },
    { path: "/dashboard/admin/manage-enrollment", label: "Manage Enrollment", icon: <FaClipboardList size={18} /> },
    { path: "/dashboard/admin/manage-banner", label: "Manage Banner", icon: <FaImage size={18} /> }
];

export const teacherSidebar = [
    { path: "/dashboard/teacher", label: "Dashboard", icon: <FaHome size={18} /> },
    // { path: "/dashboard/teacher/course", label: "Courses", icon: <FaBook size={18} /> },
    { path: "/dashboard/teacher/quizes", label: "Quizes", icon: <FaClipboardCheck size={18} /> },
    { path: "/dashboard/teacher/schedule", label: "Schedule", icon: <FaCalendarAlt size={18} /> },
    { path: "/dashboard/teacher/schedule-modification", label: "Modification Schedule", icon: <FaCalendarAlt size={18} /> },
    { path: "/dashboard/teacher/manage-exam", label: "Manage Exam", icon: <FaFileAlt size={18} /> },
    { path: "/dashboard/teacher/manage-submission", label: "Manage Submission", icon: <FaFileAlt size={18} /> }
];

export const staffRoutes = [
    { path: "/dashboard/staff", label: "Dashboard", icon: <FaHome size={18} /> },
    { path: "/dashboard/staff/admission-student", label: "Admission Student", icon: <FaUserGraduate size={18} /> },
    { path: "/dashboard/staff/manage-student", label: "Manage Student", icon: <FaUsers size={18} /> },
    { path: "/dashboard/staff/manage-event", label: "Manage Event", icon: <FaCalendarAlt size={18} /> }
];

export const studentRoutes = [
    { path: "/dashboard/student", label: "Dashboard", icon: <FaHome size={18} /> },
    { path: "/dashboard/student/all-transactions", label: "All Transactions", icon: <FaCreditCard size={18} /> },
    { path: "/dashboard/student/enrolled-courses", label: "Enrolled Courses", icon: <FaUniversity size={18} /> }
];