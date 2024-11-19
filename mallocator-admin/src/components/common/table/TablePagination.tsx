import React, { useState, useEffect } from 'react';
import { Pagination } from "react-bootstrap";
import { TablePaginationProps , PaginationRange } from '../../interfaces/TablePagination';

const TablePagination: React.FC<TablePaginationProps> = ({
  paginattionCallBack=undefined,
  pageSizeCallBack=undefined,
  totalRecords=0
}) => {
  const PAGE_SIZE_OPTIONS = [10, 15, 20];
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(Math.max(1, Math.ceil(totalRecords / pageSize)));

  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(totalRecords / pageSize)));
  }, [pageSize, totalRecords]);

  const renderPagination = (): PaginationRange => {
    const itemsToShow = 3;
    const halfItemsToShow = Math.floor(itemsToShow / 2);
    let startIndex = currentPage - halfItemsToShow;
    let endIndex = currentPage + halfItemsToShow;
    if (startIndex < 1) {
      startIndex = 1;
      endIndex = Math.min(itemsToShow, totalPages);
    }
    if (endIndex > totalPages) {
      endIndex = totalPages;
      startIndex = Math.max(totalPages - itemsToShow + 1, 1);
    }
    return { startIndex, endIndex };
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (paginattionCallBack) {
      paginattionCallBack(pageSize,pageNumber);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = parseInt(event.target.value);
    setPageSize(newPageSize);
    if (pageSizeCallBack) {
      pageSizeCallBack(newPageSize);
    }
    setCurrentPage(1);
  };

  const { startIndex, endIndex } = renderPagination();

  return (
    <>
      <div className="position-absolute bottom-0 p-6 ms-3">
        <span className="me-1">Show</span>
        <select value={pageSize} onChange={handlePageSizeChange}>
          {PAGE_SIZE_OPTIONS.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="ms-1">entries</span>
      </div>
      <Pagination className="p-3">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "pe-none" : ""}
        />
        {Array.from({ length: endIndex - startIndex + 1 }, (_, index) => startIndex + index).map(
          (pageIndex) => (
            <Pagination.Item
              key={pageIndex}
              active={pageIndex === currentPage}
              onClick={() => handlePageChange(pageIndex)}
            >
              {pageIndex}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </>
  );
};

export default TablePagination;