import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className=''>
            <div className='flex flex-col items-center justify-center'>
                <div className='text-4xl font-bold mx-auto my-8 text-black'>MALL MAP</div>
                <div className={`md:w-[500px] mb-8  rounded-xl shadow-xl lg:p-10 m-4 lg:mx-auto bg-slate-800`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
