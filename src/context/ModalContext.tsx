import React, { ReactElement } from "react";


export interface ModalInterface {
    id: string,
    headline: string,
    content?: ReactElement,
}

export interface ModalContextInterface {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    modalContent: ModalInterface,
    setModalContent: React.Dispatch<React.SetStateAction<ModalInterface>>
}

export const ModalContext = React.createContext<ModalContextInterface>({} as ModalContextInterface);
