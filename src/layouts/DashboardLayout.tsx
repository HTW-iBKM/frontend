import React, {ReactElement} from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Center from '../components/dashboard/Center';
import Navbar from '../components/dashboard/Navbar';

function DashboardLayout(): ReactElement {
  const styles = {
    layoutContainer: 'h-full w-full flex flex-col',
    headerContainer: 'h-14 shadow-lg min-h-[3.375rem] bg-primary text-grayscale-light flex items-center justify-between px-4',
    mainContainer: 'flex-1 flex',
    sidebarContainer: 'bg-grayscale-light shadow-lg flex flex-col justify-between',
    contentContainer: 'flex-1'
  }
  return (
    <div className={styles.layoutContainer}>
      <header className={styles.headerContainer}>
        <Navbar/>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.sidebarContainer}><Sidebar/></div>
        <div className={styles.contentContainer}><Center/></div>
      </main>
    </div>
  )
}

export default DashboardLayout;
