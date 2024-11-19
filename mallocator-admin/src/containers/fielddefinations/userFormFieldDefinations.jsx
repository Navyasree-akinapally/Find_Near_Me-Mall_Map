import { useState } from "react";
import { SelectDateInputClasses } from "../classes"

export const AddMallAdminFormFieldDefinations = (mallOptions) => {
    const formFields = [
        {
            name: 'title',
            fields: [
                {
                    name: 'username',
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Create a new username'
                },
                {
                    name: 'email',
                    label: 'Email',
                    type: 'text',
                    placeholder: 'Enter Email'
                },
                {
                    name: 'password',
                    label: 'Password',
                    type: 'text',
                    placeholder: 'Create a new password'
                },
                {
                    name: 'mall',
                    label: 'Assign Mall',
                    type: 'multi-select',
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
            ]
        }
    ]

    return formFields
}