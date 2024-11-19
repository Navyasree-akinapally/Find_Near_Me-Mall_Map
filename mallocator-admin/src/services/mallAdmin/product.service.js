import API_ENDPOINTS from "../../constants/apiEndpoints";
import api from "../api.service";


const createProduct = async (payload) => {
    try {
        let res = await api.post(API_ENDPOINTS.MALL_ADMIN_CREATE_PRODUCT_API, payload);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const getAllProducts = async (payload) => {
    try {
        let res = await api.get(API_ENDPOINTS.MALL_ADMIN_GET_PRODUCT_API);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const getProductById = async (productId) => {
    try {
        let res = await api.get(API_ENDPOINTS.MALL_ADMIN_GET_ADMIN_PRODUCT_BY_ID_API(productId));
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const updateProductById = async (productId, payload) => {
    try {
        let res = await api.patch(API_ENDPOINTS.MALL_ADMIN_UPDATE_ADMIN_PRODUCT_BY_ID_API(productId), payload);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const deleteProductById = async (productId) => {
    try {
        let res = await api.delete(API_ENDPOINTS.MALL_ADMIN_DELETE_AMDIN_PRODUCT_BY_ID_API(productId));
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}



const adminProductServices = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById

}

export default adminProductServices;