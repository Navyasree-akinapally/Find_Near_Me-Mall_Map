import React, { FC, useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { BaseDateRangeSelectortypes } from '../../interfaces/BaseDateRangeSelectorInterface';

const BaseDateRangeSelector: FC<BaseDateRangeSelectortypes> = ({
    customClassName,
    fieldName,
    initialValues,
    customMaxMin,
}) => {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const { setFieldValue } = useFormikContext()

    useEffect(() => {
        if (initialValues && initialValues[fieldName]) {
            const [start, end] = initialValues[fieldName].split(' - ')
            setStartDate(new Date(start))
            setEndDate(new Date(end))
        }
    }, [initialValues, fieldName])

    useEffect(() => {
        if (startDate && endDate) {
            const timePeriodString = `${startDate.toISOString()} - ${endDate.toISOString()}`;
            setFieldValue(fieldName, timePeriodString);
        }
    }, [startDate, endDate])

    return (
        <div className='d-flex justify-content-between align-items-center gap-2'>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                startDate={startDate}
                endDate={endDate}
                selectsStart
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
                isClearable={true}
                disabledKeyboardNavigation
                maxDate={customMaxMin ? customMaxMin.StartMaximumDate : null}
                minDate={customMaxMin ? customMaxMin.StartMinimumDate : null}
                className={customClassName.input}
                showPopperArrow={false}
                todayButton="Today"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                shouldCloseOnSelect={false}
            />
            <span>-</span>
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
                selectsEnd
                maxDate={customMaxMin ? customMaxMin.EndMaximumDate : null}
                minDate={customMaxMin ? customMaxMin.EndMinimumDate : null}
                isClearable={true}
                disabledKeyboardNavigation
                className={customClassName.input}
                showPopperArrow={false}
                todayButton="Today"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                shouldCloseOnSelect={false}
            />
        </div>
    );
};

export default BaseDateRangeSelector;
