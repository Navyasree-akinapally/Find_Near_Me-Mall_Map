import { useState } from "react";
import { SelectDateInputClasses } from "../classes"

export const AddStoreFormFieldDefinations = (mallOptions, categoryOptions, selectedMall, handleSelectFloor, selectedFloorOptions) => {
    const formFields = [
        {
            name: 'title',
            fields: [
                {
                    name: 'name',
                    label: 'Store Name',
                    type: 'text',
                    placeholder: 'Store Name'
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'text',
                    placeholder: 'Enter Description'
                },
                {
                    name: 'image_url',
                    label: 'Image URL',
                    type: 'text',
                    placeholder: 'Copy Url'
                },
                {
                    name: 'category',
                    label: 'Select Cateogory',
                    type: 'searchable-select',
                    placeholder: 'select Cateogory',
                    options: [
                        { label: 'Select', value: "" },
                        ...(categoryOptions || []).map((option) => ({
                            label: option?.title,
                            value: option?._id,
                        }))
                    ],
                },
                {
                    name: 'mall',
                    label: 'Select Mall',
                    type: 'searchable-select',
                    placeholder: 'select Mall',
                    options: [
                        { label: 'Select', value: "" },
                        ...(mallOptions || []).map((option) => ({
                            label: `${option?.title} ${option?.city.name}, ${option?.state.name}`,
                            value: option?._id,
                            // locationData: {
                            //     city: option?.city.name,
                            //     state: option?.state.name
                            // }
                        }))
                    ],
                },
                ...(selectedMall ? [
                    {
                        name: 'floor',
                        label: 'Choose Floor',
                        type: 'select',
                        placeholder: 'Choose Floor',
                        options: [
                            { label: 'Select', value: "" },
                            ...(selectedMall?.available_floors || []).map((option) => ({
                                label: `${option?.floor}`,
                                value: option?.floor,
                            }))
                        ],
                        onChange: (e) => {
                            console.log(e.target.value);
                            // Update selectedFloor when a floor is selected
                            handleSelectFloor(e.target.value) // Use setState if you are in a React component
                        }
                    },

                ] : []),
                ...(selectedMall && selectedFloorOptions?.length > 0 ? [
                    {
                        name: 'store_number',
                        label: 'Store Number',
                        type: 'select',
                        placeholder: 'Select Store Number',
                        options: [
                            { label: 'Select', value: "" },
                            ...selectedFloorOptions.map((store) => ({
                                label: store.store_number,
                                value: store.store_number,
                            }))
                        ],
                    }
                ] : []),
                {
                    name: 'timing',
                    label: 'Timing',
                    type: 'timeselector',
                    classes: SelectDateInputClasses
                },
                {
                    name: 'established_date',
                    label: 'Establisment',
                    type: 'datepicker',
                },
                {
                    name: 'isOpen',
                    label: 'Store Status',
                    type: 'select',
                    options: [
                        { label: 'Select', value: "" },
                        ...([{ title: 'Open', status: true }, { title: 'Closed', status: false }] || []).map((option) => ({
                            label: option?.title,
                            value: option?.status,
                        }))
                    ],

                },
                {
                    name: 'phone',
                    label: 'Phone',
                    type: 'number',
                    placeholder: 'Enter Mobile number'
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter Email'
                },
            ]
        }
    ]

    return formFields
}

export const updateStoreFormFieldDefinations = (mallOptions, categoryOptions, selectedMall, handleSelectFloor, selectedFloorOptions, initialValues) => {
    const formFields = [
        {
            name: 'title',
            fields: [
                {
                    name: 'name',
                    label: 'Store Name',
                    type: 'text',
                    placeholder: 'Store Name'
                },
                {
                    name: 'description',
                    label: 'Description',
                    type: 'text',
                    placeholder: 'Enter Description'
                },
                {
                    name: 'image_url',
                    label: 'Image url',
                    type: 'text',
                    placeholder: 'Paste URL'
                },
                {
                    name: 'category',
                    label: 'Select Cateogory',
                    type: 'searchable-select',
                    placeholder: 'select Cateogory',
                    options: [
                        { label: 'Select', value: "" },
                        ...(categoryOptions || []).map((option) => ({
                            label: option?.title,
                            value: option?._id,
                        }))
                    ],
                },
                {
                    name: 'mall',
                    label: 'Select Mall',
                    type: 'searchable-select',
                    placeholder: 'select Mall',
                    options: [
                        { label: 'Select', value: "" },
                        ...(mallOptions || []).map((option) => ({
                            label: `${option?.title} ${option?.city.name}, ${option?.state.name}`,
                            value: option?._id,
                        }))
                    ],
                },
                {
                    name: 'floor',
                    label: 'Floor',
                    type: 'disable',
                    value: initialValues.floor
                },
                {
                    name: 'store_number',
                    label: 'Store Number',
                    type: 'disable',
                    value: initialValues.store_number
                },
                ...(selectedMall ? [
                    {
                        name: 'floor',
                        label: 'Choose Floor',
                        type: 'select',
                        placeholder: 'Choose Floor',
                        options: [
                            { label: 'Select', value: "" },
                            ...(selectedMall?.available_floors || []).map((option) => ({
                                label: `${option?.floor}`,
                                value: option?.floor,
                            }))
                        ],
                        onChange: (e) => {
                            console.log(e.target.value);
                            // Update selectedFloor when a floor is selected
                            handleSelectFloor(e.target.value) // Use setState if you are in a React component
                        }
                    },

                ] : []),
                ...(selectedFloorOptions?.length > 0 ? [
                    {
                        name: 'store_number',
                        label: 'Store Number',
                        type: 'select',
                        placeholder: 'Select Store Number',
                        options: [
                            { label: 'Select', value: "" },
                            ...selectedFloorOptions.map((store) => ({
                                label: store?.store_number,
                                value: store?.store_number,
                            }))
                        ],
                    }
                ] : []),
                {
                    name: 'timing',
                    label: 'Timing',
                    type: 'timeselector',
                    classes: SelectDateInputClasses
                },
                {
                    name: 'established_date',
                    label: 'Establisment',
                    type: 'datepicker',
                },
                {
                    name: 'isOpen',
                    label: 'Store Status',
                    type: 'select',
                    options: [
                        { label: 'Select', value: "" },
                        ...([{ title: 'Open', status: true }, { title: 'Closed', status: false }] || []).map((option) => ({
                            label: option?.title,
                            value: option?.status,
                        }))
                    ],

                },
                {
                    name: 'phone',
                    label: 'Phone',
                    type: 'number',
                    placeholder: 'Enter Mobile number'
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Enter Email'
                },
                {
                    name: 'maps_url',
                    label: 'Maps URL',
                    type: 'text',
                    placeholder: 'Paste Maps URL'
                },
                {
                    name: 'website_url',
                    label: 'Website URL',
                    type: 'text',
                    placeholder: 'Paste Website URL'
                },

            ]
        }
    ]

    return formFields
}