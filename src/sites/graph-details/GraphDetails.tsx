import React, { ReactElement, useEffect, useState } from 'react';
import Graph, { GraphData } from '../../components/graph/Graph';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';

export interface GraphDetailsProps {
  group: string,
  header: string,
  data: GraphData[]
}

function GraphDetails(): ReactElement {
  const styles = {
    container: 'w-full h-full p-6',
    header: 'w-full flex mb-6',
    card: 'shadow-card h-[calc(100%-3rem)] bg-grayscale-light rounded-[8px] flex',
    backButton: 'tracking-[1.25px] uppercase text-[#4074B2] font-medium flex items-center'
  };

  const [data, setData] = useState<GraphDetailsProps>({} as GraphDetailsProps)

  useEffect(() => {
    const dataString = localStorage.getItem("graphData")
    if (dataString) {setData(JSON.parse(dataString))}
    else setData({} as GraphDetailsProps)
  }, [])
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <a className={styles.backButton} href="#/dashboard">
          <ChevronLeftIcon className="h-4 w-4"/>
          <span>zurück zum Dashboard</span>
        </a>
        <h6 className="absolute left-1/2 text-h6">{data.group}</h6> {/* TODO add real title */}
      </div>
      <div className={styles.card}>
        <Graph data={data.data} header={data.header} group=""/>
      </div>
    </div>
  )
}

export default GraphDetails;
