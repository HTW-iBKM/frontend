import React, {ReactElement, useContext} from "react";
import {ToastContext} from "../../context/ToastContext";
import Toast from "./Toast";

function ToastContainer(): ReactElement {
  const styles = {
    toastContainer: 'absolute right-0 top-4 z-50 px-4 overflow-y-hidden',
  }
  const context = useContext(ToastContext);

  return (
      <div className={styles.toastContainer}>
        {context.toasts.map((toast, index) => { return (
          <Toast key={index} toast={toast}/>
        )})}
      </div>
  )
}

export default ToastContainer