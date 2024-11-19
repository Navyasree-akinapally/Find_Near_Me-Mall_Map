import { useNavigate } from "react-router-dom";
import mallServices from "../../../services/mall.service";
import { successToast } from "../../../components/toastNotifications";
import { Edit, Trash2 } from "lucide-react";

const MallAdminActionRender = ({ row }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin/mall/${row.original._id}/edit`);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this store?');
        if (confirmed) {
            try {
                await mallServices.deleteMallById(row.original._id);
                row.original.fetchDataFunc()
                successToast('mall deleted successfully');
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

export const columns = () => {
    return [
        {
            Header: 'Username',
            accessor: 'username',
            sortType: 'basic',
            isSortable: true,
            isFilterable: false,
        },
        {
            Header: 'email',
            accessor: 'email',
            sortType: 'basic',
            isSortable: true,
            isFilterable: false,
        },
        {
            Header: 'role',
            accessor: 'role',
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
            isHeaderCentered: true,
            Cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <MallAdminActionRender row={row} />
                </div>
            )
        }
    ]
}