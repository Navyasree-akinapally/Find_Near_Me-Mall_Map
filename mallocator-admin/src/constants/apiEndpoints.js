
const API_ENDPOINTS = {
    // App routes
    SIGNUP_API: '/app/auth/sign-up',
    LOGIN_API: (role) => `/app/auth/${role}/login`,
    APP_USER_DETAILS_API: '/app/user/user-details',
    APP_FORGOT_PASSWORD_API: '/app/auth/forget-password',
    APP_RESET_PASSWORD_API: '/app/auth/reset-password',

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

    ADMIN_GET_TOP_CATEGORIES: '/admin/stores/top-categories',

    // mall Admins
    CREATE_MALL_ADMIN_API: '/admin/mall-admin/create-mall-admin',
    GET_MALL_ADMINS_API: '/admin/mall-admin/',

    MALL_ADMIN_CREATE_MALL_API: '/malladmin/malls/',
    MALL_ADMIN_GET_MALLS_API: '/malladmin/malls/',
    MALL_ADMIN_GET_ADMIN_MALL_BY_ID_API: (mallId) => `/malladmin/malls/${mallId}`,
    MALL_ADMIN_UPDATE_ADMIN_MALL_BY_ID_API: (mallId) => `/malladmin/malls/${mallId}`,
    MALL_ADMIN_DELETE_AMDIN_MALL_BY_ID_API: (mallId) => `/malladmin/malls/${mallId}`,

    MALL_ADMIN_CREATE_STORE_API: '/malladmin/stores/',
    MALL_ADMIN_GET_STORE_API: '/malladmin/stores/',
    MALL_ADMIN_GET_ADMIN_STORE_BY_ID_API: (storeId) => `/malladmin/stores/${storeId}`,
    MALL_ADMIN_UPDATE_ADMIN_STORE_BY_ID_API: (storeId) => `/malladmin/stores/${storeId}`,
    MALL_ADMIN_DELETE_ADMIN_STORE_BY_ID_API: (storeId) => `/malladmin/stores/${storeId}`,


    MALL_ADMIN_CREATE_STATE_API: '/malladmin/state/',
    MALL_ADMIN_GET_STATE_API: '/malladmin/state/',
    MALL_ADMIN_CREATE_CITY_API: (stateId) => `/malladmin/city/${stateId}`,
    MALL_ADMIN_GET_CITY_API: (stateId) => `/malladmin/city/${stateId}`,

    MALL_ADMIN_CREATE_CATEGORY_API: '/malladmin/category/',
    MALL_ADMIN_GET_CATEGORY_API: '/malladmin/category/',
    MALL_ADMIN_GET_ADMIN_CATEGORY_BY_ID_API: (categoryId) => `/malladmin/category/${categoryId}`,
    MALL_ADMIN_UPDATE_ADMIN_CATEGORY_BY_ID_API: (categoryId) => `/malladmin/category/${categoryId}`,
    MALL_ADMIN_DELETE_AMDIN_CATEGORY_BY_ID_API: (categoryId) => `/malladmin/category/${categoryId}`,

    MALL_ADMIN_CREATE_PRODUCT_API: '/malladmin/product/',
    MALL_ADMIN_GET_PRODUCT_API: '/malladmin/product/',
    MALL_ADMIN_GET_ADMIN_PRODUCT_BY_ID_API: (productId) => `/malladmin/product/${productId}`,
    MALL_ADMIN_UPDATE_ADMIN_PRODUCT_BY_ID_API: (productId) => `/malladmin/product/${productId}`,
    MALL_ADMIN_DELETE_AMDIN_PRODUCT_BY_ID_API: (productId) => `/malladmin/product/${productId}`,

}

export default API_ENDPOINTS