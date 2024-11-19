
const API_ENDPOINTS = {
    // App routes
    SIGNUP_API: '/app/auth/sign-up',
    LOGIN_API: (role) => `/app/auth/${role}/login`,
    APP_USER_DETAILS_API: '/app/user/user-details',
    APP_FORGOT_PASSWORD_API: '/app/auth/forget-password',
    APP_RESET_PASSWORD_API: '/app/auth/reset-password',

    GET_STATES_API: '/app/malls/states',
    GET_MALLS_BY_STATE_API: (stateId) => `/app/malls/${stateId}`,

    GET_STORES_BY_STATE_AND_CITY: (stateName, cityName) => `/app/store/${stateName}/${cityName}`,
    GET_STORE_BY_ID: (storeId) => `/app/store/${storeId}`,
    GET_STORES_BY_CATEGORY_AND_CITY_API: (categoryId, cityName) => `/app/store/${categoryId}/${cityName}/category`,
    UPDATE_STORE_LIKE_API: (storeId) => `/app/user/${storeId}/like`,
    GET_USER_LIKED_STORES_API: '/app/user/liked-stores',

    GET_CATEGORIES_BY_MALL_API: (mallId) => `/app/category/${mallId}`,

    GET_SEARCH_DATA_BY_KEYWORK_API: (stateName, cityName, keyword) => `/app/search/${stateName}/${cityName}/${keyword}/search`,

    UPDATE_USER_DARK_MODE_API: '/app/user/dark-mode',
    GET_USER_DARK_MODE_API: '/app/user/dark-mode',

    GET_NEW_STORES_API: (mallId) => `/app/store/${mallId}/new-stores`,


}

export default API_ENDPOINTS