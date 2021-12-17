import React, { ReactElement } from 'react';
import Graph from '../../components/graph/Graph';
import ChevronLeftIcon from '../../components/icons/ChevronLeftIcon';

function GraphDetails(): ReactElement {
  const styles = {
    container: 'w-full h-full px-[24px] py-[28px]',
    header: 'w-full flex',
    card: 'shadow-card h-[calc(100%-56px)] bg-grayscale-light rounded-[8px] ',
    backButton: 'tracking-[1.25px] uppercase text-[#4074B2] font-medium flex items-center'
  };
  return <div className={styles.container}>
    <div className={styles.header}>
      <a className={styles.backButton} href="#/dashboard">
        <ChevronLeftIcon className="h-5 w-5 "/>
        <span>zurück zum Dashboard</span>
      </a>
      <h6 className="absolute left-1/2">Bilanzkreis A</h6> {/* TODO add real title */}
    </div>
    <div className={styles.card}>
      <Graph/>
    </div>
  </div>;
}

export default GraphDetails;
