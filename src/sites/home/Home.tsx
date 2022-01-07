import React, { ReactElement } from 'react';
import Graph from '../../components/graph/Graph';

function Home(): ReactElement {
  const styles = {
    container: 'w-[calc(100%-3rem)] h-[calc(100%-3rem)] m-6 flex gap-6 ',
    card: 'shadow-card h-full bg-grayscale-light rounded-[8px] '
  };
  const widgets = [1, 2];
  return <div className={styles.container}>
    {widgets.length > 1 ? (
      <>
        <div className={styles.card + 'w-2/3'}>
          <Graph />
        </div>
        <div className="w-1/3 h-full flex flex-col gap-6">
          <div className={styles.card}>
            <Graph />
          </div>
          {widgets[2] && <div className={styles.card}>
            <Graph />
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
