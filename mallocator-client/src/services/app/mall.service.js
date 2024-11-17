import API_ENDPOINTS from "../../constants/apiEndpoints"
import api from "../api.service"


const getStates = async () => {
    try {
        let res = api.get(API_ENDPOINTS.GET_STATES_API)
        return res
    } catch (e) {
        throw e
    }
}

const getMallsByStateId = async (stateId) => {
    try {
        let res = await api.get(API_ENDPOINTS.GET_MALLS_BY_STATE_API(stateId));
        if (res) {
            return res.data;
        }
    } catch (e) {
        throw e
    }
}
const appMallService = {
    getStates,
    getMallsByStateId
}

export default appMallService