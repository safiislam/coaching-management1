"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecoded } from "../utils/decoded";
import { logOut } from "../Redux/features/Auth/auth.slice";

const AdminRoutes = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                // No token found, redirect to login
                router.push("/login");
                dispatch(logOut());
                setIsLoading(false);
                return;
            }

            try {
                const decoded = await jwtDecoded(token);

                if (decoded?.role !== "Student") {
                    // User is not an admin, redirect to login
                    router.push("/login");
                    dispatch(logOut());
                    setIsLoading(false);
                    return;
                }

                // User is authorized
                setIsAuthorized(true);
            } catch (error) {
                console.error("Authentication check failed:", error);
                router.push("/login");
                dispatch(logOut());
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [token, router, dispatch]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthorized) {
        // Already handled in useEffect, but return null here
        return null;
    }

    return <>{children}</>;
};

export default AdminRoutes;