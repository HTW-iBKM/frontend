import React, {ReactElement, useContext} from "react";
import { ModalContext } from "../../context/ModalContext";
import Button from "../form/Button";
import { commonModalStyles } from "./Modal";
import "./SaveFileModalTemplate.css";


function EditTimeSeriesTemplate(): ReactElement{
  const modalContext = useContext(ModalContext);
  
  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    alert(`Submitting Time series TODO`);
  }

  return (
    <div>
      <form name="saveFileForm" onSubmit={handleSubmit}>
        <div className="mb-8">
          <fieldset>
            <legend className="mb-3"><p>Wählen Sie alle Zeitreihen aus, die Sie als Datei abspeichern möchten*:</p></legend>
            <div>
              <input id="prediction" type="checkbox"/>
              <label htmlFor="prediction">Prediction</label>
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

export default EditTimeSeriesTemplate;