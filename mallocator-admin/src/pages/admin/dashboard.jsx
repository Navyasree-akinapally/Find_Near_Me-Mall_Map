import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import mallServices from "../../services/mall.service";
import adminUserServices from "../../services/admin/user.service";
import storeService from "../../services/store.service";

const Dashboard = () => {
    const [mallsData, setMallsData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [storesData, setStoresData] = useState([]);
    const [adminCount, setAdminCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const [topCatData, setTopCatData] = useState(null)
    const loadData = async () => {
        try {
            const [mallsRes, usersRes, storesRes, adminCountRes, customerCountRes, topCatRes] = await Promise.all([
                mallServices.getMalls(),
                adminUserServices.getUsers(),
                storeService.getStores(),
                adminUserServices.getAdminCount(),
                adminUserServices.getCustomerCount(),
                storeService.getTopCategories()
            ]);

            if (mallsRes?.data) setMallsData(mallsRes.data);
            if (usersRes?.data) setUsersData(usersRes.data);
            if (storesRes?.data) setStoresData(storesRes.data);
            if (adminCountRes?.data) setAdminCount(adminCountRes.data);
            if (customerCountRes?.data) setCustomerCount(customerCountRes.data);
            if (topCatRes?.data) setTopCatData(topCatRes.data)
        } catch (e) {
            console.error("Error loading data:", e);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    console.log(topCatData);

    // Pie chart data
    const userAnalytics = [
        { name: "Admins", value: adminCount },
        { name: "Customers", value: customerCount },
    ];
    const COLORS = ["#0088FE", "#00C49F"];

    // Bar chart data
    const storeDistribution = topCatData?.map(item => ({
        name: item.categoryName,
        stores: item.storeCount
    }))

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard Analytics</h1>
                <p className="text-gray-600">Overview of malls, stores, and users</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cards */}
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Total Malls</h2>
                    <p className="text-4xl font-bold text-blue-500">{mallsData?.length || 0}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Total Stores</h2>
                    <p className="text-4xl font-bold text-green-500">{storesData?.length || 0}</p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
                    <p className="text-4xl font-bold text-purple-500">{usersData?.length || 0}</p>
                </div>
            </div>

            {/* Charts */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* User Analytics Pie Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">User Analytics</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={userAnalytics}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {userAnalytics.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Store Distribution Bar Chart */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Store Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={storeDistribution}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="stores" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
