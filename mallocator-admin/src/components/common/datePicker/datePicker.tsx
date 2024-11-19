import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangeSelector.css"; // Import custom CSS for styling
import ReusableButton from "../buttons/Button";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterValue } from "../../../store/slices/tableFilter";

interface DateRangeSelectorProps {
    filterObj?: any;
    buttons?: any;
    title: any;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ buttons, filterObj, title }) => {
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    let filterName = filterObj.op + "_" + filterObj.path

    const storedDates = useSelector((state: RootState) => state.tableFilterSlice?.Events?.[filterObj.op + "_" + filterObj.path]) || [];
    
    const selectedDates = useSelector((state: RootState) =>  state.tableFilterSlice[title]?.[filterName])

    useEffect(()=>{
        if(selectedDates===undefined){
            setStartDate(null);
            setEndDate(null);
        }
    },[selectedDates])
    
    useEffect(() => {
        if (storedDates.length === 2) {
            setStartDate(new Date(storedDates[0]));
            setEndDate(new Date(storedDates[1]));
        }
    }, [storedDates]);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        // Automatically clear end date if start date is changed to be later
        if (date && endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    useEffect(() => {
        if (startDate && endDate) {
            dispatch(updateFilterValue({
                title: title,
                filterName: filterObj.op + "_" + filterObj.path,
                value: { "startDate": startDate.toISOString(), "endDate": endDate.toISOString() }
            }));
        }
    }, [startDate, endDate]);

    return (
        <div className="all">
            <div className="rosw d-flex flex-row mb-5">
                <div className="cosl-4 h-100">
                    <div className="d-flex flex-column w- custom-container align-items-center justify-content-center my-auto">
                        <DatePicker
                            className="m-2-1"
                            selected={startDate}
                            onChange={handleStartDateChange}
                            placeholderText="Start Date"
                            showTimeSelect
                            dateFormat="dd/MM/yyyy h:mm aa"
                            timeIntervals={1}
                            isClearable={true}
                        />
                    </div>
                </div>
                <div className="cosl-4 h-100">
                    <div className="d-flex flex-column w- custom-container align-items-center justify-content-center my-auto">
                        <DatePicker
                            className="m-2-1"
                            selected={endDate}
                            onChange={handleEndDateChange}
                            placeholderText="End Date"
                            showTimeSelect
                            dateFormat="dd/MM/yyyy h:mm aa"
                            timeIntervals={1}
                            isClearable={true}
                            minDate={startDate}  // Enforces that end date cannot be before start date
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-5 justify-content-center align-items-center">
                {buttons &&
                    buttons.map(({ label, action, variant }: any, index: number) => (
                        <ReusableButton
                            key={index}
                            size='sm'
                            variant={variant}
                            disabled={index === 1 && (startDate === null || endDate === null)}
                            onClick={() => {
                                if (index === 0) {
                                    filterObj?.applied && action(title, filterObj);
                                    buttons[0].action(title, filterObj);
                                } else {
                                    action(filterObj, {
                                        "startDate": startDate?.toISOString().split('T')[0],
                                        "endDate": endDate?.toISOString().split('T')[0]
                                    });   
                                }
                            }}
                        >
                            {label}
                        </ReusableButton>
                    ))}
            </div>
        </div>
    );
};

export default DateRangeSelector;
