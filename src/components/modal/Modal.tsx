import React, {Fragment, ReactElement} from "react";
import { Dialog, Transition } from '@headlessui/react'
import "./Modal.css";
import ReactDOM from "react-dom";

export const commonModalStyles = {
    buttonGroup: "mt-8 flex justify-between"
}

interface ModalProps extends React.HTMLProps<HTMLElement>{
    isOpen: boolean;
    title: string;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({isOpen, children, title, onClose}: ModalProps): ReactElement | null {
    const container: HTMLElement | null = document.getElementById('modalContainer')
    if(!isOpen || !container) return null;

    const styles = {
        backgroundDrop: "fixed inset-0 z-50 overflow-y-auto bg-grayscale-darkest bg-opacity-70",
        overlay: "fixed inset-0",
        card: "bg-grayscale-white rounded-lg p-[55px] inline-block w-full max-w-[480px] overflow-hidden text-left align-middle transition-all transform",
        headline: "text-h4 mb-8",
    }

    return ReactDOM.createPortal(
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className={`modal-dialog ${styles.backgroundDrop}`}
                onClose={onClose}
            >
            <div className="min-h-screen px-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                <Dialog.Overlay className={`${styles.overlay}`} />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                >
                &#8203;
                </span>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                <div className={`${styles.card}`}>
                    <Dialog.Title
                        as="h4"
                        className={`${styles.headline}`}
                    >
                        {title}
                    </Dialog.Title>
                    {children}
                </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    , container);
}

export default Modal;