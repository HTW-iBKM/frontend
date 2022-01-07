import React, { ReactElement } from 'react';

function Files(): ReactElement {
  const styles = {
    container: 'w-[calc(100%-3rem)] h-[calc(100%-3rem)] m-6 flex gap-6 ',
    card: 'shadow-card h-full bg-grayscale-light rounded-[8px] '
  };
  return <div className={styles.container}>
      <div className={styles.card + 'w-full'}>
        Hier kommt die File Komponente hin
      </div>
  </div>;
}

export default Files;
