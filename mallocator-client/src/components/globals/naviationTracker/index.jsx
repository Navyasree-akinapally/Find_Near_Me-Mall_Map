import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const NavTracker = ({ isDarkMode }) => {
    const location = useLocation();
    const [isCategoryPage, setIsCategoryPage] = useState()
    const { stateName, cityName, storeName, stateId } = useParams()
    console.log(stateName, cityName);
    useEffect(() => {
        if (location.pathname.includes('category')) {
            setIsCategoryPage(true)
        } else {
            setIsCategoryPage(false)
        }
    }, [location])

    const renderLink = (path, name, isLast) => {
        return isLast ? (
            <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>{name}</span>
        ) : (
            <Link to={path} className="hover:underline">
                {name}
            </Link>
        );
    };

    if (location.pathname.includes('search')) {
        return null
    }

    return (
        <div className="flex items-center gap-2 p-4 ">
            {cityName && (
                <>
                    {stateName && renderLink(`/`, stateName, !cityName)}
                    <ChevronRight className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
                    {renderLink(`/${stateName}/${cityName}/shops`, cityName, !storeName)}
                </>
            )}
            {storeName && (
                <>
                    {isCategoryPage && (
                        <div className='flex items-center gap-2'>
                            <ChevronRight className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
                            <span className={`${isDarkMode ? 'text-white' : 'text-black'}`}>Category</span>
                        </div>
                    )}
                    <ChevronRight className={`${isDarkMode ? 'text-white' : 'text-black'}`} />
                    <span className='text-slate-600'>{storeName}</span>
                </>
            )}
        </div>
    );
};

export default NavTracker;
