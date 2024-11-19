import React, { useState } from 'react';
import StateCreatePage from './state';
import CityCreatePage from './city';
import { AlertTriangle } from 'lucide-react';

const CreateLocations = () => {
    const [states, setStates] = useState([]); // Shared state for all created states
    const [isStateCreated, setIsStateCreated] = useState(false);
    const [openCityForm, setOpenCityForm] = useState(false)

    // Callback function to handle new state creation
    const handleStateCreated = (newState) => {
        setStates((prevStates) => [...prevStates, newState]);
        setIsStateCreated(true); // Allow city creation once a state is created
    };

    const handleOpenCityForm = () => {
        setOpenCityForm(!openCityForm)
    }

    return (
        <div className="py-4">
            <div className="flex items-center space-x-2 px-8 text-gray-900">
                <AlertTriangle className="text-yellow-500" />
                <span>
                    You can only create a City if a particular State is created first or <span className='underline text-black cursor-pointer' onClick={handleOpenCityForm}>Create City</span>
                </span>
            </div>

            {/* Pass the callback to StateCreatePage to update the states */}
            <StateCreatePage onStateCreated={handleStateCreated} />

            {/* Pass the updated list of states to CityCreatePage */}
            {isStateCreated | openCityForm ? (
                <CityCreatePage states={states} />
            ) : (
                <div className="p-8 text-gray-500">
                    <span>Please create a State first to enable City creation.</span>
                </div>
            )}
        </div>
    );
};

export default CreateLocations;
