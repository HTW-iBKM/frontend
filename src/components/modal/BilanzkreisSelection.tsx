import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ToastContext } from "../../context/ToastContext";
import { useInput } from "../../hooks/useInput";
import { RadioButtonGroupInterface, useRadioButtonGroup } from "../../hooks/useRadioButtonGroup";
import Button from "../form/Button";
import RadioButtonGroup from "../form/RadioButtonGroup";
import TextField from "../form/TextField";
import { commonModalStyles } from "./Modal";
import { v4 as uuidv4 } from 'uuid';
import "./SaveFileModalTemplate.css";
import Checkbox from "../form/Checkbox";
import { useStore } from "../../App";

interface BilanzSelectionProps {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;


}

const BilanzSelection = ({ setModalOpen }: BilanzSelectionProps): ReactElement => {
    const [bilanzKreise, setBilanzkreise]: any = useStore(state => state.useBilanzKreise);
    const [checked, setChecked] = useState({
        option_1: bilanzKreise.length >= 0 ? bilanzKreise[0] : '',
        option_2: bilanzKreise.length >= 1 ? bilanzKreise[1] : '',
        option_3: bilanzKreise.length >= 2 ? bilanzKreise[2] : '',
    });

    // const values = {
    //     option_1: 'Bilanzkreis 1',
    //     option_2: 'Bilanzkreis 2',
    //     option_3: 'Bilanzkreis 3'
    // }


    useEffect(() => {
        console.log(bilanzKreise);
    }, [bilanzKreise])





    const toastContext = useContext(ToastContext);

    const styles = {
        formElementGroup: "flex flex-col mb-8 relative"
    }

    const defaultRadioButtonGroupValue: RadioButtonGroupInterface = {
        options: ["CSV", "PNG", "PDF"],
        disabledOptions: ["PDF"],
        selected: "CSV",
    }

    const { value: fileName, bind: bindFileName, reset: resetFileName } = useInput("");
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




    const validForm = () => {
        for (const key in checked) {
            if (checked[key as keyof typeof checked]) return true;
        }
        return false;
    };


    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();

        const arr: string[] = []
        for (const key in checked) {
            const value = checked[key as keyof typeof checked];
            if (value) {
                arr.push(value)
            }
        }


        setBilanzkreise(arr);
        setModalOpen(false);
    }

    return (
        <div>
            {/*<form name="saveFileForm" onSubmit={handleSubmit}>*/}
            <p>Wählen Sie alle Bilanzkreise aus, die für Sie relevant sind.</p>
            <p>Aus dieser Auswahl können Sie mithilfe des Schnellzugriffs in der Navigationsleiste den aktuellen
                Bilanzkreis festlegen.</p>
            <form name="bilanceSelection" onSubmit={handleSubmit}>
                <div className={`${styles.formElementGroup}`}>
                    <p>
                        <input className={`${formErr['name'] ? 'border-danger' : ''}`} type="checkbox"
                            onChange={(e) =>
                                setChecked((oldState) => ({ ...oldState, option_1: oldState.option_1 === 'Bilanzkreis A' ? '' : 'Bilanzkreis A' }))
                            }
                            checked={checked.option_1}

                        />
                        <label>Bilanzkreis A</label>
                    </p>
                    <p>
                        <input className={`${formErr['name'] ? 'border-danger' : ''}`} type="checkbox"
                            onChange={(e) =>
                                setChecked((oldState) => ({ ...oldState, option_2: oldState.option_2 === 'Bilanzkreis B' ? '' : 'Bilanzkreis B' }))
                            }
                            checked={checked.option_2}
                        />
                        <label>Bilanzkreis B</label>
                    </p>
                    <p>
                        <input className={`${formErr['name'] ? 'border-danger' : ''}`} type="checkbox"
                            onChange={(e) =>
                                setChecked((oldState) => ({ ...oldState, option_3: oldState.option_3 === 'Bilanzkreis C' ? '' : 'Bilanzkreis C' }))
                            }
                            checked={checked.option_3}

                        />
                        <label>Bilanzkreis C</label>
                    </p>
                </div>
                <div className={`${commonModalStyles.buttonGroup}`}>
                    <Button variant={"secondary"} onClick={() => setModalOpen(false)}>Abbrechen</Button>
                    <Button disabled={!validForm()} type="submit" variant={"primary"} >Speichern</Button>
                </div>
            </form>
        </div>
    )
}


export default BilanzSelection;