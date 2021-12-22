import React from "react";

export type ToastType = "success" | "error" | "warning";

export interface ToastInterface {
  id: string;
  type: ToastType;
  headline: string
  message: string;
}

export interface ToastContextInterface {
  toasts: ToastInterface[] | [];
  setToasts: React.Dispatch<React.SetStateAction<ToastInterface[]>>;
}


export const ToastContext = React.createContext<ToastContextInterface>({} as ToastContextInterface);
