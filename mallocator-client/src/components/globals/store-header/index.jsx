import React from 'react';
import { Link } from 'react-router-dom';

const StoreLayoutHeader = ({ mallName, cityName, storeCount, data }) => {
    return (
        <div className='flex flex-col gap-8'>
            <div className='flex justify-between'>
                <label htmlFor="" className='md:text-2xl font-bold'>At {mallName}, {cityName} ({storeCount})</label>
                <Link to={data[0]?.location_url}
                    target='_blank'
                    className="p-4 md:px-6 md:py-3 text-xs md:text-lg font-semibold text-white 
        bg-gradient-to-r from-blue-500 to-indigo-600 
        hover:from-indigo-600 hover:to-blue-500 
        focus:ring-4 focus:ring-blue-300 
        rounded-lg shadow-lg 
        transform transition-all duration-300 hover:scale-105 
        active:scale-95"
                >
                    Explore Stores
                </Link>

            </div>
            <span className='text-sm'>Discover our shopping centers</span>
        </div>
    );
}

export default StoreLayoutHeader;
