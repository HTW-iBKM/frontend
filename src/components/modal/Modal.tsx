import React, { Fragment } from "react";
import Button from "../form/button/Button";
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Dialog, Transition } from '@headlessui/react'
import "./Modal.css";

type ModalProps = {
    headline: string,
    children?: React.ReactNode,
    primaryButtonLabel?: string,
    hasCancelButton?: boolean,
    primaryButtonCallback?: () => void,
}

export default NiceModal.create(({headline, children, primaryButtonLabel, hasCancelButton = false, primaryButtonCallback}: ModalProps) => {
    const styles = {
        backgroundDrop: "fixed inset-0 z-10 overflow-y-auto bg-grayscale-darkest bg-opacity-70",
        overlay: "fixed inset-0",
        card: "bg-grayscale-white rounded-lg p-[55px] inline-block w-full max-w-[480px] overflow-hidden text-left align-middle transition-all transform",
        headline: "text-h4 mb-8",
        buttonGroup: "mt-8 flex justify-between",
    }
    // Use a hook to manage the modal state
    const modal = useModal();
    return (
        <Transition appear show={modal.visible} as={Fragment}>
            <Dialog
            as="div"
            className={`modal-dialog ${styles.backgroundDrop}`}
            onClose={() => modal.hide()}
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
                    {children}
                    <div className={`${styles.buttonGroup}`}>
                        {
                            hasCancelButton && 
                                <Button variant={"secondary"} onClick={() => modal.hide()}>Abbrechen</Button>
                        }
                        {
                            primaryButtonLabel && 
                                <Button variant={"primary"} onClick={() => primaryButtonCallback}>{primaryButtonLabel}</Button>
                        }
                    </div>
                </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    );
  });