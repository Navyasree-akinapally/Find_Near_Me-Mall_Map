import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useStore from '../../context/store-context';
import { MenuIcon } from 'lucide-react';
import MallAdminNavBar from './../topbar/mallAdminNavbar';

const MallAdminLayout = () => {
    const { dropdownRef } = useStore();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Toggle Sidebar Collapse
    const handleToggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex w-full text-black" ref={dropdownRef}>
            {/* Sidebar Section */}

            <div
                className={`transition-all bg-white duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-[20em]'
                    }`}
            >
                {!isSidebarCollapsed ? <MallAdminNavBar handleToggleSidebar={handleToggleSidebar} /> : <MenuIcon className="w-8 h-8 cursor-pointer mt-4 text-center mx-auto" onClick={handleToggleSidebar} />}
            </div>

            {/* Main Content Section */}
            <div className="flex-1 bg-gray-100 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default MallAdminLayout;
