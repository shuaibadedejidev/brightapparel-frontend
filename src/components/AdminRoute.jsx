import React from 'react';
import { Navigate, Outlet } from 'react-router';
import useUserStore from '../store/useUserStore';

const AdminRoute = () => {
    const { user, isCheckingMe } = useUserStore();

    if (isCheckingMe) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#f8f6f0]">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (user && user.role?.toUpperCase() === 'ADMIN') {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;
};

export default AdminRoute;