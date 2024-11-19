import API_ENDPOINTS from "../../constants/apiEndpoints";
import api from "../api.service";


const createStore = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.MALL_ADMIN_CREATE_STORE_API, payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getStores = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.MALL_ADMIN_GET_STORE_API);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getTopCategories = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.ADMIN_GET_TOP_CATEGORIES);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getStoreById = async (storeId) => {
    try {
        const res = await api.get(API_ENDPOINTS.MALL_ADMIN_GET_ADMIN_STORE_BY_ID_API(storeId));
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const updateStoreById = async (storeId, payload) => {
    try {
        const res = await api.patch(API_ENDPOINTS.MALL_ADMIN_UPDATE_ADMIN_STORE_BY_ID_API(storeId), payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const deleteStoreById = async (storeId) => {
    try {
        const res = await api.delete(API_ENDPOINTS.DELETE_ADMIN_STORE_BY_ID_API(storeId));
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}


const storeService = {
    createStore,
    getStores,
    getStoreById,
    updateStoreById,
    deleteStoreById,
    getTopCategories
}

export default storeService