/* eslint-disable react/jsx-key */
import { useTable, useSortBy, usePagination  } from "react-table";

import TablePagination from '@mui/material/TablePagination';
import React from "react";
import '../../../assets/css/global.css';
export default function Table({ columns, data, onCellClick }) {
  
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    setPageSize,
    gotoPage,
    state: { pageSize, pageIndex },
    
    
  } = useTable(
    {
      columns,
      data,
      initialState: {  pageSize: 5, pageIndex: 0 },
    },
    useSortBy, // This plugin Hook will help to sort our table columns
    usePagination, // This plugin Hook will help to paginate our table
  );
  const pageSizeOptions = [5, 10, 20];

  
  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
 function handleClick(row) {
    onCellClick && onCellClick(row.original);
  }
  function handleChangePage(event, newPage) {
    gotoPage(newPage);
  }
  
  return (
   <React.Fragment>
     <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(header => (
              <th
              {...header.getHeaderProps(header.getSortByToggleProps())}
              className={
                [header.isSorted
                  ? header.isSortedDesc
                    ? "sort-desc"
                    : "sort-asc"
                    : "","text-center"]
              }
            >
              {header.render("Header")}
              {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                          default: '',
                  }[header.isSorted ? header.isSortedDesc ? 'desc' : 'asc': '']}
            </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()  } onClick={() => handleClick(row)}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    
    
    <div className="d-flex w-100 justify-content-end">
    <TablePagination
      sx={{ mb: 0 }}
      component="div"
      count={data.length}
      page={pageIndex}
      onPageChange={handleChangePage}
      rowsPerPage={pageSize}
      rowsPerPageOptions={pageSizeOptions}
      onRowsPerPageChange={(e) => setPageSize(Number(e.target.value))}
    />
    </div>
    
  
   
   </React.Fragment>
  );
}