import React, { useState, useEffect } from 'react';

const TimeRangeSelector = ({ value, onChange }) => {
    const [startTime, setStartTime] = useState(value.startTime);
    const [endTime, setEndTime] = useState(value.endTime);
    const [duration, setDuration] = useState(null);

    const times = [
        '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
        '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'
    ];

    useEffect(() => {
        setStartTime(value.startTime);
        setEndTime(value.endTime);

        if (value.startTime && value.endTime) {
            calculateDuration(value.startTime, value.endTime);
        }
    }, [value]);

    // Convert time (e.g., '1:00 PM') to 24-hour format for easier duration calculation
    const convertTo24HourFormat = (time) => {
        let [hours, modifier] = time.split(' ');
        let [hour, minutes] = hours.split(':');
        hour = parseInt(hour);

        if (modifier === 'PM' && hour !== 12) hour += 12;
        if (modifier === 'AM' && hour === 12) hour = 0;

        return hour;
    };

    // Calculate duration in hours
    const calculateDuration = (start, end) => {
        const startHour = convertTo24HourFormat(start);
        const endHour = convertTo24HourFormat(end);
        const calculatedDuration = endHour - startHour;
        setDuration(calculatedDuration >= 0 ? calculatedDuration : 24 + calculatedDuration); // Handles overnight ranges
    };

    const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        setStartTime(newStartTime);
        if (endTime) calculateDuration(newStartTime, endTime);
        onChange({ ...value, startTime: newStartTime });
    };

    const handleEndTimeChange = (e) => {
        const newEndTime = e.target.value;
        setEndTime(newEndTime);
        if (startTime) calculateDuration(startTime, newEndTime);
        onChange({ ...value, endTime: newEndTime });
    };

    return (
        <div className="flex gap-4 text-black">
            <div className="flex items-center gap-2">
                <label >Start Time:</label>
                <select value={startTime} onChange={handleStartTimeChange} className="border p-2 rounded text-white">
                    <option value="">Select Start Time</option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label>End Time:</label>
                <select value={endTime} onChange={handleEndTimeChange} className="border p-2 rounded text-white">
                    <option value="">Select End Time</option>
                    {times.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TimeRangeSelector;
