import { SearchIcon } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated } from '../../helpers/localstorage';
import authServices from '../../services/auth.service';
import { useAuth } from '../../context/auth-context';
import ChavronLeftArrow from '../icons/chavronLeftArrow';
import { Switch } from '@headlessui/react';
import { useTheme } from '../../context/theme-context';
import { useState } from 'react';

const LandingNavbar = () => {
    const { isAuth, setIsAuth, auth, handleLogout, isProfileOpen, setIsProfileOpen } = useAuth()
    const { stateName, cityName } = useParams()
    const userData = isAuthenticated()
    const navigate = useNavigate()

    const { toggleDarkMode, isDarkMode } = useTheme()

    const toggleProfileOpen = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    const handleBackNavigate = () => {
        navigate(-1)
    }


    return (
        <div className={`flex w-full justify-between items-center p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-[#B9B4C7] text-gray-800'}`}>
            <div className="flex items-center gap-4 cursor-pointer">
                <div onClick={handleBackNavigate}>
                    <ChavronLeftArrow />
                </div>
                <Link to="/" className="text-3xl font-semibold flex items-center gap-x-3">
                    MALL MAP
                </Link>
            </div>

            <div className="flex items-center gap-4 ">
                {cityName && stateName && (
                    <Link to={`/${stateName}/${cityName}/search`}>
                        <SearchIcon />
                    </Link>
                )}
                <div className='lg:flex gap-4'>
                    <div>
                        <Switch
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                            className={`group relative flex h-10 w-16 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none p-2 ${isDarkMode ? 'bg-[#DE8F5F]' : 'bg-[#352F44]'
                                }`}
                        >
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block rounded-full ring-0 shadow-lg transition duration-200 ease-in-out size-6 ${isDarkMode ? 'translate-x-7 bg-[#352F44]' : 'translate-x-0 bg-[#B9B4C7]'
                                    }`}
                            />
                        </Switch>
                    </div>
                    <div className="">
                        {isAuth ? (
                            <div className="flex gap-4">
                                {auth.user.role === 'admin' && (
                                    <Link
                                        to="/admin/mall/list"
                                        className={`py-2 px-5 font-semibold text-lg text-white rounded-full hover:bg-indigo-500 ${isDarkMode ? 'bg-[#DE8F5F]' : 'bg-[#352F44]'}`}
                                    >
                                        Admin
                                    </Link>
                                )}
                                <button className="text-base flex items-center gap-x-2" onClick={toggleProfileOpen}>
                                    <div
                                        className={`cursor-pointer flex items-center justify-center rounded-full ${isDarkMode ? 'bg-[#DE8F5F]' : 'bg-[#352F44]'}`}

                                        style={{
                                            width: '40px',
                                            height: '40px',
                                        }}
                                    >
                                        <h1 className="text-white text-xl">{String(userData?.username[0]).toUpperCase()}</h1>
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">

                                <Link to="/auth/user">
                                    <button className={`py-2 px-5 font-semibold text-lg rounded-full text-white ${isDarkMode ? 'bg-[#DE8F5F] ' : 'bg-[#352F44]'}`}>
                                        Login
                                    </button>
                                </Link>
                            </div>
                        )}


                    </div>
                    {isProfileOpen && (
                        <div className={`p-2 absolute end-0 -bottom-12 right-4 min-w-[10em] text-white ${isDarkMode ? 'bg-[#DE8F5F] ' : 'bg-[#352F44]'}`}>
                            <button onClick={handleLogout} className='hover:bg-slate-500 p-2 w-full text-left'>Logout</button>
                        </div>
                    )}
                </div>
            </div >
        </div >

    );
}

export default LandingNavbar;
