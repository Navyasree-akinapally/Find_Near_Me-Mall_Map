import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../topbar/adminNavbar';
import useStore from '../../context/store-context';
import { Home, MenuIcon, ShoppingBag } from 'lucide-react';
import MiniSideBar from './../globals/min-side-bar/index';

const AdminLayout = () => {
    const { dropdownRef } = useStore();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Toggle Sidebar Collapse
    const handleToggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen w-full text-black" ref={dropdownRef}>
            {/* Sidebar Section */}

            <div
                className={`bg-white ${isSidebarCollapsed ? 'w-16' : 'w-[20em]'
                    }`}
            >
                {!isSidebarCollapsed ? <AdminNavbar handleToggleSidebar={handleToggleSidebar} /> : (
                    <MiniSideBar handleToggleSidebar={handleToggleSidebar} />
                )}
            </div>

            {/* Main Content Section */}
            <div className="flex-1 bg-gray-200 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
