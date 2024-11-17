import React, { useEffect, useMemo, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import Table from '../../../components/common/table/Table';
import { StoreHeaders } from '../../../containers/tableContainers/tableHeaders';
import BaseLoading from '../../../components/loader/config-loading';
import storeService from '../../../services/store.service';

const StoreList = () => {
    const [storesData, setStoresData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await storeService.getStores();
            setStoresData(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const data = useMemo(() => {
        return storesData.map(store => ({
            _id: store?._id,
            name: store?.name,
            mallName: store.mall,
            isOpen: store.isOpen ? 'open' : 'closed',
            phone: store.phone ? store.phone : '-',
            location: `${store.city}, ${store.state}`,
            category: store.category,
            likes: store.like_count,
            fetchDataFunc: fetchData
        }));
    }, [storesData]);

    return (
        <div className="p-4">
            <BasePage title={"Store List"}>
                <BaseLoading loading={loading}>
                    <Table
                        isloading={loading}
                        columns={StoreHeaders}
                        data={data} // Ensure this is a flat array
                    />
                </BaseLoading>
            </BasePage>
        </div>
    );
}

export default StoreList;
