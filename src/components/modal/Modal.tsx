import React, { Fragment, ReactElement, useContext } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { ModalContext } from "../../context/ModalContext";
import "./Modal.css";

export const commonModalStyles = {
    buttonGroup: "mt-8 flex justify-between"
}

function Modal(): ReactElement {
    const {isOpen, setIsOpen, modalContent} = useContext(ModalContext);
    const {id, headline, content} = modalContent;

    const styles = {
        backgroundDrop: "fixed inset-0 z-50 overflow-y-auto bg-grayscale-darkest bg-opacity-70",
        overlay: "fixed inset-0",
        card: "bg-grayscale-white rounded-lg p-[55px] inline-block w-full max-w-[480px] overflow-hidden text-left align-middle transition-all transform",
        headline: "text-h4 mb-8",
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                id={id}
                className={`modal-dialog ${styles.backgroundDrop}`}
                onClose={setIsOpen}
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
                        {headline}
                    </Dialog.Title>
                    {content}
                </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    );
}

export default Modal;