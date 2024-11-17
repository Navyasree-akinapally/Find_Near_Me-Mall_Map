import React from 'react';

const openingHours = [
    { day: 'Monday', time: '09:00 until 20:00' },
    { day: 'Tuesday', time: '09:00 until 20:00' },
    { day: 'Wednesday', time: '09:00 until 20:00' },
    { day: 'Thursday', time: '09:00 until 20:00' },
    { day: 'Friday', time: '09:00 until 20:00' },
    { day: 'Saturday', time: '09:00 until 20:00' },
    { day: 'Sunday', time: 'Closed' }
];

const OpeningHours = ({ isDarkMode }) => {
    // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
    const currentDayIndex = new Date().getDay();

    // Define an array of days to compare with the days in openingHours
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div
            className={`rounded-xl h-[20em] p-4 col-span-1 w-full ${isDarkMode ? 'bg-[#FFCF9D] text-gray-900' : 'bg-[#352F44] text-white'}`}
        >
            <span className='text-xl font-bold'>Opening hours</span>
            <div className='mt-4 flex flex-col gap-2'>
                {openingHours.map((item, index) => (
                    <div
                        key={index}
                        className={`flex items-center text-sm ${item.day === daysOfWeek[currentDayIndex] ? 'font-bold' : ''}`}
                    >
                        <span className='w-28'>{item.day}</span>
                        <span>{item.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OpeningHours;
