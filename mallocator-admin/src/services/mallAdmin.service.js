import API_ENDPOINTS from "../constants/apiEndpoints";
import api from "./api.service";


const createMallAdmin = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.CREATE_MALL_ADMIN_API, payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getMallAdmins = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_MALL_ADMINS_API);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getMallById = async (mallId) => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_MALL_ADMINS_API(mallId));
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const updateMallById = async (mallId, payload) => {
    try {
        const res = await api.patch(API_ENDPOINTS.UPDATE_ADMIN_MALL_BY_ID_API(mallId), payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const deleteMallById = async (mallId) => {
    try {
        const res = await api.delete(API_ENDPOINTS.DELETE_AMDIN_MALL_BY_ID_API(mallId));
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}



const mallAdminServices = {
    createMallAdmin,
    getMallAdmins
}

export default mallAdminServices