import { useTable } from 'react-table';
import DataLoader from '../dataLoader/dataLoader';
import { TableRow } from './Styles';

const ListTable = ({ columns, data, isLoading, apiState, tableCustomClass, title = "", severity = "", rowHeaderBgColor = "table-row-gray-300", rowHeaderTextColor = "text-muted" }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div className={`${title === '' ? '' : 'card-header border-0 p-0'}`}>
      <h3 className="card-title align-items-start flex-column p-2">
        <span className="card-label fw-bolder fs-3 mb-1 ">{title}</span>
      </h3>
      <div className={tableCustomClass}>
        <DataLoader Loading={isLoading} apiState={apiState}>
          <table {...getTableProps()} className={`table table-row-bordered ${rowHeaderBgColor} align-middle gs-0 gy-3`}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className={`fw-bolder bg-light ${rowHeaderTextColor}  top-0`}>
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th {...column.getHeaderProps()}
                      className={`${column.id === 'logmessage' ? 'min-w-125px' : ''}`}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="fw-bold mb-1">
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <TableRow severity={row.original.severity || severity}
                    {...row.getRowProps()}
                    key={index}
                  >
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className='text-dark fw-bolder'>{cell.render('Cell')}</td>
                    ))}
                  </TableRow>
                );
              })}
            </tbody>
          </table>
        </DataLoader>
      </div>
    </div>
  );
};

export default ListTable;
