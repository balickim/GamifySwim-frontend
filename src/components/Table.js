import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import styled from 'styled-components';
// import NewWindow from './NewWindow';

const TrStyled = styled.tr`
    background-color: #007BB5;
    ${TrStyled}:hover {
        background-color: white;
        cursor: pointer;
  }
`

export default function Table(props) {
  let {columns, data, pageSize, pageIndex} = useTable(props);
  const [filterInput, setFilterInput] = useState("");
  const [currentData, setCurrentData ] = useState([]);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    setFilter,
    // state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: currentData,
      initialState: {
        pageSize,
        pageIndex,
      },
      manualPagination: true,
      pageCount: 10,
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("secondname", value);
    setFilterInput(value);
  };

  useEffect(() => {
    setCurrentData(data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize));
  }, [pageIndex, pageSize])

  return (
    <div>
      <input
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Search name"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TrStyled {...row.getRowProps()}
                  onClick={()=>props.handleShow(row)}
                  // onClick={()=>props.toggleWindowPortal(row)}
                  >
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </TrStyled>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}