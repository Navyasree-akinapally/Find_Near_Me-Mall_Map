import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { successToast } from './../../../components/toastNotifications/index';
import adminProductServices from '../../../services/admin/product.service';
import { useAuth } from '../../../context/auth-context';

const StoreActionRender = ({ row }) => {
    const navigate = useNavigate();
    const { isMallAdminAuth } = useAuth()

    const handleEdit = () => {
        !isMallAdminAuth ? navigate(`/admin/product/${row.original._id}/edit`) :
            navigate(`/malladmin/product/${row.original._id}/edit`);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this store?');
        if (confirmed) {
            try {
                console.log(row.original._id);
                await adminProductServices.deleteProductById(row.original._id);
                row.original.fetchDataFunc()
                successToast('Store deleted successfully');
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
        Header: 'Store',
        accessor: 'store',
        sortType: 'basic',
        isSortable: true,
        isFilterable: false,
    },
    {
        Header: 'Quantity',
        accessor: 'quantity',
        sortType: 'basic',
        isSortable: true,
        isFilterable: false,
    },
    {
        Header: 'Price',
        accessor: 'price',
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
        Cell: ({ row }) => (
            <div className='flex items-center justify-center'>
                <StoreActionRender row={row} />
            </div>
        )
    }
];
