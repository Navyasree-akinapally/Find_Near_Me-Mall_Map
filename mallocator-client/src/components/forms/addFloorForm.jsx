import { useState } from "react";


const AddFloorsForm = ({ name, value, floorsData, onChange }) => {
    // Memoize the initial floors data
    // const initialFloors = useMemo(() => {
    //     return (value || []).map(floorData => ({
    //         floor: floorData.floor || '',
    //         storeNumbers: floorData.store_numbers || ['']
    //     }));
    // }, [value]);

    // Initialize floors state with memoized initialFloors
    console.log(value);
    const [floors, setFloors] = useState([
        {
            floor: '',
            storeNumbers: [
                {
                    store_number: ''
                }
            ]
        }
    ]);

    console.log(floors);
    const triggerOnChange = (updatedFloors) => {
        // Filter out empty floors or store numbers
        const filteredFloors = updatedFloors.filter((floor) =>
            floor.floor.trim() !== '' || floor.storeNumbers.some(store => store.store_number.trim() !== '')
        );

        // Only pass updated floors with values
        onChange(filteredFloors);
    };

    const handleFloorChange = (index, event) => {
        const updatedFloors = [...floors];
        updatedFloors[index].floor = event.target.value;
        triggerOnChange(updatedFloors);
    };

    const handleStoreNumberChange = (floorIndex, storeIndex, event) => {
        const updatedFloors = [...floors];
        updatedFloors[floorIndex].storeNumbers[storeIndex].store_number = event.target.value;
        triggerOnChange(updatedFloors);
    };

    const handleAddStoreNumber = (floorIndex) => {
        const updatedFloors = [...floors];
        updatedFloors[floorIndex].storeNumbers.push({ store_number: '' });
        triggerOnChange(updatedFloors);
    };

    const handleAddFloor = () => {
        triggerOnChange([...floors, { floor: '', storeNumbers: [{ store_number: '' }] }]);
    };

    const handleRemoveFloor = (index) => {
        const updatedFloors = floors.filter((_, i) => i !== index);
        triggerOnChange(updatedFloors);
    };

    const handleRemoveStoreNumber = (floorIndex, storeIndex) => {
        const updatedFloors = [...floors];
        updatedFloors[floorIndex].storeNumbers = updatedFloors[floorIndex].storeNumbers.filter((_, i) => i !== storeIndex);
        triggerOnChange(updatedFloors);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(floors);
        // onChange(floors) // Final floors data after submission
    };

    console.log(floorsData);

    return (
        <div>

            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6 p-6 bg-gray-300 rounded-lg shadow-md">
                <div className="space-y-6 p-6 rounded-lg shadow-md mb-4 bg-gray-400">
                    {/* Title */}
                    <span className="text-lg font-semibold text-gray-700">Floors and Store Numbers</span>

                    {/* Render Floors and Store Numbers */}
                    <div className="space-y-4">
                        {floorsData?.length === 0 ? (
                            <p>No floors available to display.</p>
                        ) : (
                            floorsData?.map((floor, floorIndex) => (
                                <div key={floorIndex} className="border p-4 rounded-lg shadow-sm  bg-gray-200">
                                    {/* Floor Title */}
                                    <div className="text-xl font-semibold text-gray-800 mb-2">{floor.floor || 'Unnamed Floor'}</div>

                                    {/* Store Numbers */}
                                    <div className="flex flex-wrap gap-2">
                                        {floor?.store_numbers?.length === 0 ? (
                                            <p>No store numbers for this floor.</p>
                                        ) : (
                                            floor?.store_numbers?.map((storeNumber, storeIndex) => (
                                                <div
                                                    key={storeIndex}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                                                >
                                                    Store #{storeIndex + 1}: {storeNumber.store_number || 'Not Available'}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <span className="text-lg font-semibold text-gray-700">Add Floors and Store Numbers</span>

                {floors.map((floor, floorIndex) => (
                    <div key={floorIndex} className="space-y-4">
                        {/* Floor Name Input */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-600">Floor Name:</label>
                            <input
                                type="text"
                                name="floor"
                                value={floor.floor}
                                onChange={(e) => handleFloorChange(floorIndex, e)}
                                required
                                className="flex-1 p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                            />
                        </div>

                        {/* Store Numbers */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-600">Store Numbers:</label>
                            {floor.storeNumbers.map((storeNumber, storeIndex) => (
                                <div key={storeIndex} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={storeNumber.store_number}
                                        onChange={(e) => handleStoreNumberChange(floorIndex, storeIndex, e)}
                                        placeholder={`Store ${storeIndex + 1}`}
                                        required
                                        className="p-2 border border-gray-300 bg-white text-black rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full max-w-[200px]"
                                    />
                                    {floor.storeNumbers.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveStoreNumber(floorIndex, storeIndex)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => handleAddStoreNumber(floorIndex)}
                                className="text-blue-500 hover:text-blue-700 text-sm mt-2"
                            >
                                + Add Store Number
                            </button>
                        </div>

                        {/* Remove Floor Button */}
                        {floors.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveFloor(floorIndex)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Remove Floor
                            </button>
                        )}
                    </div>
                ))}

                {/* Add Floor Button */}
                {/* <button
                    type="button"
                    onClick={handleAddFloor}
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    + Add Floor
                </button> */}
            </form>
        </div>
    );
};

export default AddFloorsForm;