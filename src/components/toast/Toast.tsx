import React, {ReactElement, useContext, useEffect} from "react";
import {ToastContext, ToastInterface, ToastType} from "../../context/ToastContext";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import WarningIcon from "../icons/WarningIcon";
import ErrorIcon from "../icons/ErrorIcon";
import CloseIcon from "../icons/CloseIcon";

interface ToastProps {
  toast: ToastInterface;
}

function Toast({toast}: ToastProps): ReactElement {
  const styles = {
    toast: 'h-15 relative px-6 bg-grayscale-light w-[23.625rem] mb-4 rounded-lg shadow-lg flex items-center before:absolute before:left-0 before:bottom-0 before:top-0 before:w-2 before:rounded-l-lg',
    toastSuccess: 'before:bg-success',
    toastWarning: 'before:bg-warning',
    toastError: 'before:bg-danger',
    toastHeadline: 'text-base text-grayscale-darker font-medium',
    toastSubline: 'text-sm text-grayscale-dark',
    toastIcon: 'h-6 w-6 mx-4',
    toastCloseIcon: 'h-4 w-4',
  }

  const toastClass = (toastType: ToastType) => {
    switch (toastType) {
      case "success":
        return styles.toastSuccess;
      case "warning":
        return styles.toastWarning;
      case "error":
        return styles.toastError;
    }
  }

  const {id, type, message, headline} = toast;
  const {toasts, setToasts} = useContext(ToastContext);

  useEffect(() => {
    const timer = setTimeout(() => setToasts(toasts.filter(t => t.id != id)), 3000);
    return () => clearTimeout(timer)
  });

  return (
    <div className={`${styles.toast} ${toastClass(type)}`}>
      {type === 'success' && <CheckCircleIcon className={styles.toastIcon}/>}
      {type === 'warning' &&  <WarningIcon className={styles.toastIcon}/>}
      {type === 'error' && <ErrorIcon className={styles.toastIcon}/>}
      <div className={"flex-1"}>
        <p className={styles.toastHeadline}>{headline}</p>
        <span className={styles.toastSubline}>{message}</span>
      </div>
      <button onClick={() => setToasts(toasts.filter(t => t.id != id))}>
        <CloseIcon className={styles.toastCloseIcon}/>
      </button>
    </div>
  )
}

export default Toast