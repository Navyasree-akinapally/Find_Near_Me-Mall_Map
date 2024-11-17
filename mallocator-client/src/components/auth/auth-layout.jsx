import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../context/theme-context';

const AuthLayout = () => {
    const { isDarkMode } = useTheme()
    return (
        <div className='w-full h-screen'>
            <div className='flex flex-col items-center justify-center'>
                <div className=' text-2xl font-bold mx-auto mb-10 pt-14'>Mallocator</div>
                <div className={`w-[500px]  rounded-xl shadow-xl p-10 mx-auto ${isDarkMode ? 'bg-slate-800' : 'bg-slate-800'}`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;