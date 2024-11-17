// TableFilter.js
import React from "react";

function TableFilter({ globalFilter, setGlobalFilter }) {
  return (
    <div className="mb-4 flex justify-end items-center">
      <input
        type="text"
        placeholder="Search..."
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="p-2 border rounded w-full md:w-1/3 text-black border-black bg-[#d1d5da]"
      />
    </div>
  );
}

export default TableFilter;