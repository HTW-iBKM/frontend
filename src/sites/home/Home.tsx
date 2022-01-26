import React, { ReactElement, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { explainableAIData } from '../../api/mockdataTransformer';
import Graph, { GraphData } from '../../components/graph/Graph';
import { TableWidget } from "../../components/widgets/table/TableWidget";
import { Column } from "react-table";
import { FileData } from "../files/Files";
import { TableMockData } from "../../utils/TableMockData";

function Home(): ReactElement {
  const styles = {
    container: 'w-full h-full p-6 flex gap-6 ',
    card: 'shadow-card h-full bg-grayscale-light rounded-[8px] '
  };

  const [exampleFiles, setExampleFiles] = useState(TableMockData());
  const [exampleData, setExampleData] = useState<GraphData[]>([])
  const exampleHeader = "Bilanzkreis A Graph"
  const exampleGroup = "Bilanzkreis A"

  useAsyncEffect(async (isMounted) => {
    // const { data }: GraphDataResponse = await axios.get(
    //   "https://6ys8ajad27.execute-api.us-east-1.amazonaws.com/"
    // );

    const aiData: GraphData[] = await explainableAIData();

    if (!isMounted) return;
    setExampleData(aiData);
  }, []);

  const widgets = [1, 2];

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
          <Graph data={exampleData} header={exampleHeader} group={exampleGroup} />
        </div>
        <div className="w-1/3 h-full flex flex-col gap-6">
          <div className={styles.card}>
            <TableWidget columns={columns} data={exampleFiles} changeData={setExampleFiles} variant={widgets[2] ? "short" : "long"} />
          </div>
          {widgets[2] && <div className={styles.card}>
            <TableWidget columns={columns} data={exampleFiles} changeData={setExampleFiles} variant={"short"} />
          </div>}
        </div>
      </>
    ) : (
      <div className={styles.card + 'w-full'}>
        <Graph data={exampleData} header={exampleHeader} group={exampleGroup} />
      </div>
    )}
  </div>;
}

export default Home;
