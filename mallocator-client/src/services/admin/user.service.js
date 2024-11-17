import API_ENDPOINTS from "../../constants/apiEndpoints";
import api from "../api.service";


const getUsers = async (payload) => {
    try {
        let res = await api.get(API_ENDPOINTS.ADMIN_GET_USERS_API);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}


const getAdminCount = async (payload) => {
    try {
        let res = await api.get(API_ENDPOINTS.ADMIN_GET_ADMIN_COUNT);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}

const getCustomerCount = async () => {
    try {
        let res = await api.get(API_ENDPOINTS.ADMIN_GET_CUSTOMER_COUNT);
        if (res.data) {
            return res.data
        }
    } catch (e) {
        throw e
    }
}
const adminUserServices = {
    getUsers,
    getAdminCount,
    getCustomerCount

}

export default adminUserServices;