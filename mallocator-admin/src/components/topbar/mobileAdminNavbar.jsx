import { ChevronUpIcon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MALL_ADMIN_NAVBAR } from '../../constants/constants';
import { Disclosure } from '@headlessui/react';
import authServices from '../../services/auth.service';
import { useAuth } from '../../context/auth-context';

const MobileAdminNavbar = ({ handleToggleNavbar, isNavbarVisible, navItems }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsAuth } = useAuth();
    const isMallAdminPage = location.pathname.includes('/malladmin')
    const handleLogout = async () => {
        authServices.logout();
        setIsAuth(false);
        navigate('/auth/malladmin'); // Redirect to the login page after logout
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div
            className={`fixed top-0 left-0 w-full bg-white shadow-lg p-6 text-gray-800 transition-transform duration-300 z-50 ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            {/* Brand Header */}
            <div className="flex items-center justify-between mb-6">
                <Link to={`${isMallAdminPage ? '/malladmin/' : '/admin/'} `} className="text-2xl font-bold text-purple-600">
                    MALL MAP
                </Link>
                <button
                    onClick={handleToggleNavbar}
                    className="text-gray-700 hover:text-purple-600 focus:outline-none"
                >
                    <ChevronUpIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-6">
                <span className="text-gray-500 text-lg font-semibold uppercase">Menu</span>
                <div className="flex flex-col gap-4">
                    {/* Dashboard Link */}
                    <Link
                        to={`${isMallAdminPage ? '/malladmin/' : '/admin/'} `}
                        className={`py-2 px-4 text-lg font-medium rounded-lg ${isActive('/malladmin/')
                            ? 'bg-purple-100 text-purple-600'
                            : 'text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                            }`}
                        onClick={handleToggleNavbar}
                    >
                        Dashboard
                    </Link>

                    {/* Dynamic Navigation Items */}
                    {navItems.map((item, index) => (
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
                                                className={`block py-2 px-2 rounded-lg ${isActive(subItem.href)
                                                    ? 'bg-purple-100 text-purple-600'
                                                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                                                    }`}
                                                onClick={handleToggleNavbar}
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

            {/* Logout Button */}
            <div className="mt-6">
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

export default MobileAdminNavbar;
