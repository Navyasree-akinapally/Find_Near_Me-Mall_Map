import React, { useEffect, useState } from 'react';
import appMallService from '../../../services/app/mall.service';
import BaseLoading from '../../../components/loader/config-loading';
import { useTheme } from '../../../context/theme-context';
import LocationCard from '../../../components/location-card';
import { Link } from 'react-router-dom';

const LocationPage = () => {
    const [statesData, setStatesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isDarkMode } = useTheme();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let res = await appMallService.getStates();
                if (res.data) {
                    setStatesData(res.data.data);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <BaseLoading loading={loading}>
            <div className='mx-8 lg:mx-16 min-h-screen'>
                {/* Beautiful top section */}
                <div className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-8">
                    <h2 className="text-3xl font-semibold">Explore Shopping Centers Across India</h2>
                    <p className="text-lg mt-4">Browse through the best shopping malls in your state, discover new places to shop, eat, and explore. Choose your state to start the journey!</p>
                </div>

                <div className='flex flex-col gap-8'>
                    <label htmlFor="" className='text-2xl font-bold'>Shopping centers around India</label>
                    <span className='text-sm'>Choose your State</span>
                </div>
                <div className='m-10 py-4'>
                    {statesData?.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                            {statesData?.map((state, index) => (
                                <LocationCard key={index} isDarkMode={isDarkMode} data={state} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-xl text-gray-500">No data available</div>
                    )}
                </div>
            </div>
        </BaseLoading>
    );
}

export default LocationPage;
