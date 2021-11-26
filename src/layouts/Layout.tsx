import React, {ReactElement} from 'react';

interface LayoutProps {
  top: ReactElement;
  left: ReactElement;
  center: ReactElement;
}
function Layout(props: LayoutProps): ReactElement {
  const styles = {
    headerContainer: 'h-full w-full flex flex-col',
    navbarContainer: 'h-20 min-h-[5rem] bg-primary-dark rounded-b shadow-lg text-grayscale-light flex items-center justify-between px-4',
    sidebarContainer: 'bg-grayscale-light shadow-lg flex flex-col justify-between',
    contentContainer: 'flex-1'
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.navbarContainer}>
        {props.top}
      </div>
      <div className="flex-1 flex gap-4">
        <div className={styles.sidebarContainer}>{props.left}</div>
        <div className={styles.contentContainer}>{props.center}</div>
      </div>
    </div>
  )
}

export default Layout;
