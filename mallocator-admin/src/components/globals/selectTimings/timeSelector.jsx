import React, { useState } from "react";

// Helper function to convert 24-hour format to 12-hour format with AM/PM
const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12; // Convert hour "0" or "12" to "12" in 12-hour format
    return `${adjustedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

// Helper function to handle setting 24-hour format from 12-hour input
const convertTo24HourFormat = (time) => {
    const [hourPart, minutePart] = time.split(" ")[0].split(":");
    const period = time.split(" ")[1];
    let hour = parseInt(hourPart, 10);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    return `${hour.toString().padStart(2, "0")}:${minutePart}`;
};

const TimeSelector = ({ name, value, onChange }) => {
    const [startTime, setStartTime] = useState(value?.startTime || "12:00 PM");
    const [endTime, setEndTime] = useState(value?.endTime || "06:00 PM");

    const handleTimeChange = (event, type) => {
        const newTime = event.target.value;

        // Convert selected time to 24-hour format for setting the value
        const convertedTime = convertTo12HourFormat(newTime);

        if (type === "start") {
            setStartTime(newTime);
            onChange({ ...value, startTime: convertedTime });
        } else if (type === "end") {
            setEndTime(newTime);
            onChange({ ...value, endTime: convertedTime });
        }
    };

    return (
        <div className="p-2 flex gap-4">
            <div className="flex gap-2 items-center">
                <label>Start Time:</label>
                <input
                    type="time"
                    value={convertTo24HourFormat(startTime)}
                    onChange={(e) => handleTimeChange(e, "start")}
                    className="bg-slate-500 rounded-md p-2"
                />
            </div>
            <div className="flex gap-2 items-center">
                <label>End Time:</label>
                <input
                    type="time"
                    value={convertTo24HourFormat(endTime)}
                    onChange={(e) => handleTimeChange(e, "end")}
                    className="bg-slate-500 rounded-md p-2"
                />
            </div>
        </div>
    );
};

export default TimeSelector;
