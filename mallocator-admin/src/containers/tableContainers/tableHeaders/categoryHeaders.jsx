import { useNavigate } from "react-router-dom";
import mallServices from "../../../services/mall.service";
import { successToast } from "../../../components/toastNotifications";
import { Edit, Trash2 } from "lucide-react";
import adminCategoryService from "../../../services/admin/category.service";
import { useAuth } from "../../../context/auth-context";

const CateogryActionRender = ({ row }) => {
    const navigate = useNavigate();
    const { isMallAdminAuth } = useAuth()

    const handleEdit = () => {
        !isMallAdminAuth ?
            navigate(`/admin/category/${row.original._id}/edit`) :
            navigate(`/malladmin/category/${row.original._id}/edit`);
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete this store?');
        if (confirmed) {
            try {
                await adminCategoryService.deleteCategoryById(row.original._id);
                row.original.fetchDataFunc()
                successToast('category deleted successfully');
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
            Header: 'Category Name',
            accessor: 'title',
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
                <div className="flex items-center justify-center">
                    <CateogryActionRender row={row} />
                </div>
            )
        }
    ]
}