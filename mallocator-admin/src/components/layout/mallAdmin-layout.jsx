import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import useStore from '../../context/store-context';
import { MenuIcon } from 'lucide-react';
import MallAdminNavBar from './../topbar/mallAdminNavbar';
import MiniSideBar from '../globals/min-side-bar';
import MobileAdminNavbar from '../topbar/mobileAdminNavbar';
import { MALL_ADMIN_NAVBAR } from '../../constants/constants';

const MallAdminLayout = () => {
    const { dropdownRef } = useStore();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

    // Toggle Navbar Visibility
    const handleToggleNavbar = () => {
        setIsNavbarVisible((prev) => !prev);
    };

    // Toggle Sidebar Collapse
    const handleToggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex flex-col lg:flex-row w-full text-black" ref={dropdownRef}>
            {/* Sidebar Section */}
            <div className="bg-white shadow-md p-4 lg:hidden flex justify-between">
                <div>
                    <Link to={'/malladmin'} className='text-2xl font-bold'>Admin Portal</Link>
                </div>
                <button
                    onClick={handleToggleNavbar}
                    className="text-gray-700 hover:text-purple-600 focus:outline-none"
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            <div
                className={`hidden-below-lg lg:block transition-all bg-white duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-[20em]'
                    }`}
            >
                {!isSidebarCollapsed ? <MallAdminNavBar handleToggleSidebar={handleToggleSidebar} /> : <MiniSideBar handleToggleSidebar={handleToggleSidebar} />}
            </div>

            <MobileAdminNavbar
                handleToggleNavbar={handleToggleNavbar}
                isNavbarVisible={isNavbarVisible}
                navItems={MALL_ADMIN_NAVBAR}
            />

            {/* Main Content Section */}
            <div className="lg:flex-1 bg-gray-100 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default MallAdminLayout;
