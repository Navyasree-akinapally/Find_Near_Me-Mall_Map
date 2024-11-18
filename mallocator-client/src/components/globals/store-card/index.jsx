import { HeartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/auth-context';
import authServices from '../../../services/auth.service';
import { dismissToast, successToast } from '../../toastNotifications';
import useStore from '../../../context/store-context';
import { useTheme } from '../../../context/theme-context';

const StoreCard = ({ store }) => {
    const { isDarkMode } = useTheme()
    const { stateName, cityName } = useParams()
    const slugName = store.name.replace(/\s+/g, '-');
    const { isAuth } = useAuth();
    const navigate = useNavigate();
    const { likedStores, setLikedStores } = useStore()
    const isLiked = likedStores.includes(store._id);



    const handleLike = async (storeId) => {
        if (!isAuth) {
            return navigate('/auth/user');
        }

        try {
            const res = await authServices.toggleLike(storeId);
            dismissToast()
            if (res.data) {
                setLikedStores((prev) => {
                    const isCurrentlyLiked = prev.includes(storeId);
                    const updatedLikes = isCurrentlyLiked
                        ? prev.filter((id) => id !== storeId)
                        : [...prev, storeId];
                    return updatedLikes;
                });
            }
            if (res.data === 'Store unliked') {
                successToast('Store disliked successfully');
            } else {
                successToast('Store liked successfully');
            }
        } catch (e) {
            console.error("Error liking/disliking store:", e);
        }
    };
    return (
        <div className=''>
            <Link to={`/${stateName}/${cityName}/shop-details/${slugName}/${store._id}`} className='flex flex-col gap-2'>

                <div className={`relative text-center flex items-center justify-center rounded-xl text-black w-60 h-32 shadow-2xl  ${isDarkMode ? 'bg-[#FFCF9D] text-gray-900' : 'bg-[#352F44] text-white'}`}>
                    <button
                        className={`absolute top-4 right-6 ${isLiked
                            ? (isDarkMode ? 'text-red-400' : 'text-red-500') // Red for liked in dark or light mode
                            : (isDarkMode ? 'text-gray-900' : 'text-white')  // Gray or black for unliked in dark or light mode
                            }`}
                        onClick={() => handleLike(store._id)}
                    >
                        <HeartIcon className="" strokeWidth={2} />
                    </button>
                    {store.name}
                </div>
                <div className='flex flex-col gap-1 '>
                    <label>{store.name}</label>
                    <label className='text-xs'>{store.isOpen ? 'Opened' : 'Closed'}</label>
                </div>
            </Link>

        </div>
    );
}

export default StoreCard;
