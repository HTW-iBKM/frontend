import React, {
  createRef,
  ReactElement,
  RefObject,
  useCallback,
  useContext,
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
import Modal, { commonModalStyles } from "../modal/Modal";
import { parse } from "csv-parse/dist/esm/index";
import FileSaver from "file-saver";
import { ToastContext } from "../../context/ToastContext";
import { v4 as uuidv4 } from 'uuid';
import { GraphDetailsProps } from "../../sites/graph-details/GraphDetails";
import axios from "axios";

interface TableProps<T extends FileData> {
  columns: Column<T>[];
  data: T[];
  changeData: React.Dispatch<React.SetStateAction<FileData[]>>;
}

const DEFAULT_PAGE_SIZE = 8;

export function Table<T extends FileData>({ columns, data, changeData }: TableProps<T>): ReactElement {
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
      const firstHeaderRowHeightFirstItem = window.getComputedStyle(thRefs[0].current as Element).getPropertyValue('height');
      const wrapperHeight = window.getComputedStyle(wrapper.current).getPropertyValue("height");
      tBody.current.style.height = `${parseInt(wrapperHeight) - parseInt(firstHeaderRowHeightFirstItem)}px`;
      tdRefs.map((tdRef, index) => { return (index % 3 === 0 && tdRef.current) ? tdRef.current.style.width = firstHeaderRowWidthFirstItem : false })
    }
  }, [width, height, trigger, wrapper, tBody, thRefs, tdRefs])

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [fileInAction, setFileInAction] = useState<string>("")
  /**
   * Opens a modal and sets the fileID for the file which will get deleted.
   * @param fileId - string
   */
  const prepareFileRemoval = (fileId: string) => {
    setIsDeleteModalOpen(true);
    setFileInAction(fileId);
  }

  const searchInput = useRef<any>(null)
  /**
   *  Filters the current data array, removes the file with the given id and sents new data to parent component.
   *  (Should return the file, which gets deleted from our database.)
   */
  const removeFile = () => {
    const newData = data.filter(file => file.id !== fileInAction);
    changeData(newData);
    setIsDeleteModalOpen(false);
    toastContext.setToasts([...toastContext.toasts, {
      id: uuidv4(),
      type: "success",
      headline: "Löschvorgang erfolgreich!",
      message: "Die Datei wurde entfernt."
    }])

    // TODO: Error toast, when something went wrong, but at the moment we don't have this case.
    // toastContext.setToasts([...toastContext.toasts, {
    //   id: uuidv4(),
    //   type: "error",
    //   headline: "Löschvorgang ist schief gelaufen!",
    //   message: "Die Datei konnte nicht entfernt werden."
    // }])

    // TODO: Nachdem man auf Löschen klickt und das Modal schliesst, ist der Delete-Button des nächsten Tabelleneintrags fokussiert ...
    // Hier sollte nach dem Modal schliessen das Suchfeld fokussiert werden, aber es funktioniert nicht ...
    // searchInput.current.focus();
  };

  const toastContext = useContext(ToastContext);
  /**
   * Opens either PNG or CSV files.
   * PNG - PNG opens in new tab
   * CSV - CSV is loaded into the graph details component in a new tab
   * @param format - string: "png" or "csv"
   * @param fileName - string
   */
  const openInNewTab = async (format: string, fileName: string) => {
    switch (format) {
      case "csv": {
        fetch(`./files/${fileName}`)
          .then(response => response.text())
          .then(responseText => {
            parse(responseText, { delimiter: ',', columns: true }, function (err, data) {
              if (!err) {
                const graphDetails: GraphDetailsProps = {
                  group: "",
                  header: fileName,
                  data: data
                }
                localStorage.removeItem("graphData");
                localStorage.setItem("graphData", JSON.stringify(graphDetails));
                const newWindow = window.open('#/graph-details', '_blank', 'noopener,noreferrer');
                if (newWindow) newWindow.opener = null;
              } else {
                console.error(err);
                toastContext.setToasts([...toastContext.toasts, {
                  id: uuidv4(),
                  type: "error",
                  headline: "Etwas ist schief gelaufen ...",
                  message: "Die Datei existiert nicht."
                }])
              }
            });
          })
        break;
      }
      case "png": {
        axios.get(`/files/${fileName}`).then((response) => {
          if (response.status === 200) {
            const newWindow = window.open(`/files/${fileName}`, '_blank', 'noopener,noreferrer');
            if (newWindow) newWindow.opener = null;
          }
        }).catch((error) => {
          console.error(error);
          toastContext.setToasts([...toastContext.toasts, {
            id: uuidv4(),
            type: "error",
            headline: "Etwas ist schief gelaufen ...",
            message: `${error}`
          }])
        })
        break;
      }
      default:
        break;
    }
  }

  /**
   * Downloads the chosen file to the users file system.
   * @param format - string: "csv" or "png"
   * @param fileName - string
   */
  const downloadToFileSystem = (format: string, fileName: string) => {
    switch (format) {
      case "csv": {
        axios.get(`/files/${fileName}`).then((response) => {
          if (response.status === 200) {
            const blob = new Blob([response.data], { type: "text/csv;charset=utf-8" });
            FileSaver.saveAs(blob, `${fileName}`);
          }
        }).catch((error) => {
          console.error(error);
          toastContext.setToasts([...toastContext.toasts, {
            id: uuidv4(),
            type: "error",
            headline: "Etwas ist schief gelaufen ...",
            message: `${error}`
          }])
        })
        break;
      }
      case "png": {
        axios.get(`/files/${fileName}`).then((response) => {
          if (response.status === 200) {
            FileSaver.saveAs(`./files/${fileName}`, `${fileName}`);
          }
        }).catch((error) => {
          console.error(error);
          toastContext.setToasts([...toastContext.toasts, {
            id: uuidv4(),
            type: "error",
            headline: "Etwas ist schief gelaufen ...",
            message: `${error}`
          }])
        })
        break;
      }
      default:
        break;
    }
  }

  return (
    <>
      <div className={"flex items center mt-[1.375rem] mb-[1.625rem]"}>
        <div className={"relative"}>
          <input ref={searchInput} placeholder="Suche..." className="focus:ring-transparent focus:ring-1  focus:ring-grayscale-dark focus:border-2 focus:border-grayscale-light outline-none ring-1 ring-grayscale-dark bg-transparent border-2 border-grayscale-light rounded-lg h-10-1/8  text-left text-base text-grayscale-darkest font-normal leading-7-1/8" onChange={handleFilterInputChange} type="text" />
          <SearchIcon className={"absolute right-[18px] top-1/2 transform -translate-y-3 w-6 h-6"} />
        </div>
      </div>

      <div className="max-h-[calc(100%-11.5rem)] h-[100%]" ref={wrapper}>
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
            className="block overflow-y-auto overflow-x-hidden"
          >
            {page.map((row: Row<T>) => {
              prepareRow(row);
              return (
                <tr
                  key={row.getRowProps().key}
                  role={row.getRowProps().role}
                  className={`${row.getRowProps().className} border-b border-b-grayscale h-13 text-sm table table-fixed w-[100%] `}
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
                      className={`${cell.getCellProps().className} overflow-hidden overflow-ellipsis border-b border-b-grayscale h-13 first:pl-7 first:pr-5 not:first:w-33 whitespace-nowrap`}
                      style={cell.getCellProps().style}
                    >
                      {cell.column.id === 'fileName' && row.original.fileType === 'csv' && <FormatCsvIcon className={"float-left align-baseline w-4 h-5 mr-4 mt-0.5"} />}
                      {cell.column.id === 'fileName' && row.original.fileType === 'png' && <FormatPngIcon className={"float-left align-baseline w-4 h-5 mr-4 mt-0.5"} />}

                      {cell.render("Cell")}
                      {cell.column.id === 'fileSize' && row.original.fileSizeUnit}
                    </td>;
                  })}
                  <td className={"flex justify-between items-center h-13 first:pl-7 last:pr-7 w-33"}>
                    <Button variant={"icon"} onClick={() => openInNewTab(row.original.fileType, row.original.fileName)}><OpenInNewTabIcon className="w-4 h-4" /></Button>
                    <Button variant={"icon"} onClick={() => downloadToFileSystem(row.original.fileType, row.original.fileName)}><DownloadIcon className="w-4 h-4" /></Button>
                    <Button variant={"icon"} onClick={() => prepareFileRemoval(row.original.id)}><DeleteForeverIcon className="w-4 h-4" /></Button>
                  </td >
                </tr >
              );
            })}
          </tbody >
        </table >
      </div >

      <div className="w-full flex justify-end mt-8">
        <div className={"flex items-center text-sm"}>
          <label htmlFor="selectIntervall" className={"mr-3"}>Einträge pro Seite:</label>
          <SelectField id="selectIntervall" variant="small" value={{ value: '8', label: '8', disabled: false }} options={pageSizeOptions} onChange={(value: string) => {
            setPageSize(value === '' ? DEFAULT_PAGE_SIZE : Number(value))
            setTrigger((prevValue) => !prevValue)
          }}></SelectField>
          <span className={"ml-8 mr-8"}>
            {(pageIndex === 0) && 1}
            {(pageIndex !== 0) && (pageIndex * pageSize) + 1}
            {' - '}
            {pageIndex * pageSize + page.length} von {data.length} {' '}
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
        </div >
      </div >

      <Modal isOpen={isDeleteModalOpen} title={"Datei löschen?"} onClose={() => setIsDeleteModalOpen(false)}>
        <p>Sind Sie sich sicher, dass Sie diese Datei löschen möchten? Der Vorgang kann nicht rückgängig gemacht werden.</p>
        <div className={`${commonModalStyles.buttonGroup}`}>
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Abbrechen</Button>
          <Button variant="danger" onClick={() => removeFile()}>Löschen</Button>
        </div>
      </Modal>
    </>
  );
}
