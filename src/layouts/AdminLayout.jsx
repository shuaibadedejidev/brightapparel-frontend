import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import {
    LayoutDashboard,
    Package,
    PackagePlus,
    ShoppingBag,
    LogOut,
    Menu,
    X,
    ArrowLeft
} from 'lucide-react';

import useUserStore from '../store/useUserStore';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (logout) await logout();
        navigate('/');
    };

    // Define sidebar navigation links
    const navLinks = [
        {
            name: 'Dashboard',
            path: '/admin',
            icon: LayoutDashboard,
            end: true // Exact match for root /admin
        },
        {
            name: 'Products',
            path: '/admin/products',
            icon: Package
        },
        {
            name: 'Add Product',
            path: '/admin/add-product',
            icon: PackagePlus
        },
        {
            name: 'Orders',
            path: '/admin/orders',
            icon: ShoppingBag
        },
    ];

    return (
        <div className="min-h-screen bg-[#f8f6f0] text-[#111111] flex flex-col md:flex-row">

            {/* Mobile Header Bar */}
            <div className="md:hidden bg-white border-b border-[#e2ddd5] px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 rounded-lg border border-[#e2ddd5] hover:bg-[#f4f1eb] cursor-pointer"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                    <span className="font-serif font-bold text-lg text-[#4a3b32]">Apparell Admin</span>
                </div>
                <NavLink to="/" className="text-xs text-[#6c5d53] hover:text-black flex items-center gap-1">
                    <ArrowLeft size={14} /> Store
                </NavLink>
            </div>

            {/* Backdrop overlay for mobile drawer */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs"
                />
            )}

            {/* Sidebar Frame */}
            <aside className={`
                fixed md:sticky top-0 left-0 z-50
                h-screen w-64 bg-white border-r border-[#e2ddd5]
                flex flex-col justify-between
                transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>

                {/* Brand & Nav List */}
                <div>
                    <div className="p-6 border-b border-[#e2ddd5] flex items-center justify-between">
                        <div>
                            <h2 className="font-serif font-bold text-xl text-[#4a3b32] tracking-tight">Bright</h2>
                            <p className="text-[10px] text-[#6c5d53] uppercase tracking-wider font-semibold">Admin Panel</p>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="md:hidden text-gray-400 hover:text-black"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <nav className="p-4 space-y-1.5">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    end={link.end}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={({ isActive }) => `
                                    flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all
                                    ${isActive
                                            ? 'bg-[#1a1a1a] text-white shadow-xs'
                                            : 'text-[#6c5d53] hover:bg-[#f4f1eb] hover:text-[#4a3b32]'
                                        }
                                    `}
                                >
                                    <Icon size={18} />
                                    <span>{link.name}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-[#e2ddd5] space-y-2">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-[#6c5d53] hover:bg-[#f4f1eb] hover:text-[#4a3b32] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to Store</span>
                    </NavLink>

                    <div className="pt-2 border-t border-[#e2ddd5]/60 flex items-center justify-between px-1">
                        <div className="truncate pr-2">
                            <p className="text-xs font-semibold text-[#4a3b32] truncate">{user?.email || 'Admin'}</p>
                            <p className="text-[10px] text-emerald-600 font-medium">● Online</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>

            </aside>

            {/* Main Content Viewport */}
            <main className="flex-1 min-w-0 overflow-x-auto p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;