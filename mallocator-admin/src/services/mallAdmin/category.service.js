import API_ENDPOINTS from "../../constants/apiEndpoints";
import api from "../api.service";


const createCategory = async (payload) => {
    try {
        let res = await api.post(API_ENDPOINTS.MALL_ADMIN_CREATE_CATEGORY_API, payload);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const getCategories = async (payload) => {
    try {
        let res = await api.get(API_ENDPOINTS.MALL_ADMIN_GET_CATEGORY_API);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const getCategoryById = async (categoryId) => {
    try {
        let res = await api.get(API_ENDPOINTS.MALL_ADMIN_GET_ADMIN_CATEGORY_BY_ID_API(categoryId));
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const updateCategoryById = async (categoryId, payload) => {
    try {
        let res = await api.patch(API_ENDPOINTS.MALL_ADMIN_UPDATE_ADMIN_CATEGORY_BY_ID_API(categoryId), payload);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const deleteCategoryById = async (categoryId) => {
    try {
        let res = await api.delete(API_ENDPOINTS.MALL_ADMIN_DELETE_AMDIN_CATEGORY_BY_ID_API(categoryId));
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const adminCategoryService = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}

export default adminCategoryService;