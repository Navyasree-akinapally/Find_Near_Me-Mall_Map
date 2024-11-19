import React, { useEffect, useMemo, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import BaseLoading from '../../../components/loader/config-loading';
import { ProductHeaders } from '../../../containers/tableContainers/tableHeaders';
import Table from '../../../components/common/table/Table';
import adminProductServices from '../../../services/mallAdmin/product.service';

const ProductList = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await adminProductServices.getAllProducts();
            setProductData(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(productData);
    const data = useMemo(() => {
        return productData.map(product => ({
            _id: product?._id,
            name: product?.name,
            store: product?.store.name,
            price: product?.price,
            quantity: product?.quantity,
            fetchDataFunc: fetchData
        }));
    }, [productData]);
    return (
        <div className="p-4">
            <BasePage title={"Store List"}>
                <BaseLoading loading={loading}>
                    <Table
                        isloading={loading}
                        columns={ProductHeaders}
                        data={data} // Ensure this is a flat array
                    />
                </BaseLoading>
            </BasePage>
        </div>
    );
}

export default ProductList;
