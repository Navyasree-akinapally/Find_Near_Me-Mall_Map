import API_ENDPOINTS from "../../constants/apiEndpoints";
import api from "../api.service";



const getState = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.MALL_ADMIN_GET_STATE_API);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}


const getCity = async (stateId) => {
    try {
        const res = await api.get(API_ENDPOINTS.MALL_ADMIN_GET_CITY_API(stateId));
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}


const locationService = {
    getState,
    getCity
}

export default locationService