import React, { ReactElement, useState } from 'react';
import { Table } from "../../components/table/Table";
import { Column } from "react-table";
import {TableMockData} from "../../utils/TableMockData";

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

  const [data, setData] = useState(TableMockData)

  return <div className={styles.container}>
    <div className={styles.card + 'w-full'}>
      <h5 className="text-h5">Dateien</h5>
      <Table data={data} changeData={setData} columns={columns}></Table>
    </div>
  </div>;
}

export default Files;
