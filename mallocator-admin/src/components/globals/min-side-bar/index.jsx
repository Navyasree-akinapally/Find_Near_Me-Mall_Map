import { ChartColumnStacked, Home, MenuIcon, ShoppingBag, ShoppingBasket, Store } from 'lucide-react';
import React from 'react';

const MiniSideBar = ({ handleToggleSidebar }) => {
    return (
        <div className='flex flex-col gap-12 items-center justify-center'>
            <MenuIcon className="w-8 h-8 cursor-pointer mt-4 text-center mx-auto" onClick={handleToggleSidebar} />
            <div className='flex flex-col gap-8 items-center'>
                <Home />
                <ShoppingBag />
                <Store />
                <ChartColumnStacked />
                <ShoppingBasket />
            </div>
        </div>
    );
}

export default MiniSideBar;
