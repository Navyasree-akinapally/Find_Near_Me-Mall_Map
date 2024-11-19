import { useEffect, useState } from "react";
import mallServices from "../../services/mallAdmin/mall.service";

const Dashboard = () => {
    const [mallsData, setMallsData] = useState(null);

    // Load data from the API
    const loadData = async () => {
        try {
            const res = await mallServices.getMalls();
            setMallsData(res.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // Debugging the loaded data
    console.log(mallsData);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Render each mall's data */}
            {mallsData?.map((mall) => (
                <div key={mall._id} className="mb-12">
                    {/* Mall Information */}
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{mall.title}</h1>
                        <p className="text-gray-600">
                            Location: {mall.city.name}, {mall.state.name}
                        </p>
                        <p className="text-gray-600">
                            Floors Available: {mall.available_floors.length}
                        </p>
                        <p className="text-gray-600">
                            Stores: {mall.stores.length}
                        </p>
                    </div>

                    {/* Floor and Store Information */}
                    <div className="space-y-6">
                        {mall.available_floors.map((floor, index) => (
                            <div key={index} className="bg-white shadow rounded-lg p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
                                    {floor.floor}
                                </h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {floor.store_numbers.map((store, idx) => {
                                        const storeData = mall.stores.find(
                                            (s) => s.store_number === store.store_number
                                        );

                                        return (
                                            <li
                                                key={idx}
                                                className="border p-4 rounded shadow-sm bg-gray-50"
                                            >
                                                {storeData ? (
                                                    <>
                                                        <img
                                                            src={storeData.image_url || "/placeholder.png"}
                                                            alt={storeData.name}
                                                            className="w-full h-32 object-cover rounded mb-4"
                                                        />
                                                        <h3 className="text-lg font-semibold text-gray-800">
                                                            {storeData.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mb-2">
                                                            {storeData.description}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Status:{" "}
                                                            <span
                                                                className={`font-semibold ${storeData.isOpen
                                                                    ? "text-green-600"
                                                                    : "text-red-600"
                                                                    }`}
                                                            >
                                                                {storeData.isOpen ? "Open" : "Closed"}
                                                            </span>
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Floor: {storeData.floor}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Store #: {storeData.store_number}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <p className="text-gray-500">
                                                        Store information not available.
                                                    </p>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
