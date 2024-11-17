import React, { useEffect, useState } from 'react';
import locationService from '../../../services/location.service';

const SelectLocations = ({ formik }) => {
    const [stateData, setStateData] = useState(null)
    const [cityData, setCityData] = useState(null)
    const [selectedState, setSelectedState] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await locationService.getState();
                if (res.data) {
                    setStateData(res.data)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [])

    console.log(stateData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await locationService.getCity(selectedState);
                if (res.data) {
                    setCityData(res.data)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [selectedState])
    return (
        <div>
            <div className="mb-4">
                <div className="flex flex-col ">
                    <label className="block text-white text-sm font-bold mb-2">Select State</label>
                    <select
                        name="state"
                        id="state"
                        className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                        onChange={(e) => setSelectedState(e.target.value)}
                        {...formik.getFieldProps("state")}
                    >
                        <option value="" label="Select a mall" />
                        {stateData?.length > 0 && stateData.map((state) => (
                            <option key={state._id} value={state._id} className='flex justify-between'>
                                <div className='font-bold'>{state.name}</div>{" "}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="mb-4">
                <div className="flex flex-col ">
                    <label className="block text-white text-sm font-bold mb-2">Select City</label>
                    <select
                        name="city"
                        id="city"
                        className="w-full px-3 py-2  bg-gray-200 text-black rounded-sm"
                        {...formik.getFieldProps("city")}
                    >
                        <option value="" label="Select a mall" />
                        {cityData?.length > 0 && cityData.map((city) => (
                            <option key={city.name} value={city._id} className='flex justify-between'>
                                <div className='font-bold'>{city.name}</div>{" "}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SelectLocations;
