import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import LandingNavbar from '../globals/landingNavBar';
import NavTracker from '../globals/naviationTracker';
import { useTheme } from '../../context/theme-context';

const PublicLayout = () => {
    const { isDarkMode } = useTheme();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);

    useEffect(() => {
        setIsSearchPage(location.pathname.includes('search'));
    }, [location]);

    return (
        <div className={`min-h-screen overflow-hidden ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#FAF0E6] text-black'}`}>
            <div className="fixed top-0 w-full z-20">
                <LandingNavbar />
            </div>
            <div className="pt-24 h-full flex flex-col">
                {!isSearchPage && (
                    <div className="md:px-8">
                        <NavTracker isDarkMode={isDarkMode} />
                    </div>
                )}
                <div className="flex-grow">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default PublicLayout;
