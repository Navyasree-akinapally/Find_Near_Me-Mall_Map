import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import BaseLoading from '../../../components/loader/config-loading';
import appMallService from '../../../services/app/mall.service';
import { useTheme } from '../../../context/theme-context';

const CityPage = () => {
    const params = useParams()
    const { stateName, stateId } = params
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const location = useLocation()
    const { isDarkMode } = useTheme()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                let res = await appMallService.getMallsByStateId(stateId)
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
    }, [stateId, location])

    return (
        <BaseLoading loading={loading}>
            <div className='mx-6 lg:mx-16 lg:py-8'>
                <div className='flex flex-col gap-8 '>
                    <div htmlFor="" className='text-2xl font-bold'>Discover the magical world of Mallocator in {stateName}</div>
                    <span className='text-sm'>Discover our shopping centers</span>
                </div>
                <div className='m-20'>
                    {data?.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
                            {data?.map((mall, index) => (
                                <>
                                    {mall.stores.length > 0 ? (
                                        <div>
                                            <Link to={`/${stateName}/${mall.city}/${mall._id}/shops`} key={index} className='flex flex-col items-center justify-center gap-2 w-full'>
                                                <div className={`text-xs rounded-full shrink-0 text-center w-28 h-28 flex items-center justify-center p-2 ${isDarkMode ? 'bg-white text-gray-900' : 'bg-[#352F44] text-white'}`}>
                                                    {mall.title}
                                                </div>
                                                <div>
                                                    <label htmlFor="" className=' flex items-center justify-center'>{mall.title}</label>
                                                    <label htmlFor="" className='text-xs flex items-center justify-center'>{mall.city}</label>
                                                </div>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div key={index} className='flex flex-col items-center justify-center gap-2 w-full cursor-pointer'>
                                            <div className='bg-white text-xs rounded-full shrink-0 text-center w-24 h-24 flex items-center justify-center text-black'>
                                                {mall.title}
                                            </div>
                                            <div>
                                                <label htmlFor="" className=' flex items-center justify-center'>{mall.title}</label>
                                                <label htmlFor="" className='text-xs flex items-center justify-center'>{mall.city}</label>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ))}
                        </div>
                    ) : (
                        <>
                            <label htmlFor="">No malls availble</label>
                        </>
                    )}
                </div>
            </div>
        </BaseLoading>
    );
}

export default CityPage;
