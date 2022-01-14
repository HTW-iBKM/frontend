import React, { ReactElement } from "react";
import Button from "../form/Button";
import { useCheckbox } from "../../hooks/useCheckbox";
import { commonModalStyles } from "./Modal";
import { GraphKey, KeyData } from "../graph/Graph";
import "./SaveFileModalTemplate.css";
import Checkbox from "../form/Checkbox";

interface EditTimeSeriesModalProps {
  keyData: KeyData[],
  setKeyData: React.Dispatch<React.SetStateAction<KeyData[]>>,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditTimeSeriesTemplate = ({ keyData, setKeyData, setModalOpen }: EditTimeSeriesModalProps): ReactElement => {
  const checkboxFormControls = keyData.map((data) => {
    const { checked: checkbox, bind: bindCheckbox, reset: resetCheckbox } = useCheckbox(data.checked)
    return { key: data.key, name: data.name, checked: checkbox, bind: bindCheckbox, reset: resetCheckbox }
  });

  const CheckboxContainer = 'flex flex-col gap-y-2';

  const handleSubmit = (evt: React.FormEvent) => {
    setModalOpen(false)
    evt.preventDefault();
    console.log(`Submitting Time series: ${checkboxFormControls.map((checkbox) => `${checkbox.name}: ${checkbox.checked}`)}`);
    const newGraphData: KeyData[] = checkboxFormControls.map((checkbox) => {
      const newValue: KeyData = {
        key: checkbox.key as GraphKey,
        name: checkbox.name,
        checked: checkbox.checked
      }
      return newValue;
    })
    setKeyData(newGraphData)
    checkboxFormControls.map((checkbox) => checkbox.reset())
  }

  return (
    <div>
      <form name="saveFileForm" onSubmit={handleSubmit}>
        <div className="mb-8">
          <fieldset>
            <legend className="mb-3"><p>Wählen Sie alle Zeitreihen aus, die Sie im Graphen anzeigen möchten: </p></legend>
            <div className={CheckboxContainer}>
              {checkboxFormControls.map((data, index) => (
                <Checkbox name={data.key} key={index} {...data.bind}>{data.name}</Checkbox>))}
            </div>
          </fieldset>
        </div>
        <div className={`${commonModalStyles.buttonGroup}`}>
          <Button variant={"secondary"} onClick={() => setModalOpen(false)}>Abbrechen</Button>
          <Button type="submit" variant={"primary"}>Speichern</Button>
        </div>
      </form>
    </div>
  )
}

export default EditTimeSeriesTemplate;