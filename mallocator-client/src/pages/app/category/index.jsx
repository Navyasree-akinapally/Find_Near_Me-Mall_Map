import React, { useEffect, useState } from 'react';
import appStoreService from '../../../services/app/store.service';
import { useParams } from 'react-router-dom';
import BaseLoading from '../../../components/loader/config-loading';
import StoreCard from '../../../components/globals/store-card';

const CategoryPage = () => {
    const { categoryId, cityName } = useParams()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                let res = await appStoreService.getStoresByCategoryAndCity(categoryId, cityName)
                if (res.data) {
                    setData(res.data)
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [categoryId, cityName])

    return (
        <BaseLoading loading={loading}>
            <div>
                {data?.length > 0 ? (
                    <div className='grid grid-cols-3 gap-8'>
                        {data?.map((store, index) => {
                            return (
                                <div key={index} className='relative'>
                                    <StoreCard store={store} />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <>
                        <label htmlFor="">No malls availble</label>
                    </>
                )}
            </div>
        </BaseLoading>
    );
}

export default CategoryPage;
