import React, {ReactElement} from 'react';

interface LayoutProps {
  top: ReactElement;
  left: ReactElement;
  center: ReactElement;
}
function Layout(props: LayoutProps): ReactElement {
  const styles = {
    layoutContainer: 'h-full w-full flex flex-col',
    headerContainer: 'h-20 shadow-lg min-h-[4rem] bg-primary text-grayscale-light flex items-center justify-between px-4',
    mainContainer: 'flex-1 flex gap-4',
    sidebarContainer: 'bg-grayscale-light shadow-lg flex flex-col justify-between',
    contentContainer: 'flex-1'
  }
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.headerContainer}>
        {props.top}
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.sidebarContainer}>{props.left}</div>
        <div className={styles.contentContainer}>{props.center}</div>
      </main>
    </div>
  )
}

export default Layout;
