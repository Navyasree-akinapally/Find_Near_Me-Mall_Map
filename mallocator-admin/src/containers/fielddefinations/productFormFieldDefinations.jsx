
export const AddProductFormFieldDefinations = (storeData) => {
    const formFields = [
        {
            name: 'title',
            fields: [
                {
                    name: 'name',
                    label: 'Name',
                    type: 'text',
                    placeholder: 'Enter product name'
                },
                {
                    name: 'store',
                    label: 'Select Store',
                    type: 'searchable-select',
                    placeholder: 'select Store',
                    options: [
                        { label: 'Select', value: "" },
                        ...(storeData || []).map((option) => ({
                            label: `${option?.name} `,
                            value: option?._id,
                        }))
                    ],
                },
                {
                    name: 'quantity',
                    label: 'Quantity',
                    type: 'number',
                    placeholder: 'Enter Quantity'
                },
                {
                    name: 'price',
                    label: 'Price',
                    type: 'number',
                    placeholder: 'Enter Price'
                },
                {
                    name: 'image',
                    label: 'Image URL',
                    type: 'image',
                    placeholder: 'Paste Url'
                },
                {
                    name: 'status',
                    label: 'Product Status',
                    type: 'select',
                    options: [
                        { label: 'Select', value: "" },
                        ...([
                            { label: 'Available', value: 'available' },
                            { label: "N/A", value: 'not_available' },
                            { label: "Coming Soon", value: 'coming_soon' }]).map((option) => ({
                                label: `${option?.label} `,
                                value: option?.value,
                            }))
                    ],
                },
                // {
                //     name: 'featured',
                //     label: 'Featured',
                //     type: 'select',
                //     options: [
                //         { label: 'Select', value: "" },
                //         ...([{ name: 'yes', value: true }, { name: 'NO', value: false }] || []).map((option) => ({
                //             label: `${option?.name} `,
                //             value: option?._id,
                //         }))
                //     ],
                // },
            ]
        }
    ]

    return formFields
}

export const UpdateMallFormFieldDefinations = (stateOptions, cityOptions, floorsData) => {
    const formFields = [
        {
            name: 'title',
            fields: [
                {
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                    placeholder: 'Enter title for the mall'
                },
                {
                    name: 'state',
                    label: 'Select State',
                    type: 'select',
                    options: [
                        { label: 'Select', value: "" },
                        ...(stateOptions || []).map((option) => ({
                            label: option?.name,
                            value: option?._id
                        }))
                    ],
                },
                {
                    name: 'city',
                    label: 'Select City',
                    type: 'select',
                    options: [
                        { label: 'Select', value: "" },
                        ...(cityOptions || []).map((option) => ({
                            label: option?.name,
                            value: option?._id
                        }))
                    ],
                },
                {
                    name: 'available_floors',
                    label: 'Mall Locations',
                    type: 'mall-locations',
                    floorsData: floorsData

                },
                {
                    name: 'status',
                    label: 'Product Status',
                    type: 'select',
                    options: [
                        { label: 'Select', value: "" },
                        ...([
                            { label: 'Available', value: 'available' },
                            { label: "N/A", value: 'not_available' },
                            { label: "Coming Soon", value: 'coming_soon' }]).map((option) => ({
                                label: `${option?.label} `,
                                value: option?.value,
                            }))
                    ],
                },
            ]
        }
    ]

    return formFields
}