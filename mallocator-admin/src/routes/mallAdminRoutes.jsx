import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import MallAdminLayout from './../components/layout/mallAdmin-layout';
import ForbiddenPage from '../pages/forbiddenPage';
import Dashboard from './../pages/mallAdmin/dashboard';
import CreateStore from './../pages/mallAdmin/store/create';
import StoreList from './../pages/mallAdmin/store/storeList';
import EditStore from './../pages/mallAdmin/store/edit';
import CreateCategories from './../pages/mallAdmin/categories/create';
import EditCategory from './../pages/mallAdmin/categories/edit';
import ListCategories from './../pages/mallAdmin/categories/list';
import CreateProduct from './../pages/mallAdmin/products/create';
import EditProduct from './../pages/mallAdmin/products/edit';
import ProductList from './../pages/mallAdmin/products/list';
import EditMall from '../pages/mallAdmin/mall/edit';

const MallAdminRoutes = () => {
    const { isMallAdminAuth } = useAuth()
    return (
        <>
            {isMallAdminAuth ? (
                <Routes>
                    <Route element={<MallAdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path='/mall/:mallId/edit' element={<EditMall />} />

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
                <ForbiddenPage />
            )}
        </>
    );
}

export default MallAdminRoutes;
