import React, { ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Table} from "../../components/table/Table";
import {Column} from "react-table";
import {getFormattedDate} from "../../utils/utility";

export interface FileData {
  id: string;
  fileType: string;
  fileName: string;
  fileSize: number;
  fileSizeUnit: string;
  fileDateCreated: string;
  fileUrl: string;
}
function Files(): ReactElement {
  const styles = {
    container: 'w-[calc(100%-3rem)] h-[calc(100%-3rem)] m-6 flex gap-6 ',
    card: 'shadow-card p-7 h-full bg-grayscale-light rounded-[8px] '
  };

  const columns: Column<FileData>[] = [
    {
      Header: "Name",
      accessor: "fileName",
    },
    {
      Header: "Größe",
      accessor: "fileSize",
    },
    {
      Header: "Datum",
      accessor: "fileDateCreated",
    },
  ]

  const Data = () => [
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "PNG-Datei-#1.png",
      fileSize: 1,
      fileSizeUnit: "MB",
      fileDateCreated: getFormattedDate(new Date()),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "CSV-Datei-#1.csv",
      fileSize: 580,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date('2019-07-13')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "CSV-Datei-#2.csv",
      fileSize: 666,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date('2020-01-20')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "PNG-Datei-#2.png",
      fileSize: 580,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date('2019-07-13')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "PNG-Datei-#3.png",
      fileSize: 2,
      fileSizeUnit: "MB",
      fileDateCreated: getFormattedDate(new Date('2021-07-20')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "CSV-Datei-#3.csv",
      fileSize: 56,
      fileSizeUnit: "MB",
      fileDateCreated: getFormattedDate(new Date('2021-08-12')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "PNG-Datei-#4.png",
      fileSize: 1.5,
      fileSizeUnit: "MB",
      fileDateCreated: getFormattedDate(new Date('2021-02-01')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "CSV-Datei-#4-mit-längerem-titel.csv",
      fileSize: 128,
      fileSizeUnit: "GB",
      fileDateCreated: getFormattedDate(new Date('2021-08-12')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "PNG-Datei-#5-mit-längerem-titel.png",
      fileSize: 12,
      fileSizeUnit: "MB",
      fileDateCreated: getFormattedDate(new Date('2022-01-01')),
      fileUrl: "test",
    },
  ];

  return <div className={styles.container}>
      <div className={styles.card + 'w-full'}>
        <h5 className="text-h5 ">Dateien</h5>
        <Table data={Data()} columns={columns}></Table>
      </div>
  </div>;
}

export default Files;
