import React, { ReactElement } from 'react';
import Graph from './Graph';

function Home(): ReactElement {
  const styles = {
    container: 'w-[calc(100%-3rem)] h-[calc(100%-3rem)] m-6 flex gap-6 ',
    card: 'shadow-card h-full bg-grayscale-light rounded-[8px] '
  };
  const widgets = [1, 2, 3];
  return <div className={styles.container}>
    {widgets.length > 1 ? (
        <>
          <span className={styles.card + 'w-2/3'}>
            <Graph/>
          </span>
          <div className="w-1/3 h-full flex flex-col gap-6">
            <span className={styles.card}>
              <Graph/>
            </span>
            {widgets[2] && <span className={styles.card}>
              <Graph/>
            </span>}
          </div>
        </>
    ) : (
        <span className={styles.card + 'w-full'}>
          <Graph/>
        </span>
    )}
  </div>;
}

export default Home;
