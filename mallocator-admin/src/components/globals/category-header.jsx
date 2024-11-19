import React from 'react';

const CategoryLayoutHeader = ({ category, mallName }) => {
    return (
        <div className='flex flex-col gap-8'>
            <label htmlFor="" className='text-2xl font-bold'>Stores {category?.categoryName} in {mallName} ({category?.storeCount})</label>
        </div>
    );
}

export default CategoryLayoutHeader;
