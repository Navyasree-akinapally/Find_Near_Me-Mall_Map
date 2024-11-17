import React from 'react';
import { Link } from 'react-router-dom';

const LocationCard = ({ data, isDarkMode, }) => {
    return (
        <Link to={`/${data.name}/${data._id}`} className='flex flex-col items-center justify-center gap-2 w-full'>
            <div className={`rounded-full shrink-0 text-center w-28 h-28 flex items-center justify-center text-xs ${isDarkMode ? 'bg-white text-black' : 'bg-[#352F44] text-white'}`}>
                {data.name}
            </div>
            <label htmlFor="" className=' flex items-center justify-center'>{data.name}</label>
            <span className='text-xs'>{data.mallCount}  Shopping centers</span>
        </Link>
    );
}

export default LocationCard;
