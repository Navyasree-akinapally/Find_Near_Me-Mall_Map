import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PublicLayout from '../components/layout/public-layout';
import { useAuth } from '../context/auth-context';
import LocationPage from '../pages/app/Home/locationPage';
import CityPage from '../pages/app/Home/cityPage';
import ShopDetails from '../pages/app/shop-details';
import StoreRoutes from './storeRoutes';
import SearchPage from './../pages/app/search/index';

const PublicRoutes = () => {
    const { isAdminAuth, isAuth } = useAuth()

    return (
        <Routes>
            <Route element={<PublicLayout />}>
                {/* <Route path='/' element={<Home />} /> */}
                <Route path='/' element={<LocationPage />} />
                <Route path='/:stateName/:stateId' element={<CityPage />} />
                <Route path='/:stateName/:cityName/shop-details/:storeName/:storeId' element={<ShopDetails />} />
                <Route path='/:stateName/:cityName/search' element={<SearchPage />} />

                <Route path='/:stateName/:cityName/*' element={<StoreRoutes />} />

            </Route>
        </Routes>
    );
}

export default PublicRoutes;
