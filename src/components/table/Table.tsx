import React, {
  createRef,
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import {
  Cell,
  Column,
  HeaderGroup, IdType,
  Row,
  useGlobalFilter, usePagination, useSortBy,
  useTable,
} from "react-table";
import { FileData } from "../../sites/files/Files";
import Button from "../form/Button";
import OpenInNewTabIcon from "../icons/OpenInNewTabIcon";
import DownloadIcon from "../icons/DownloadIcon";
import DeleteForeverIcon from "../icons/DeleteForeverIcon";
import FormatCsvIcon from "../icons/FormatCsvIcon";
import FormatPngIcon from "../icons/FormatPngIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import SelectField from "../form/SelectField";
import SearchIcon from "../icons/SearchIcon";
import useWindowSize from "../hooks/UseWindowSize";

interface TableProps<T extends FileData> {
  columns: Column<T>[];
  data: T[];
}

const DEFAULT_PAGE_SIZE = 8;

export function Table<T extends FileData>({ columns, data }: TableProps<T>): ReactElement {

  const [width, height] = useWindowSize();
  const thRefs: RefObject<HTMLTableHeaderCellElement>[] = [];
  const tdRefs: RefObject<HTMLTableHeaderCellElement>[] = [];
  const tBody = useRef<HTMLTableSectionElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [trigger, setTrigger] = useState(false);

  const globalFilterFunction = useCallback(
    (rows: Row<T>[], ids: IdType<T>[], query: string) => {
      return rows.filter(
        (row) =>
          row.values["fileName"].includes(query) ||
          row.values["fileDateCreated"].includes(query)
      );
    },
    []
  );

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<T>(
    {
      columns,
      data,
      globalFilter: globalFilterFunction
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    setPageSize(DEFAULT_PAGE_SIZE)
  }, [setPageSize]);

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setGlobalFilter(value);
  };

  const pageSizeOptions = [
    { value: '2', label: '2', disabled: false },
    { value: '4', label: '4', disabled: false },
    { value: '6', label: '6', disabled: false },
    { value: '8', label: '8', disabled: false },
  ]

  useEffect(() => {
    if (wrapper.current && tBody.current && thRefs.length > 0 && tdRefs.length > 0) {
      const firstHeaderRowWidthFirstItem = window.getComputedStyle(thRefs[0].current as Element).getPropertyValue('width');
      const wrapperHeight = window.getComputedStyle(wrapper.current).getPropertyValue("height")
      tBody.current.style.height = wrapperHeight;
      tdRefs.map((tdRef, index) => { return (index % 3 === 0 && tdRef.current) ? tdRef.current.style.width = firstHeaderRowWidthFirstItem : false})

    }
  }, [width, height, trigger, wrapper, tBody, thRefs, tdRefs])



  return (
    <>
      <div className={"flex items center mt-[1.375rem] mb-[1.625rem]"}>
        <div className={"relative"}>
          <input placeholder="Suche..." className="focus:ring-transparent focus:ring-1  focus:ring-grayscale-dark focus:border-2 focus:border-grayscale-light outline-none ring-1 ring-grayscale-dark bg-transparent border-2 border-grayscale-light rounded-lg h-10-1/8  text-left text-base text-grayscale-darkest font-normal leading-7-1/8" onChange={handleFilterInputChange} type="text" />
          <SearchIcon className={"absolute right-[18px] top-1/2 transform -translate-y-3 w-6 h-6"} />
        </div>
      </div>

      <div className="max-h-[calc(100%-18rem)]"
        ref={wrapper}
      >
        <table {...getTableProps()}
          className={"w-full text-left table table-fixed w-[100%]"}>
          <thead className={"text-secondary border-b border-b-grayscale text-sm table table-fixed w-[100%]"}  >
            {headerGroups.map((headerGroup: HeaderGroup<T>) => (
              <tr
                key={headerGroup.getHeaderGroupProps().key}
                role={headerGroup.getHeaderGroupProps().role}
                className={headerGroup.getHeaderGroupProps().className + ` table table-fixed w-[100%]`}
              >
                {headerGroup.headers.map((column: HeaderGroup<T>, index) => {

                  const newRef = createRef<HTMLTableHeaderCellElement>();
                  thRefs.push(newRef);

                  return (
                    <th
                      ref={newRef}
                      {...headerGroup.getHeaderGroupProps(column.getSortByToggleProps())}
                      key={column.getHeaderProps().key}
                      role={column.getHeaderProps().role}
                      className={`${column.getHeaderProps().className} ${index > 0 && 'w-32'} pb-3 first:pl-15 cursor-pointer`}
                      style={{ ...column.getHeaderProps().style }}
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
          <tbody {...getTableBodyProps()}
            ref={tBody}
            className="block overflow-y-scroll overflow-x-hidden"
          >
            {page.map((row: Row<T>) => {
              prepareRow(row);
              return (
                <tr
                  key={row.getRowProps().key}
                  role={row.getRowProps().role}
                  className={`${row.getRowProps().className} border-b border-b-grayscale h-13 table table-fixed w-[100%] `}
                  style={row.getRowProps().style
                  }
                >
                  {row.cells.map((cell: Cell<T>) => {
                    const newRef = createRef<HTMLTableHeaderCellElement>();
                    tdRefs.push(newRef);


                    return <td
                      ref={newRef}
                      key={cell.getCellProps().key}
                      role={cell.getCellProps().role}
                      className={`${cell.getCellProps().className} border-b border-b-grayscale h-13 first:pl-7 first:pr-5 not:first:w-33 whitespace-nowrap`}
                      style={cell.getCellProps().style}
                    >
                      {cell.column.id === 'fileName' && row.original.fileType === 'csv' && <FormatCsvIcon className={"float-left align-baseline w-4 h-5 mr-4 mt-0.5"} />}
                      {cell.column.id === 'fileName' && row.original.fileType === 'png' && <FormatPngIcon className={"float-left align-baseline w-4 h-5 mr-4 mt-0.5"} />}

                      {cell.render("Cell")}
                      {cell.column.id === 'fileSize' && row.original.fileSizeUnit}
                    </td>;
                  })}
                  <td className={"flex justify-between items-center h-13 first:pl-7 last:pr-7 w-33"}>
                    <Button variant={"icon"}><DownloadIcon className="w-4 h-4" /></Button>
                    <Button variant={"icon"}><OpenInNewTabIcon className="w-4 h-4" /></Button>
                    <Button variant={"icon"}><DeleteForeverIcon className="w-4 h-4" /></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="w-full flex justify-end mt-8">
        <div className={"flex items-center text-sm"}>
          <label htmlFor="selectIntervall" className={"mr-3"}>Intervall:</label>
          <SelectField id="selectIntervall" variant="small" defaultValue={{ value: '8', label: '8', disabled: false }} options={pageSizeOptions} onChange={(value: string) => {
            setPageSize(value === '' ? DEFAULT_PAGE_SIZE : Number(value))
            setTrigger((prevValue) => !prevValue)
          }}></SelectField>
          <span className={"ml-8 mr-8"}>
            {pageIndex + 1} {' - '} {pageIndex * pageSize + page.length} von {data.length} {' '}
          </span>
          <Button variant="icon" onClick={() => {
            previousPage();
            setTrigger((prevValue) => !prevValue)
          }} disabled={!canPreviousPage}>
            {<ChevronLeftIcon className={"h-4 w-4"} />}
          </Button>
          <Button variant="icon" onClick={() => {
            nextPage();
            setTrigger((prevValue) => !prevValue)
          }} disabled={!canNextPage}>
            {<ChevronRightIcon className={"h-4 w-4"} />}
          </Button>
        </div>
      </div>
    </>
  );
}
