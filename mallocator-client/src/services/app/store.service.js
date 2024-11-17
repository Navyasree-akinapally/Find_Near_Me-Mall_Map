import API_ENDPOINTS from "../../constants/apiEndpoints"
import api from "../api.service"

const getStoresByStateAndCity = async (stateName, cityName) => {
    try {
        let res = await api.get(API_ENDPOINTS.GET_STORES_BY_STATE_AND_CITY(stateName, cityName))
        return res.data
    } catch (e) {
        throw e
    }
}

const getStoreById = async (storeId) => {
    try {
        let res = await api.get(API_ENDPOINTS.GET_STORE_BY_ID(storeId))
        if (res) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const getStoresByCategoryAndCity = async (categoryId, cityName) => {
    try {
        let res = await api.get(API_ENDPOINTS.GET_STORES_BY_CATEGORY_AND_CITY_API(categoryId, cityName))
        if (res) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const getNewStores = async (mallId) => {
    try {
        let res = await api.get(API_ENDPOINTS.GET_NEW_STORES_API(mallId))
        if (res) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}


const appStoreService = {
    getStoresByStateAndCity,
    getStoreById,
    getStoresByCategoryAndCity,
    getNewStores
}

export default appStoreService