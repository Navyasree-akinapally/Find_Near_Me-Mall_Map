import { HomeIcon, LogInIcon, LogOutIcon, MenuIcon, SearchIcon, UserIcon, XIcon } from 'lucide-react';
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { toggleDarkMode, isDarkMode } = useTheme()

    const toggleProfileOpen = () => {
        setIsProfileOpen(!isProfileOpen)
    }

    const handleBackNavigate = () => {
        navigate(-1)
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


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

            {/* Sidebar for Small Screens */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-semibold">Menu</h2>
                    <button onClick={toggleSidebar}>
                        <XIcon size={24} />
                    </button>
                </div>
                <nav className="p-4">
                    {/* User Icon */}
                    <div className="flex items-center gap-4 mb-6">
                        <UserIcon size={28} />
                        <p className="text-lg font-medium">User Profile</p>
                    </div>

                    {/* Links */}
                    <ul className="space-y-4">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center gap-3 text-lg hover:bg-gray-700 p-2 rounded-md transition"
                            >
                                <HomeIcon size={24} />
                                <span>Home</span>
                            </Link>
                        </li>
                    </ul>

                    {/* Logout Button */}
                    {isAuth ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-lg mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full transition"
                        >
                            <LogOutIcon size={24} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <Link to={"/auth/user"}
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-lg mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md w-full transition"
                        >
                            <LogInIcon size={24} />
                            <span>Login</span>
                        </Link>
                    )}
                </nav>
            </div>

            <div className="flex items-center gap-4 ">
                {cityName && stateName && (
                    <Link to={`/${stateName}/${cityName}/search`}>
                        <SearchIcon />
                    </Link>
                )}
                <div className="flex sm:hidden">
                    {/* Menu Icon */}
                    <button onClick={toggleSidebar}>
                        <MenuIcon size={28} />
                    </button>
                </div>
                <div className='hidden-below-sm lg:flex gap-4'>
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
