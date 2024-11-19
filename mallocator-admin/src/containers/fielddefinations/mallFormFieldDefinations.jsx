
export const AddMallFormFieldDefinations = (stateOptions, cityOptions, floorsData) => {
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
                    name: 'locations',
                    label: 'Mall Locations',
                    type: 'mall-locations',
                    floorsData: floorsData
                },
                {
                    name: 'location_url',
                    label: 'Location Url',
                    type: 'text',
                    placeholder: 'Paste Location URL'
                },
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
                    type: 'searchable-select',
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
                    type: 'searchable-select',
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
                    name: 'location_url',
                    label: 'Location Url',
                    type: 'text',
                    placeholder: 'Paste Location URL'
                },

            ]
        }
    ]

    return formFields
}