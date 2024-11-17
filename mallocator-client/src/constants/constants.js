export const BASE_URL = process.env.REACT_APP_API_URL

export const NAVBAR_ITEMS = [
    {
        title: 'Contacts',
        href: '/contact',
    },
    {
        title: 'Timing',
        href: '/timing',
    },
    {
        title: 'Review',
        href: '/review',
    },
]

export const ADMIN_NAVBAR_ITEMS = [
    {
        title: 'Locations',
        subItems: [
            {
                title: 'Create',
                href: '/admin/location/create'
            },
        ]
    },
    {
        title: 'Mall',
        href: '/admin/mall',
        subItems: [
            {
                title: 'Mall List',
                href: '/admin/mall/list'
            },
            {
                title: 'Create Mall',
                href: '/admin/mall/create'
            },
        ]
    },
    {
        title: 'Store',
        href: '/admin/store',
        subItems: [
            {
                title: 'Store List',
                href: '/admin/store/list'
            },
            {
                title: 'Create Store',
                href: '/admin/store/create'
            },
        ]
    },
    {
        title: 'Categories',
        subItems: [
            {
                title: 'List Categories',
                href: '/admin/categories/list'
            },
            {
                title: 'Create',
                href: '/admin/categories/create'
            },
        ]
    },
    {
        title: 'Products',
        href: '/admin/product',
        subItems: [
            {
                title: 'Product List',
                href: '/admin/product/list'
            },
            {
                title: 'Create Product',
                href: '/admin/product/create'
            },
        ]
    },

]