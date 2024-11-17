import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import storeService from '../../../services/store.service';
import { successToast } from './../../../components/toastNotifications/index';

const StoreActionRender = ({ row }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin/store/${row.original._id}/edit`);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this store?');
        if (confirmed) {
            try {
                await storeService.deleteStoreById(row.original._id);
                row.original.fetchDataFunc()
                successToast('Store deleted successfully');
                // Optional: Refresh the table data here if needed
            } catch (error) {
                console.error('Error deleting store:', error);
            }
        }
    };

    return (
        <div className="flex items-center space-x-2">
            <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
                <Edit size={18} />
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export const columns = [
    {
        Header: 'Name',
        accessor: 'name',
        sortType: 'basic',
        isSortable: true,
        isFilterable: false,
    },
    {
        Header: 'Category',
        accessor: 'category',
        sortType: 'basic',
        isSortable: true,
        isFilterable: false,
    },
    {
        Header: 'Mall Name',
        accessor: 'mallName',
        sortType: 'basic',
        isSortable: true,
        isFilterable: false,
    },
    {
        Header: 'Location',
        accessor: 'location',
        sortType: 'basic',
        isSortable: true,
        isFilterable: false,
    },
    {
        Header: 'Phone',
        accessor: 'phone',
        sortType: 'basic',
        isSortable: true,
        isFilterable: false,
    },
    {
        Header: 'Likes',
        accessor: 'likes',
        sortType: 'basic',
        isSortable: true,
        isFilterable: false,
    },
    {
        Header: 'Actions',
        accessor: 'actions',
        sortType: 'basic',
        isSortable: false,
        isFilterable: false,
        Cell: ({ row }) => <StoreActionRender row={row} />
    }
];
