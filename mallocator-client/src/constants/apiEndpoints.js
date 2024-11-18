
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



    // Admin Routes
    CREATE_MALL_API: '/admin/malls/',
    GET_MALLS_API: '/admin/malls/',
    GET_ADMIN_MALL_BY_ID_API: (mallId) => `/admin/malls/${mallId}`,
    UPDATE_ADMIN_MALL_BY_ID_API: (mallId) => `/admin/malls/${mallId}`,
    DELETE_AMDIN_MALL_BY_ID_API: (mallId) => `/admin/malls/${mallId}`,

    CREATE_STORE_API: '/admin/stores/',
    GET_STORE_API: '/admin/stores/',
    GET_ADMIN_STORE_BY_ID_API: (storeId) => `/admin/stores/${storeId}`,
    UPDATE_ADMIN_STORE_BY_ID_API: (storeId) => `/admin/stores/${storeId}`,
    DELETE_ADMIN_STORE_BY_ID_API: (storeId) => `/admin/stores/${storeId}`,


    CREATE_STATE_API: '/admin/state/',
    GET_STATE_API: '/admin/state/',
    CREATE_CITY_API: (stateId) => `/admin/city/${stateId}`,
    GET_CITY_API: (stateId) => `/admin/city/${stateId}`,

    CREATE_CATEGORY_API: '/admin/category/',
    GET_CATEGORY_API: '/admin/category/',
    GET_ADMIN_CATEGORY_BY_ID_API: (categoryId) => `/admin/category/${categoryId}`,
    UPDATE_ADMIN_CATEGORY_BY_ID_API: (categoryId) => `/admin/category/${categoryId}`,
    DELETE_AMDIN_CATEGORY_BY_ID_API: (categoryId) => `/admin/category/${categoryId}`,

    CREATE_PRODUCT_API: '/admin/product/',
    GET_PRODUCT_API: '/admin/product/',
    GET_ADMIN_PRODUCT_BY_ID_API: (productId) => `/admin/product/${productId}`,
    UPDATE_ADMIN_PRODUCT_BY_ID_API: (productId) => `/admin/product/${productId}`,
    DELETE_AMDIN_PRODUCT_BY_ID_API: (productId) => `/admin/product/${productId}`,

    ADMIN_GET_USERS_API: '/admin/user/',

    ADMIN_GET_ADMIN_COUNT: '/admin/user/admin-count',
    ADMIN_GET_CUSTOMER_COUNT: '/admin/user/customer-count',

    ADMIN_GET_TOP_CATEGORIES: '/admin/stores/top-categories'
}

export default API_ENDPOINTS