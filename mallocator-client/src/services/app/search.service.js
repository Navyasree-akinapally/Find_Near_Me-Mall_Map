import API_ENDPOINTS from "../../constants/apiEndpoints"
import api from "../api.service"

const getStoreDataBySearchKeyword = async (stateName, cityName, keyword) => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_SEARCH_DATA_BY_KEYWORK_API(stateName, cityName, keyword))
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const appSearchService = {
    getStoreDataBySearchKeyword
}

export default appSearchService