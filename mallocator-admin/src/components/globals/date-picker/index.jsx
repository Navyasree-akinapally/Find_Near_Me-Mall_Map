import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import './DateRangeSelector.css'
import { styled } from 'styled-components';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


const BaseDatePicker = ({ fieldName, initialValues, customClassName }) => {
    const [date, setDate] = useState(null)
    const { setFieldValue } = useFormikContext()

    useEffect(() => {
        if (initialValues && initialValues[fieldName]) {
            const date = initialValues[fieldName]
            setDate(new Date(date))
        }
    }, [initialValues, fieldName])

    useEffect(() => {
        if (date) {
            const timeString = `${date.toISOString()}`
            setFieldValue(fieldName, timeString)
        }
    }, [date])
    return (
        <div className='flex justify-between'>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                startDate={date}
                dateFormat="dd/MM/yyyy"
                selectsStart
                isClearable={true}
                todayButton="Today"
                dropdownMode='select'
                shouldCloseOnSelect={false}
                className='p-2 rounded-md placeholder:text-white'
                placeholderText='pick date'
            />
        </div>
    );
}

export default BaseDatePicker;
