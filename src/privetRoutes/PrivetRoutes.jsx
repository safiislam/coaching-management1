"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        // Check authentication when component mounts or token changes
        if (!token) {
            router.push("/login");
        } else {
            setIsAuthorized(true);
        }
    }, [token, router]);

    if (isAuthorized === null) {
        // Show loading state while checking auth
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthorized) {
        // Already redirected in useEffect, return null here
        return null;
    }

    return <>{children}</>;
};

export default PrivateRoutes;