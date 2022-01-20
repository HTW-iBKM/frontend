import React, { ReactElement, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Table } from "../../components/table/Table";
import { Column } from "react-table";
import { getFormattedDate } from "../../utils/utility";

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



  const Data = (): FileData[] => [
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "Graph.png",
      fileSize: 60,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date()),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "september_18.csv",
      fileSize: 20,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date()),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "september_20.csv",
      fileSize: 20,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date()),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "september_22.csv",
      fileSize: 20,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date()),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "PNG-Graph-Prediction.png",
      fileSize: 580,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date('2019-07-13')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "CSV-Graph-Prediction.csv",
      fileSize: 20,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date()),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "CSV-Graph-GroundTruth.csv",
      fileSize: 20,
      fileSizeUnit: "KB",
      fileDateCreated: getFormattedDate(new Date()),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "PNG-Graph-GroundTruth.png",
      fileSize: 2,
      fileSizeUnit: "MB",
      fileDateCreated: getFormattedDate(new Date('2021-07-20')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "csv",
      fileName: "CSV-Existiert-nicht.csv",
      fileSize: 128,
      fileSizeUnit: "GB",
      fileDateCreated: getFormattedDate(new Date('2021-08-12')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "Graph-Existiert-nicht.png",
      fileSize: 12,
      fileSizeUnit: "MB",
      fileDateCreated: getFormattedDate(new Date('2022-01-01')),
      fileUrl: "test",
    },
    {
      id: uuidv4(),
      fileType: "png",
      fileName: "Graph.png",
      fileSize: 12,
      fileSizeUnit: "MB",
      fileDateCreated: getFormattedDate(new Date('2022-01-01')),
      fileUrl: "test",
    },
  ];

  const [data, setData] = useState(Data)

  return <div className={styles.container}>
    <div className={styles.card + 'w-full'}>
      <h5 className="text-h5">Dateien</h5>
      <Table data={data} changeData={setData} columns={columns}></Table>
    </div>
  </div>;
}

export default Files;
