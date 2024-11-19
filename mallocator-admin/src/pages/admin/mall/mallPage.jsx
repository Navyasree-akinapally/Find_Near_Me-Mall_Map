import React, { useEffect, useMemo, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import useStore from '../../../context/store-context';
import Table from '../../../components/common/table/Table';
import { MallHeaders } from '../../../containers/tableContainers/tableHeaders';
import mallServices from '../../../services/mall.service';
import BaseLoading from '../../../components/loader/config-loading';

const MallPage = () => {
    const [mallsData, setMallsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await mallServices.getMalls();
            setMallsData(res.data);
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
        return mallsData.map(mall => ({
            title: mall.title,
            city: mall?.city?.name,
            state: mall?.state?.name,
            _id: mall?._id,
            fetchDataFunc: fetchData
        }));
    }, [mallsData]);

    return (
        <div className="p-4">
            <BasePage title={"Mall List"}>
                <BaseLoading loading={loading}>
                    <Table
                        isloading={loading}
                        columns={MallHeaders()}
                        data={data} // Ensure this is a flat array
                    />
                </BaseLoading>
            </BasePage>
        </div>
    );
}

export default MallPage;
