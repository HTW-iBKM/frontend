import React, {ReactElement, useContext} from "react";
import { ModalContext } from "../../context/ModalContext";
import { useInput } from "../../hooks/useInput";
import { RadioButtonGroupInterface, useRadioButtonGroup } from "../../hooks/useRadioButtonGroup";
import Button from "../form/Button";
import RadioButtonGroup from "../form/RadioButtonGroup";
import TextField from "../form/TextField";
import { commonModalStyles } from "./Modal";
import "./SaveFileModalTemplate.css";


function SaveFileTemplate(): ReactElement{
  const styles = {
    formElementGroup: "mb-8"
  }

  const textFileName = "Filename";
  const testRadioButtonGroupValue: RadioButtonGroupInterface = {
    options: ["CSV", "PNG", "PDF"],
    disabledOptions: ["PDF"],
    selected: "CSV",
  }

  const modalContext = useContext(ModalContext);
  const { value:fileName, bind:bindFileName, reset:resetFileName } = useInput(textFileName);
  const { radioButtonGroup:radioButtonGroup, bind:bindRadioButtonGroup, reset:resetRadioButtonGroup } = useRadioButtonGroup(testRadioButtonGroupValue);
  
  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    alert(`Submitting Filename ${fileName}, Format type ${radioButtonGroup.selected}, Time series TODO`);
    resetFileName();
    resetRadioButtonGroup();
  }

  return (
    <div>
      <form name="saveFileForm" onSubmit={handleSubmit}>
        <div className={`${styles.formElementGroup}`}>
          <p>Geben Sie der Datei einen Titel:</p>
          <TextField type={"text"} name={"file-name"} label={"Dateiname*"} {...bindFileName} />
        </div>
        <div className={`${styles.formElementGroup}`}>
          <p>Wählen Sie ein Dateiformat*:</p>
            <RadioButtonGroup 
              options={bindRadioButtonGroup.radioButtonGroup.options} 
              selected={bindRadioButtonGroup.radioButtonGroup.selected}
              disabledOptions={bindRadioButtonGroup.radioButtonGroup.disabledOptions}
              onChange={bindRadioButtonGroup.onChange}>
            </RadioButtonGroup>
        </div>
        <div className={`${styles.formElementGroup}`}>
          <fieldset>
            <legend className={`my-3`}><p>Wählen Sie alle Zeitreihen aus, die Sie als Datei abspeichern möchten*:</p></legend>
            <div>
              <input id="prediction" type="checkbox"/>
              <label htmlFor="prediction">Prognose</label>
            </div>
            <div>
              <input id="groundTruth" type="checkbox"/>
              <label htmlFor="groundTruth">Ground Truth</label>
            </div>
            <div>
              <input id="powerSupply" type="checkbox"/>
              <label htmlFor="powerSupply">Strom Vorrat</label>
            </div>
            <div>
              <input id="deltaPredictionPowerSupply" type="checkbox"/>
              <label htmlFor="deltaPredictionPowerSupply">Delta aus Prediction & Strom Vorrat</label>
            </div>
            <div>
              <input id="rateSpotMarket" type="checkbox"/>
              <label htmlFor="rateSpotMarket">Preise Spottmarkt</label>
            </div>
        </fieldset>
        </div>
        <div className={`${commonModalStyles.buttonGroup}`}>
          <Button variant={"secondary"} onClick={() => modalContext.setIsOpen(false)}>Abbrechen</Button>
          <Button type="submit" variant={"primary"} onClick={() => modalContext.setIsOpen(false)}>Speichern</Button>
        </div>
      </form>
    </div>
  )
}

export default SaveFileTemplate;