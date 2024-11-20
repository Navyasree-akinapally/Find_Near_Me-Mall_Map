import { ChevronUpIcon, MenuIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MALL_ADMIN_NAVBAR } from '../../constants/constants';
import { Disclosure } from '@headlessui/react';
import authServices from '../../services/auth.service';
import { useAuth } from '../../context/auth-context';

const AdminNavbar = ({ handleToggleSidebar }) => {
    const navigate = useNavigate();
    const { setIsAuth } = useAuth();

    const handleLogout = async () => {
        authServices.logout();
        setIsAuth(false);
        navigate('/auth/malladmin'); // Redirect to the login page after logout
    };

    return (
        <div className="flex flex-col justify-between  bg-white shadow-lg p-6 text-gray-800 h-screen overflow-y-auto">
            {/* Brand Logo */}
            <div>
                <div className="flex items-center gap-4 mb-8">
                    <MenuIcon
                        className="w-8 h-8 text-purple-600 cursor-pointer"
                        onClick={handleToggleSidebar}
                    />
                    <Link to="/malladmin/" className="text-2xl font-bold text-purple-600">
                        MALL MAP
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-6">
                    <span className="text-gray-500 text-lg font-semibold uppercase">Menu</span>
                    <div className="flex flex-col gap-4">
                        {/* Dashboard Link */}
                        <Link
                            to="/malladmin/"
                            className="py-2 px-4 text-lg font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 rounded-lg"
                        >
                            Dashboard
                        </Link>

                        {/* Dynamic Navigation Items */}
                        {MALL_ADMIN_NAVBAR.map((item, index) => (
                            <Disclosure key={index}>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button
                                            className="flex justify-between items-center w-full py-2 px-4 text-lg font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 rounded-lg focus:outline-none"
                                        >
                                            <span>{item.title}</span>
                                            <ChevronUpIcon
                                                className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pl-6 space-y-2 bg-white">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subItem.href}
                                                    className="block py-2 px-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg"
                                                >
                                                    {subItem.title}
                                                </Link>
                                            ))}
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="">
                <button
                    onClick={handleLogout}
                    className="w-full px-6 py-2 text-lg font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-all duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminNavbar;
