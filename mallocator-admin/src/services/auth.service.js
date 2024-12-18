import API_ENDPOINTS from "../constants/apiEndpoints";
import { clearToken, saveToken } from "../helpers/auth-token";
import { deleteAllLocalData, saveUserDetails } from "../helpers/localstorage";
import api from "./api.service";
const { jwtDecode } = require("jwt-decode");


const signUp = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.SIGNUP_API, payload)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const login = async (payload, role) => {
    try {
        const res = await api.post(API_ENDPOINTS.LOGIN_API(role), payload)
        console.log(res);
        setLoginToken(res.data.data)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const setLoginToken = (data) => {
    saveToken(data);
    const decoded = jwtDecode(data)
    saveUserDetails(decoded)
}

const logout = () => {
    clearToken();
    deleteAllLocalData();
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

const getLikedStores = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_USER_LIKED_STORES_API);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const forgotPassword = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.APP_FORGOT_PASSWORD_API, payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const resetPassword = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.APP_RESET_PASSWORD_API, payload);
        return res.data
    } catch (e) {
        console.log(e);
        throw e
    }
}

const authServices = {
    signUp,
    login,
    logout,
    toggleLike,
    getLikedStores,
    forgotPassword,
    resetPassword
}

export default authServices