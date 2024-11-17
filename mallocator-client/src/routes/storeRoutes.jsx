import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import StorePage from '../pages/app/Home/storePage';
import CategoryPage from '../pages/app/category';
import StoreLayout from '../components/layout/store-layout';
import appStoreService from '../services/app/store.service';
import { useTheme } from '../context/theme-context';
import NewStoresPage from '../pages/app/new-stores';

const StoreRoutes = () => {
    const { stateName, cityName } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const mallId = data?.length > 0 ? data[0]?._id : null
    const location = useLocation()
    const { isDarkMode } = useTheme()
    const [newStoresData, setNewStoresData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                let res = await appStoreService.getStoresByStateAndCity(stateName, cityName)
                if (res) {
                    setData(res.data)
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [stateName, cityName, location])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await appStoreService.getNewStores(mallId);
                if (res.data) {
                    setNewStoresData(res.data)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [mallId])
    console.log(mallId);
    return (
        <Routes>
            <Route element={<StoreLayout isDarkMode={isDarkMode} mallId={mallId} loading={loading} data={data} newStoresData={newStoresData} />}>
                <Route path='/:mallId/shops' element={<StorePage data={data} loading={loading} isDarkMode={isDarkMode} />} />
                <Route path='/category/:categoryName/:categoryId' element={<CategoryPage isDarkMode={isDarkMode} />} />
                <Route path='/new-stores' element={<NewStoresPage isDarkMode={isDarkMode} newStoresData={newStoresData} />} />
            </Route>
        </Routes>
    );
}

export default StoreRoutes;
