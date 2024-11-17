import API_ENDPOINTS from "../../constants/apiEndpoints";
import api from "../api.service";

const userDetails = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.APP_USER_DETAILS_API);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const toggleLike = async (storeId) => {
    try {
        const res = await api.patch(API_ENDPOINTS.UPDATE_STORE_LIKE_API(storeId));
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const toggleDarkMode = async (payload) => {
    try {
        const res = await api.patch(API_ENDPOINTS.UPDATE_USER_DARK_MODE_API, payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getDarkMode = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_USER_DARK_MODE_API);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}


const userServices = {
    toggleLike,
    userDetails,
    toggleDarkMode,
    getDarkMode
}

export default userServices