import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import appCategoryServices from '../../services/app/category.service';
import BaseLoading from '../loader/config-loading';
import StoreLayoutHeader from '../globals/store-header';
import CategoryLayoutHeader from '../globals/category-header';
import { generateSlug } from '../../utils/helpers';

const StoreLayout = ({ mallId, loading, data, isDarkMode, newStoresData }) => {
    const [categoryData, setCategoryData] = useState([]);
    const mallName = data?.length > 0 ? data[0]?.mallName : null;
    const { stateName, cityName, categoryId } = useParams();
    const location = useLocation();
    const storeCount = data.length > 0 ? data[0]?.storeCount : null;

    // Determine which page we're on (Category or New Stores page)
    const isCategoryPage = location.pathname.includes('category');
    const isNewStoresPage = location.pathname.includes('new-stores');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await appCategoryServices.getCategoriesByMall(mallId);
                if (res.data) {
                    setCategoryData(res.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [mallId]);

    const category = categoryData.find((c) => c?.categoryId === categoryId && categoryId);

    return (
        <BaseLoading loading={loading}>
            <div className={`mx-2 sm:mx-12 lg:py-8 text-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {/* Conditionally render headers based on the page type */}
                {!isNewStoresPage && (
                    <>
                        {!isCategoryPage ? (
                            <StoreLayoutHeader mallName={mallName} cityName={cityName} storeCount={storeCount} data={data} />
                        ) : (
                            <CategoryLayoutHeader mallName={mallName} category={category} data={data} />
                        )}
                    </>
                )}

                <div className='md:grid md:grid-cols-3 md:gap-8 mt-8 items-center mx-auto md:items-start'>
                    {/* Sidebar with category links */}
                    <div className={`col-span-1 md:h-[40em] p-6 md:mx-auto w-full lg:w-[22em] overflow-y-auto rounded-xl mb-8 ${isDarkMode ? 'bg-[#FFCF9D] text-gray-900' : 'bg-[#352F44] text-white'}`}>
                        <span className={`font-bold ${isDarkMode ? 'text-[#794a2c]' : 'text-red-500'}`}>All Stores ({storeCount})</span>
                        <hr className='my-4' />

                        {/* New Stores link */}
                        <Link to={`/${stateName}/${cityName}/new-stores`}>
                            new Stores ({newStoresData?.length})
                        </Link>
                        <hr className='my-4' />

                        {/* Category Links */}
                        <div className={``}>
                            {categoryData?.length > 0 && categoryData.map((category) => {
                                const categorySlugName = generateSlug(category.categoryName);
                                return (
                                    <Link to={`/${stateName}/${cityName}/category/${categorySlugName}/${category.categoryId}`} key={category.categoryId} className='py-2 flex flex-col gap-2'>
                                        {String(category?.categoryName).toUpperCase()} ({category.storeCount})
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Outlet (for rendering child components) */}
                    <div className='col-span-2'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </BaseLoading>
    );
};

export default StoreLayout;
