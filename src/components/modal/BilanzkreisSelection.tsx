import React, {ReactElement, useContext, useState} from "react";
import {ToastContext} from "../../context/ToastContext";
import {useInput} from "../../hooks/useInput";
import {RadioButtonGroupInterface, useRadioButtonGroup} from "../../hooks/useRadioButtonGroup";
import Button from "../form/Button";
import RadioButtonGroup from "../form/RadioButtonGroup";
import TextField from "../form/TextField";
import {commonModalStyles} from "./Modal";
import {v4 as uuidv4} from 'uuid';
import "./SaveFileModalTemplate.css";
import Checkbox from "../form/Checkbox";

interface BilanzSelectionProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedBilanz: (name: string) => void;
}

const BilanzSelection = ({setSelectedBilanz, setModalOpen}: BilanzSelectionProps): ReactElement => {
    const toastContext = useContext(ToastContext);

    const styles = {
        formElementGroup: "flex flex-col mb-8 relative"
    }

    const defaultRadioButtonGroupValue: RadioButtonGroupInterface = {
        options: ["CSV", "PNG", "PDF"],
        disabledOptions: ["PDF"],
        selected: "CSV",
    }

    const {value: fileName, bind: bindFileName, reset: resetFileName} = useInput("");
    const {
        radioButtonGroup: radioButtonGroup,
        bind: bindRadioButtonGroup,
        reset: resetRadioButtonGroup
    } = useRadioButtonGroup(defaultRadioButtonGroupValue);

    const [formTouched, setFormTouched] = useState({
        name: false,
        format: false,
    })

    const formErr: { name: string | null, format: string | null } = {
        name: !fileName ? "Der Titel muss mindestens einem Buchstaben haben." : null,
        format: !radioButtonGroup.selected ? 'Wählen sie ein Dateiformat.' : null,
    }

    const validForm = () => !formErr['name'] && !formErr['format'];


    // const handleSubmit = (evt: React.FormEvent) => {
    //     evt.preventDefault();
    //     if (validForm()) {
    //         if (radioButtonGroup.selected) {
    //             try {
    //                 const checked = keyData.filter((checked) => {
    //                     return checked.checked;
    //                 })
    //                 const checkedTimeSeries = checked.map((obj) => {
    //                     return obj.key as string;
    //                 })
    //
    //                 onSaveFile(fileName, radioButtonGroup.selected, activeGraph, checkedTimeSeries);
    //
    //                 resetFileName();
    //                 resetRadioButtonGroup();
    //                 toastContext.setToasts([...toastContext.toasts, {
    //                     id: uuidv4(),
    //                     type: "success",
    //                     headline: "Glückwunsch",
    //                     message: "Die Datei wurde erfolgreich erstellt"
    //                 }])
    //                 setModalOpen(false);
    //             } catch {
    //                 toastContext.setToasts([...toastContext.toasts, {
    //                     id: uuidv4(),
    //                     type: "error",
    //                     headline: "Fehler",
    //                     message: "Die Datei konnte nicht erstellt werden"
    //                 }])
    //             }
    //         }
    //     }
    //
    //     // Toast erscheint, wenn nach beim Submit etwas schief gelaufen ist. Formular fehler werden bereits im Formular abgefangen. Hier gehts eher um Fehler seitens der DB oder so
    //     // toastContext.setToasts([...toastContext.toasts, {id: uuidv4(), type: "error", headline: "Error", message: "Etwas ist schief gelaufen."}])
    // }

    return (
        <div>
            {/*<form name="saveFileForm" onSubmit={handleSubmit}>*/}
            <p>Wählen Sie alle Bilanzkreise aus, die für Sie relevant sind.</p>
            <p>Aus dieser Auswahl können Sie mithilfe des Schnellzugriffs in der Navigationsleiste den aktuellen
                Bilanzkreis festlegen.</p>
            <form name="bilanceSelection">
                <div className={`${styles.formElementGroup}`}>
                    <p>
                        <input className={`${formErr['name'] ? 'border-danger' : ''}`} type="checkbox"/>
                        <label>Bilanzkreis A</label>
                    </p>
                    <p>
                        <input className={`${formErr['name'] ? 'border-danger' : ''}`} type="checkbox"/>
                        <label>Bilanzkreis B</label>
                    </p>
                    <p>
                        <input className={`${formErr['name'] ? 'border-danger' : ''}`} type="checkbox"/>
                        <label>Bilanzkreis C</label>
                    </p>
                </div>
                <div className={`${commonModalStyles.buttonGroup}`}>
                    <Button variant={"secondary"} onClick={() => setModalOpen(false)}>Abbrechen</Button>
                    <Button disabled={!validForm()} type="submit" variant={"primary"}>Speichern</Button>
                </div>
            </form>
        </div>
    )
}


export default BilanzSelection;