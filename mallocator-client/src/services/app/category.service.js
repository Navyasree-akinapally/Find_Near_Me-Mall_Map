
import API_ENDPOINTS from "../../constants/apiEndpoints"
import api from "../api.service"

const getCategoriesByMall = async (mallId) => {
    try {
        let res = await api.get(API_ENDPOINTS.GET_CATEGORIES_BY_MALL_API(mallId))
        if (res.data) {
            return res.data;
        }
    } catch (e) {
        throw e
    }
}

const appCategoryServices = {
    getCategoriesByMall
}

export default appCategoryServices