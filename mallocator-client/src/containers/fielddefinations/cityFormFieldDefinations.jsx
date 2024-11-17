
export const AddCityParametersFieldDefinitionsArray = (stateOptions) => {
    const formFields = [
        {
            name: 'title',
            fields: [
                {
                    name: 'city',
                    label: 'City Name',
                    type: 'text',
                    placeholder: 'Add city name'
                },
                {
                    name: 'state',
                    label: 'Select State Name',
                    type: 'select',
                    options: [
                        { label: 'Select', value: "" },
                        ...(stateOptions || []).map((option) => ({
                            label: option?.name,
                            value: option?._id
                        }))
                    ],
                },
            ]
        }
    ]

    return formFields
}