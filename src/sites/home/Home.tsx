import React, { ReactElement } from 'react';
import Graph from '../../components/graph/Graph';
import {TableWidget} from "../../components/widgets/table/TableWidget";
import {Column} from "react-table";
import {FileData} from "../files/Files";
import {TableMockData} from "../../utils/TableMockData";

function Home(): ReactElement {
  const styles = {
    container: 'w-full h-full p-6 flex gap-6 ',
    card: 'shadow-card h-full bg-grayscale-light rounded-[8px] '
  };
  const widgets = [1, 2, 3];

  const columns: Column<FileData>[] = [
    {
      Header: "Name",
      accessor: "fileName",
    },
  ]


  return <div className={styles.container}>
    {widgets.length > 1 ? (
      <>
        <div className={styles.card + 'w-2/3'}>
          <Graph />
        </div>
        <div className="w-1/3 h-full flex flex-col gap-6">
          <div className={styles.card}>
            <TableWidget columns={columns} data={TableMockData()} variant={widgets[2] ? "short" : "long"}/>
          </div>
          {widgets[2] && <div className={styles.card}>
              <TableWidget columns={columns} data={TableMockData()} variant={"short"}/>
          </div>}
        </div>
      </>
    ) : (
      <div className={styles.card + 'w-full'}>
        <Graph />
      </div>
    )}
  </div>;
}

export default Home;
