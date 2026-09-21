// ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import React from "react";
import {userStore} from "../store/UserStore.ts";

interface ProtectedRouteProps {
    children: React.ReactNode;
}
export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user=userStore((state)=>state.user);
    const loading=userStore((state)=>state.loading);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div
                    className="h-10 w-10 animate-spin rounded-full border-4 border-amber-500 border-t-transparent"
                    role="status"
                    aria-label="Chargement"
                />
            </div>
        );
    }

    if (!user) {
        // on garde l'URL demandée pour rediriger après login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }


    return children;
}