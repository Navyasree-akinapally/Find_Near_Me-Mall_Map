import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PublicLayout from '../components/layout/public-layout';
import Search from '../pages/app/Search';
import MallList from '../pages/app/Mall-list';
import MallLocation from '../pages/app/mall-location';
import Categories from '../pages/app/categories';
import ContactInfo from '../pages/app/contact-info';
import StoreHours from '../pages/app/store-hours';
import Reviews from '../pages/app/reviews';
import AdminRoutes from './adminRoutes';
import { useAuth } from '../context/auth-context';
import LocationPage from '../pages/app/Home/locationPage';
import CityPage from '../pages/app/Home/cityPage';
import StorePage from '../pages/app/Home/storePage';
import ShopDetails from '../pages/app/shop-details';
import StoreRoutes from './storeRoutes';
import SearchPage from './../pages/app/search/index';
import NotFound from './../pages/not-found';

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
                {/* <Route path='/mall' element={<MallList />} />
                <Route path="/mall/location" element={<MallLocation />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/contact' element={<ContactInfo />} />
                <Route path='/timing' element={<StoreHours />} />
                <Route path='/review' element={<Reviews />} /> */}
            </Route>
        </Routes>
    );
}

export default PublicRoutes;
