import { Edit, Trash2 } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ActionRender = ({ row, handleDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/admin/store/${row.original._id}/edit`);
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
}

export default ActionRender;
