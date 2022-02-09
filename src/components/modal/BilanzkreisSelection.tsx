import React, { ReactElement } from "react";
import Button from "../form/Button";
import { commonModalStyles } from "./Modal";
import "./SaveFileModalTemplate.css";
import { useCheckbox } from "../../hooks/useCheckbox";
import { useStore } from "../../store/Store";

interface BilanzSelectionProps {
    setModalOpen: (isOpen: boolean) => void;
}


const BilanzSelection = ({ setModalOpen }: BilanzSelectionProps): ReactElement => {

    const BALANCE_GROUP = ["Bad Tölz", "Freising", "Fürstenfeldbruck"];

    const [bilanzKreise, setBilanzkreise] = useStore<[string[], any]>(state => [state.bilanzKreise, state.setBilanzKreise]);
    const [setSelectedBilanzKreis] = useStore(state => [state.setSelectedBilanzKreis]);

    const balanceGroupObj = BALANCE_GROUP.map((item: string) => {
        return {
            name: item,
            checked: bilanzKreise.includes(item)
        }
    })

    const checkboxFormControls = balanceGroupObj.map((item) => {
        const { checked: checkbox, bind: bindCheckbox, reset: resetCheckbox } = useCheckbox(item.checked)
        return { name: item.name, checked: checkbox, bind: bindCheckbox, reset: resetCheckbox }
    });

    const styles = {
        formElementGroup: "flex flex-col mb-8 relative",
        description: "my-5"

    }

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault();
        const pickedBilanzKreise = checkboxFormControls.filter((checkbox) => checkbox.checked).map(elem => elem.name);
        setBilanzkreise(pickedBilanzKreise)
        setSelectedBilanzKreis(pickedBilanzKreise[0] || "")
        setModalOpen(false);
    }

    return (
        <div>
            <p className={styles.description}>Wählen Sie alle Bilanzkreise aus, die für Sie relevant sind.</p>
            <p className={styles.description}>Aus dieser Auswahl können Sie mithilfe des Schnellzugriffs in der Navigationsleiste den aktuellen
                Bilanzkreis festlegen.</p>
            <form name="bilanceSelection" onSubmit={handleSubmit}>
                <div className={`${styles.formElementGroup}`}>
                    {checkboxFormControls.map((data, index) =>
                        <div key={index} className="flex gap-2 items-center">
                            <input id={data.name} type="checkbox" {...data.bind} />
                            <label htmlFor={data.name}>{data.name}</label>
                        </div>
                    )}
                </div>
                <div className={`${commonModalStyles.buttonGroup}`}>
                    <Button variant={"secondary"} onClick={() => setModalOpen(false)}>Abbrechen</Button>
                    <Button type="submit" variant={"primary"} >Speichern</Button>
                </div>
            </form>
        </div>
    )
}


export default BilanzSelection;