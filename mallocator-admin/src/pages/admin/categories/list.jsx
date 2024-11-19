import React, { useEffect, useMemo, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import useStore from '../../../context/store-context';
import Table from '../../../components/common/table/Table';
import { CategoryHeaders, MallHeaders } from '../../../containers/tableContainers/tableHeaders';
import mallServices from '../../../services/mall.service';
import BaseLoading from '../../../components/loader/config-loading';
import adminCategoryService from '../../../services/admin/category.service';

const ListCategories = () => {
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await adminCategoryService.getCategories();
            setCategoriesData(res.data);
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
        return categoriesData.map(mall => ({
            title: mall.title,
            _id: mall._id,
            fetchDataFunc: fetchData
        }));
    }, [categoriesData]);

    return (
        <div className="p-4">
            <BasePage title={"Mall List"}>
                <BaseLoading loading={loading}>
                    <Table
                        isloading={loading}
                        columns={CategoryHeaders()}
                        data={data} // Ensure this is a flat array
                    />
                </BaseLoading>
            </BasePage>
        </div>
    );
}

export default ListCategories;
