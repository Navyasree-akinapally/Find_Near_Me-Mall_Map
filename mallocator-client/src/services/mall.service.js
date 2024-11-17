import API_ENDPOINTS from "../constants/apiEndpoints";
import api from "./api.service";


const createMall = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.CREATE_MALL_API, payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getMalls = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_MALLS_API);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getMallById = async (mallId) => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_ADMIN_MALL_BY_ID_API(mallId));
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



const mallServices = {
    createMall,
    getMalls,
    getMallById,
    updateMallById,
    deleteMallById
}

export default mallServices