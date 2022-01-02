import React, {ReactElement, useState} from 'react';
import ToastContainer from "../components/toast/ToastContainer";
import {ToastInterface, ToastContext, ToastContextInterface} from "../context/ToastContext";
import { ModalContext, ModalContextInterface, ModalInterface } from '../context/ModalContext';
import Modal from '../components/modal/Modal';

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

  const [toasts, setToasts] = useState<ToastInterface[]>([]);
  const defaultToastContext: ToastContextInterface = {
    toasts,
    setToasts
  }

  const [modalIsOpen, setmodalIsOpen] = useState(false)
  const [modal, setModal] = useState<ModalInterface>({
    id: "",
    headline: ""
  });
  const defaultModalContext: ModalContextInterface = {
    isOpen: modalIsOpen,
    setIsOpen: setmodalIsOpen,
    modalContent: modal,
    setModalContent: setModal
  }
  
  return (
    <ModalContext.Provider value={defaultModalContext}>
      <ToastContext.Provider value={defaultToastContext}>
        <Modal></Modal>
        <div className={styles.layoutContainer}>
          <header className={styles.headerContainer}>
            {props.top}
          </header>
          <main className={styles.mainContainer}>
            <ToastContainer></ToastContainer>
            <div className={styles.sidebarContainer}>{props.left}</div>
            <div className={styles.contentContainer}>{props.center}</div>
          </main>
        </div>
      </ToastContext.Provider>
    </ModalContext.Provider>
  )
}

export default DashboardLayout;
