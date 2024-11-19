import React, { useEffect, useMemo, useState } from 'react';
import BasePage from '../../../components/common/basePage';
import BaseLoading from '../../../components/loader/config-loading';
import { MallAdminHeaders } from '../../../containers/tableContainers/tableHeaders';
import Table from '../../../components/common/table/Table';
import mallAdminServices from '../../../services/mallAdmin.service';

const MallAdminList = () => {
    const [mallAdminsData, setMallAdminsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const res = await mallAdminServices.getMallAdmins();
            setMallAdminsData(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(mallAdminsData);
    const data = useMemo(() => {
        return mallAdminsData.map(admin => ({
            username: admin?.username,
            email: admin?.email,
            role: admin?.role,
            fetchDataFunc: fetchData
        }));
    }, [mallAdminsData]);
    return (
        <div className="p-4">
            <BasePage title={"Store List"}>
                <BaseLoading loading={loading}>
                    <Table
                        isloading={loading}
                        columns={MallAdminHeaders()}
                        data={data} // Ensure this is a flat array
                    />
                </BaseLoading>
            </BasePage>
        </div>
    );
}

export default MallAdminList;
