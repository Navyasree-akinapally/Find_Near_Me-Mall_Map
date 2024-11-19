import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard';
import AdminLayout from '../components/layout/admin-layout';
import { useAuth } from '../context/auth-context';
import MallCreatePage from '../pages/admin/mall/create';
import MallPage from '../pages/admin/mall/mallPage';
import CreateStore from '../pages/admin/store/create';
import StoreList from '../pages/admin/store/storeList';
import StateCreatePage from '../pages/admin/locations/state';
import CityCreatePage from '../pages/admin/locations/city';
import CreateCategories from '../pages/admin/categories/create';
import ListCategories from '../pages/admin/categories/list';
import EditStore from '../pages/admin/store/edit';
import CreateMall from '../pages/admin/mall/edit';
import CreateLocations from '../pages/admin/locations/create';
import EditCategory from '../pages/admin/categories/edit';
import CreateProduct from '../pages/admin/products/create';
import ProductList from '../pages/admin/products/list';
import EditProduct from '../pages/admin/products/edit';

const AdminRoutes = () => {
    const { isAdminAuth } = useAuth()
    return (
        <>
            {isAdminAuth ? (
                <Routes>
                    <Route element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        
                        <Route path='/store/create' element={<CreateStore />} />
                        <Route path='/store/list' element={<StoreList />} />
                        <Route path='/store/:storeId/edit' element={<EditStore />} />

                        <Route path='/categories/create' element={<CreateCategories />} />
                        <Route path='/category/:categoryId/edit' element={<EditCategory />} />
                        <Route path='/categories/list' element={<ListCategories />} />

                        <Route path='/product/create' element={<CreateProduct />} />
                        <Route path='/product/:productId/edit' element={<EditProduct />} />
                        <Route path='/product/list' element={<ProductList />} />
                    </Route>
                </Routes >
            ) : (
                <>
                    <div className='flex items-center justify-center'>
                        <span className='flex items-center justify-center text-4xl text-red-500 font-bold'>Forebidden</span>
                    </div>
                </>
            )}
        </>
    );
}

export default AdminRoutes;
