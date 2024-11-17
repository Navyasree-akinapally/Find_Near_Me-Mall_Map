
import API_ENDPOINTS from "../constants/apiEndpoints";
import api from "./api.service";


const createState = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.CREATE_STATE_API, payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getState = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_STATE_API);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const createCity = async (payload, stateId) => {
    try {
        const res = await api.post(API_ENDPOINTS.CREATE_CITY_API(stateId), payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const getCity = async (stateId) => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_CITY_API(stateId));
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}


const locationService = {
    createState,
    getState,
    createCity,
    getCity
}

export default locationService