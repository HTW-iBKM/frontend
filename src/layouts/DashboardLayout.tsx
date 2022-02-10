import React, { ReactElement } from 'react';
import BilanzkreisSelection from '../components/modal/BilanzkreisSelection';
import Modal from '../components/modal/Modal';
import ToastContainer from "../components/toast/ToastContainer";
import { useStore } from '../store/Store';

interface LayoutProps {
  top: ReactElement;
  left: ReactElement;
  center: ReactElement;
}

function DashboardLayout(props: LayoutProps): ReactElement {
  const styles = {
    layoutContainer: 'h-full w-full flex flex-col overflow-none',
    headerContainer: 'h-14 shadow-lg min-h-14 bg-primary text-grayscale-light px-4 sticky top-0 z-40',
    mainContainer: 'flex-1 flex gap-4 overflow-hidden relative',
    sidebarContainer: 'bg-grayscale-light shadow-lg flex flex-col justify-between',
    contentContainer: 'flex-1 overflow-y-scroll relative'
  }
  const [isSelectionOpen, setIsSelectionOpen] = useStore(state => [state.selectionModalOpen, state.setSelectionModalOpen]);


  return (
    <div className={styles.layoutContainer}>
      <header className={styles.headerContainer}>
        {props.top}
      </header>
      <main className={styles.mainContainer}>
        <ToastContainer></ToastContainer>
        <Modal isOpen={isSelectionOpen} title={"Bilanzkreise auswählen"}
            onClose={() => setIsSelectionOpen(false)}>
            <BilanzkreisSelection setModalOpen={setIsSelectionOpen}></BilanzkreisSelection>
        </Modal>
        <div className={styles.sidebarContainer}>{props.left}</div>
        <div className={styles.contentContainer}>{props.center}</div>
      </main>
    </div>
  )
}

export default DashboardLayout;
