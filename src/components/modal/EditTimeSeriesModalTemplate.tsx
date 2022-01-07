import React, {ReactElement} from "react";
import Button from "../form/Button";
import { useCheckbox } from "../../hooks/useCheckbox";
import { commonModalStyles } from "./Modal";
import { GraphKey, KeyData } from "../graph/Graph";
import "./SaveFileModalTemplate.css";

interface EditTimeSeriesModalProps {
  keyData: KeyData[],
  setKeyData: React.Dispatch<React.SetStateAction<KeyData[]>>,
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditTimeSeriesTemplate = ({keyData, setKeyData, setModalOpen}: EditTimeSeriesModalProps): ReactElement => {
  const checkboxFormControls = keyData.map((data) => {
    const { checked:checkbox, bind:bindCheckbox, reset:resetCheckbox } = useCheckbox(data.checked)
    return {key: data.key, name: data.name, checked: checkbox, bind:bindCheckbox, reset:resetCheckbox}
  });
  
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
            {checkboxFormControls.map((data, index) => 
              <div key={index} className="flex gap-2 items-center">
                <input id={data.key} type="checkbox" {...data.bind}/>
                <label htmlFor={data.key}>{data.name}</label>
              </div>
            )}
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