import React, {createRef, ReactElement, RefObject, useEffect, useRef} from "react";
import {
  Cell,
  Column,
  HeaderGroup,
  Row,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {FileData} from "../../../sites/files/Files";
import Button from "../../form/Button";
import OpenInNewTabIcon from "../../icons/OpenInNewTabIcon";
import DownloadIcon from "../../icons/DownloadIcon";
import DeleteForeverIcon from "../../icons/DeleteForeverIcon";
import FormatCsvIcon from "../../icons/FormatCsvIcon";
import FormatPngIcon from "../../icons/FormatPngIcon";
import {useHistory} from "react-router-dom";
import useWindowSize from "../../hooks/UseWindowSize";

type TableWidgetVariant = "short" | "long"
interface TableWidgetProps<T extends FileData> {
  columns: Column<T>[];
  data: T[];
  variant: TableWidgetVariant;
}

export function TableWidget<T extends FileData>({ columns, data, variant }: TableWidgetProps<T>): ReactElement {
  const DEFAULT_PAGE_SIZE = variant === 'long' ? 8 : 2;

  const [width, height] = useWindowSize();
  const thRefs: RefObject<HTMLTableHeaderCellElement>[] = [];
  const tdRefs: RefObject<HTMLTableHeaderCellElement>[] = [];
  const tBody = useRef<HTMLTableSectionElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);


  const history = useHistory();
  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<T>(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setPageSize(DEFAULT_PAGE_SIZE)
  }, [setPageSize]);

  useEffect(() => {
    if (wrapper.current && tBody.current && thRefs.length > 0 && tdRefs.length > 0) {
      const firstHeaderRowWidthFirstItem = window.getComputedStyle(thRefs[0].current as Element).getPropertyValue('width');
      const wrapperHeight = window.getComputedStyle(wrapper.current).getPropertyValue("height")
      tBody.current.style.height = wrapperHeight;
      tdRefs.map((tdRef, index) => { return (index % 3 === 0 && tdRef.current) ? tdRef.current.style.width = firstHeaderRowWidthFirstItem : false})

    }
  }, [width, height, wrapper, tBody, thRefs, tdRefs])


  return (
    <>
      <div className={"w-full h-full p-7"}>
        <div className={"flex items-center"}>
          <h5 className="text-h5 ">Dateien</h5>
          <small className={"text-subtitle2 ml-2"}>({data.length})</small>
        </div>

        <div className="h-full max-h-[calc(100%-2rem)] flex flex-col justify-between mt-2">
          <div className="overflow-y-scroll mt-4" ref={wrapper}>
            <table {...getTableProps()} className={"w-full text-left"}>
              <thead className={"text-secondary border-b border-b-grayscale text-sm"}>
              {headerGroups.map((headerGroup: HeaderGroup<T>) => (
                <tr
                  key={headerGroup.getHeaderGroupProps().key}
                  role={headerGroup.getHeaderGroupProps().role}
                  className={headerGroup.getHeaderGroupProps().className}
                  style={headerGroup.getHeaderGroupProps().style}
                >
                  {headerGroup.headers.map((column: HeaderGroup<T>, index) => {
                    const newRef = createRef<HTMLTableHeaderCellElement>();
                    thRefs.push(newRef);
                    return (
                      <th
                        {...headerGroup.getHeaderGroupProps(column.getSortByToggleProps())}
                        key={column.getHeaderProps().key}
                        role={column.getHeaderProps().role}
                        className={`${column.getHeaderProps().className} ${index > 0 && 'w-32'} pb-3 first:pl-15 cursor-pointer`}
                        style={column.getHeaderProps().style}
                      >
                        {column.render("Header")}
                        <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                      </th>
                    )
                  })}
                  <th className={"pb-3 w-33"}>
                    Aktion
                  </th>
                </tr>
              ))}
              </thead>
              <tbody {...getTableBodyProps()}>
              {page.map((row: Row<T>) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.getRowProps().key}
                    role={row.getRowProps().role}
                    className={`${row.getRowProps().className} border-b border-b-grayscale h-13`}
                    style={row.getRowProps().style}
                  >
                    {row.cells.map((cell: Cell<T>) => {
                      const newRef = createRef<HTMLTableHeaderCellElement>();
                      tdRefs.push(newRef);

                      return <td
                        key={cell.getCellProps().key}
                        role={cell.getCellProps().role}
                        className={`${cell.getCellProps().className} border-b border-b-grayscale h-13 first:pl-7 first:pr-5 not:first:w-33 whitespace-nowrap`}
                        style={cell.getCellProps().style}
                      >
                        {cell.column.id === 'fileName' && row.original.fileType === 'csv' && <FormatCsvIcon className={"float-left align-baseline w-4 h-5 mr-4 mt-0.5"}/>}
                        {cell.column.id === 'fileName' && row.original.fileType === 'png' && <FormatPngIcon className={"float-left align-baseline w-4 h-5 mr-4 mt-0.5"}/>}

                        {cell.render("Cell")}
                        {cell.column.id === 'fileSize' && row.original.fileSizeUnit}
                      </td>;
                    })}
                    <td className={"flex justify-between items-center h-13 first:pl-7 last:pr-7 w-33"}>
                      <Button variant={"icon"}><DownloadIcon className="w-4 h-4"/></Button>
                      <Button variant={"icon"}><OpenInNewTabIcon className="w-4 h-4"/></Button>
                      <Button variant={"icon"}><DeleteForeverIcon className="w-4 h-4"/></Button>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>

          <div className="w-full flex justify-end mt-8">
            <div className={"flex items-center text-sm"}>
              <span className={"ml-8 mr-8"}>
                {pageIndex + 1} {' - '} {pageIndex * pageSize + page.length} von {data.length} {' '}
              </span>
              <Button variant="primary" onClick={() => history.push('/dashboard/files')} >
                Mehr Dateien sehen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
