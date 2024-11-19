import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appStoreService from '../../../services/app/store.service';
import BaseLoading from '../../../components/loader/config-loading';
import { Dot, DotIcon, HeartIcon, Phone } from 'lucide-react';
import { useAuth } from '../../../context/auth-context';
import { dismissToast, successToast } from '../../../components/toastNotifications';
import authServices from '../../../services/auth.service';
import useStore from '../../../context/store-context';
import { useTheme } from '../../../context/theme-context';
import { priceFormate, truncateText } from '../../../utils/helpers';
import OpeningHours from '../../../components/opening-hours';

const ShopDetails = () => {
    const { isDarkMode } = useTheme()
    const { cityName, storeId } = useParams()
    const [data, setData] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [loading, setLoading] = useState(false)
    const { isAuth, userDetails } = useAuth()
    const { likedStores } = useStore()
    const navigate = useNavigate()
    const liked = likedStores?.includes(storeId)

    useEffect(() => {
        if (liked) {
            setIsLiked(liked)
        }
    }, [liked, userDetails])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                let res = await appStoreService.getStoreById(storeId)
                if (res) {
                    setData(res.data)
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [storeId])

    const handleLike = async (storeId) => {
        if (!isAuth) {
            return navigate('/auth/user');
        }

        try {
            const res = await authServices.toggleLike(storeId);
            dismissToast()

            if (res.data === 'Store unliked') {
                setIsLiked(false)
                successToast('Store disliked successfully');
            } else {
                setIsLiked(true)
                successToast('Store liked successfully');
            }
        } catch (e) {
            console.error("Error liking/disliking store:", e);
        }
    };

    console.log(data);
    return (
        <BaseLoading loading={loading}>
            <div className='px-6 lg:px-16 pb-10 h-full'>
                <label htmlFor="" className='text-4xl font-bold'>{data?.name} in the {cityName} center</label>
                <div className='grid lg:grid-cols-4 mt-8 justify-center text-black gap-8'>
                    <div className={` rounded-xl w-full py-8 px-4 grid grid-cols-4 col-span-3 ${isDarkMode ? 'bg-[#FFCF9D] text-gray-900' : 'bg-[#352F44] text-white'}`}>
                        <div className={`relative mx-4 rounded-xl pt-8 flex items-center justify-center`}>
                            <span className={`rounded-xl text-xs p-4 flex`}>
                                <img src={data?.image_url} alt={data?.name} className='object-contain w-full h-full' />
                            </span>
                            <div className={`absolute top-2 end-2 cursor-pointer ${isLiked ? 'text-red-400' : ''}`} onClick={() => handleLike(storeId)}>
                                <HeartIcon />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 col-span-3'>
                            <span className='text-lg'>{data?.name}</span>
                            <div className='text-sm flex items-center'>
                                <Dot className='text-green-400' height={34} width={34} />
                                <span>Open today {data?.start_time} until {data?.end_time}</span>
                            </div>
                            <span>JUST EVERYTHING. SIMPLE {data?.name}.</span>

                            {!data?.description ? (
                                <div>{data?.description}</div>
                            ) : (
                                <div>
                                    With {data?.name}'s products we can offer our customers the world of telecommunications from a single source! From smartphones, cell phones and accessories to tablets and landline products, the {data?.name} Shop offers a wide selection. In the landline area, for example, the {data?.name} station wagons are waiting for you. But you can also experience brilliant HD television with {data?.name} TV in the {data?.name} Shop. Come by and let the {data?.name} Shop team advise you. We look forward to seeing you! {data?.name} Shop Service Line: 0800 664 100
                                </div>
                            )}
                            <div className='flex items-center gap-4'>
                                <Phone />
                                <span>+91 {data?.phone}</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='flex flex-col ga-2'>
                                    <span className='font-bold'>Address:</span>
                                    <span>{data?.floor}</span>
                                </div>
                                <div className='flex flex-col ga-2'>
                                    <span className='font-bold'>Store Number:</span>
                                    <span>{data?.store_number}</span>
                                </div>
                            </div>

                            <div className='flex items-center gap-8 px-8 mt-8 my-8'>
                                <Link to={data?.media?.website_url} target='_blank' className={`w-full  text-center rounded-full py-2 ${isDarkMode ? 'bg-[#352F44] text-white' : 'bg-[#FFCF9D] text-black'}`}>Website</Link>
                            </div>
                        </div>
                    </div>
                    <OpeningHours isDarkMode={isDarkMode} />
                </div>
                <div className='my-4'>
                    <h1 className='text-4xl font-bold mb-6'>Products</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {data?.products?.map((prod) => (
                            <div
                                className={`relative max-h-[25em] cols-span-1 cursor-pointer border-[1.25px] border-slate-200 rounded-sm transition hover:scale-105 p-2 text-center text-sm
        ${isDarkMode ? 'bg-[#FFCF9D] text-gray-900' : 'bg-[#352F44] text-white'}
        `}
                                key={prod._id} // Assuming each product has a unique `_id`
                            >
                                <div className="flex flex-col items-center w-full">
                                    <div className="aspect-square overflow-hidden relative">
                                        <img
                                            src={prod.image}
                                            alt={prod.name}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <div>{truncateText(prod.name)}</div>
                                    {/* <div><Rating readOnly value={productRating} /></div> */}
                                    {/* <div>
                {prod.reviews.length} Reviews
            </div> */}
                                    <div className="font-semibold">{priceFormate(prod.price)}</div>
                                    <div
                                        className={`
                                            absolute end-0 top-0 w-12 h-12 rounded-full 
                ${prod.status === 'available' ? 'text-green-500' : prod.status === 'not_available' ? 'text-red-500' : 'text-yellow-500'}
                `}
                                    >
                                        <DotIcon className="w-full h-full" />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </BaseLoading>
    );
}

export default ShopDetails;
