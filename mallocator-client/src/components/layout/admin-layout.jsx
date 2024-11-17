import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../topbar/adminNavbar';
import useStore from '../../context/store-context';
import { MenuIcon } from 'lucide-react';

const AdminLayout = () => {
    const { dropdownRef } = useStore();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Toggle Sidebar Collapse
    const handleToggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex w-full h-screen text-black" ref={dropdownRef}>
            {/* Sidebar Section */}

            <div
                className={`transition-all bg-white duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-[20em]'
                    }`}
            >

                {!isSidebarCollapsed ? <AdminNavbar handleToggleSidebar={handleToggleSidebar} /> : <MenuIcon className="w-8 h-8 cursor-pointer mt-4 text-center mx-auto" onClick={handleToggleSidebar} />}
            </div>

            {/* Main Content Section */}
            <div className="flex-1  overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
