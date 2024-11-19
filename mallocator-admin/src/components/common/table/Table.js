import React, { useState, useMemo } from "react";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import './table.css';
import BaseLoading from "../../loader/config-loading";
import TableFilter from "./Filter";

function Table({
  columns,
  data,
  title,
  displayTitle,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  const paginatedData = useMemo(() => {
    const startRow = (currentPage - 1) * rowsPerPage;
    return data.slice(startRow, startRow + rowsPerPage);
  }, [currentPage, data]);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    setGlobalFilter,
    state: { globalFilter },
    prepareRow,
  } = useTable(
    {
      columns,
      data: paginatedData, // Only show paginated data
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="rounded-lg shadow-md overflow-hidden">
        {title && (
          <div className="border-b border-gray-300 py-3">
            <h3 className="text-lg font-bold mb-1">
              {displayTitle ? displayTitle : title}
            </h3>
          </div>
        )}

        <div className="p-4 mb-1">
          <TableFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          <div className="overflow-x-auto">

            {paginatedData.length ? (

              <div>
                <table
                  className="w-full border border-white"
                >
                  <thead className="border-b border-white">
                    {headerGroups.map((headerGroup) => (
                      <tr className="font-semibold">
                        {headerGroup.headers.map((column) => (
                          <th className="p-2">
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody className="font-medium">
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} className="border-b border-white">
                          {row.cells.map((cell) => (
                            <td className="px-4 py-2 text-center">
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex items-center justify-between p-4 text-black">
                  <button
                    className="px-3 py-1  hover:bg-gray-500 rounded disabled:opacity-40"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <span className="">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    className="px-3 py-1  hover:bg-gray-500 rounded disabled:opacity-40"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>

            ) : (
              <div className="flex items-center justify-center">
                <div colSpan={columns.length} className=" text-red-500 font-semibold flex items-center justify-center">
                  No records available
                </div>
              </div>
            )}
          </div>


        </div>
        {/* Pagination Controls */}

      </div>
    </>
  );
}

export default Table;
