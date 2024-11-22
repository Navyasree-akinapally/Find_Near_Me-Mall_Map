import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import AdminNavbar from '../topbar/adminNavbar';
import useStore from '../../context/store-context';
import { MenuIcon } from 'lucide-react';
import MiniSideBar from './../globals/min-side-bar/index';
import MobileAdminNavbar from '../topbar/mobileAdminNavbar';
import { ADMIN_NAVBAR_ITEMS } from '../../constants/constants';
import { useAuth } from '../../context/auth-context';

const AdminLayout = () => {
    const { dropdownRef } = useStore();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const { isMallAdminAuth } = useAuth()
    // Toggle Navbar Visibility
    const handleToggleNavbar = () => {
        setIsNavbarVisible((prev) => !prev);
    };

    // Toggle Sidebar Collapse
    const handleToggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };
    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full text-black" ref={dropdownRef}>
            {/* Sidebar Section */}
            <div className="bg-white shadow-md p-4 lg:hidden flex justify-between">
                <div>
                    <Link to={isMallAdminAuth ? '/malladmin/' : '/admin'} className='text-2xl font-bold'>Admin Portal</Link>
                </div>
                <button
                    onClick={handleToggleNavbar}
                    className="text-gray-700 hover:text-purple-600 focus:outline-none"
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>
            <div
                className={`hidden-below-lg lg:block bg-white ${isSidebarCollapsed ? 'w-16' : 'w-[20em]'
                    }`}
            >
                {!isSidebarCollapsed ? <AdminNavbar handleToggleSidebar={handleToggleSidebar} /> : (
                    <MiniSideBar handleToggleSidebar={handleToggleSidebar} />
                )}
            </div>

            <MobileAdminNavbar
                handleToggleNavbar={handleToggleNavbar}
                isNavbarVisible={isNavbarVisible}
                navItems={ADMIN_NAVBAR_ITEMS}
            />

            {/* Main Content Section */}
            <div className="lg:flex-1 bg-gray-200 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
