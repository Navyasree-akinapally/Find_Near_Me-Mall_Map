import React from 'react';
import { Link } from 'react-router-dom';
import ManageCard from '../../components/globals/manage-card';
import { useAuth } from '../../context/auth-context';

const Home = () => {
    const { isAuth } = useAuth()
    return (
        <div className='bg-[#151719] flex flex-col gap-4'>
            {/* Welcome Section */}
            <div className='mx-auto p-4 md:p-8 flex flex-col justify-center items-center text-center gap-4'>
                <h1 className='text-white text-4xl font-bold max-w-[14em]'>Effortless Store Search</h1>
                <span className='text-slate-300 md:px-[10em]'>Explore stores by categories within each mall for quick and easy access to all your favorite shops.</span>
                <div className='flex flex-col gap-1'>
                    <div className='flex flex-col justify-center sm:flex-row gap-4 items-center'>
                        {!isAuth && <Link to={'/auth'} className='bg-[#7d5dfe] text-white font-medium px-[1.5em] py-[.5em] rounded-md w-full md:w-auto'>Login</Link>}
                        <button className='border-[#7d5dfe] border-[1px] bg-[#151719] text-white font-medium px-[1.5em] py-[.5em] rounded-md flex items-center gap-2 w-full md:w-auto justify-center md:justify-normal'>
                            <span>Contact Us</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Why Use Mall Locator */}
            <div className='flex flex-col gap-4 p-8 mb-4 items-center justify-center'>
                <span className='text-center text-slate-400 font-bold'>Why Use Mall Locator?</span>
                <div className='mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='bg-gray-800 p-12 rounded-md'>
                        <h2 className='text-white font-bold text-xl'>Find Stores Easily</h2>
                        <p className='text-slate-300 mt-2'>With our locator, you can quickly find stores based on categories, making your shopping experience smooth and efficient.</p>
                    </div>
                    <div className='bg-gray-800 p-12 rounded-md'>
                        <h2 className='text-white font-bold text-xl'>Explore Malls</h2>
                        <p className='text-slate-300 mt-2'>Discover new malls, and see what stores and services each mall has to offer in one convenient place.</p>
                    </div>
                </div>
            </div>

            {/* Additional Features */}
            <div className='flex flex-col gap-4 p-8'>
                <h1 className='text-center text-4xl font-bold text-white'>Features</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='bg-gray-800 p-8 rounded-md text-center flex flex-col items-center justify-center gap-2'>
                        <h2 className='text-white font-bold'>Advanced Search</h2>
                        <p className='text-slate-300'>Find stores by categories, store name, or featured collections for an efficient shopping experience.</p>
                    </div>
                    <div className='bg-gray-800 p-8 rounded-md text-center flex flex-col items-center justify-center gap-2'>
                        <h2 className='text-white font-bold'>Favorites & Recommendations</h2>
                        <p className='text-slate-300'>Mark favorite stores and get recommendations based on previous searches and interests.</p>
                    </div>
                    <div className='bg-gray-800 p-8 rounded-md text-center flex flex-col items-center justify-center gap-2'>
                        <h2 className='text-white font-bold'>Real-time Updates</h2>
                        <p className='text-slate-300'>Stay updated on new stores, special events, and offers from malls in your area.</p>
                    </div>
                </div>
            </div>


            {/* Mall Admin Panel */}
            <div className='flex flex-col gap-12 text-white'>
                <h1 className='text-center text-4xl mx-auto font-bold max-w-[18em]'>Admin Dashboard for Mall Management</h1>
                <div className='flex items-center justify-between gap-20 p-14'>
                    <div className='flex flex-col gap-4 '>
                        <span className='text-[#644dc8] font-medium text-lg'>Easy Management</span>
                        <h1 className='text-2xl font-bold'>Manage Your Mall Listings</h1>
                        <p className='max-w-[29em] text-slate-400'>Each mall gets access to an admin panel to manage store listings, update categories, and add essential contact information for seamless user experience.</p>
                        <button className='bg-[#7d5dfe] text-white font-medium px-[1em] py-[.5em] rounded-md max-w-[10em] text-sm'>Learn More</button>
                    </div>
                    <ManageCard />
                </div>
            </div>
        </div >
    );
}

export default Home;
