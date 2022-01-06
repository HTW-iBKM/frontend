import React, {ReactElement, useContext, useState} from "react";
// import { GraphContext } from "../../context/GraphContext";
import { ModalContext } from "../../context/ModalContext";
import { useCheckbox } from "../../hooks/useCheckbox";
import { useInput } from "../../hooks/useInput";
import { RadioButtonGroupInterface, useRadioButtonGroup } from "../../hooks/useRadioButtonGroup";
import Button from "../form/Button";
import RadioButtonGroup from "../form/RadioButtonGroup";
import TextField from "../form/TextField";
import { commonModalStyles } from "./Modal";
import "./SaveFileModalTemplate.css";


function SaveFileTemplate(): ReactElement{
  const modalContext = useContext(ModalContext);
  // const graphContext = useContext(GraphContext);

  const styles = {
    formElementGroup: "mb-8 relative"
  }

  const defaultRadioButtonGroupValue: RadioButtonGroupInterface = {
    options: ["CSV", "PNG", "PDF"],
    disabledOptions: ["PDF"],
    selected: "CSV",
  }
  const { value:fileName, bind:bindFileName, reset:resetFileName } = useInput("");
  const { radioButtonGroup:radioButtonGroup, bind:bindRadioButtonGroup, reset:resetRadioButtonGroup } = useRadioButtonGroup(defaultRadioButtonGroupValue);
  // const checkboxFormControls = graphContext.graphs.map((data) => {
  //   const { checked:checkbox, bind:bindCheckbox, reset:resetCheckbox } = useCheckbox(data.checked)
  //   return {key: data.key, name: data.name, checked: checkbox, bind:bindCheckbox, reset:resetCheckbox}
  // });

  const [formTouched, setFormTouched] = useState({
    name: false,
    format: false,
    timeSeries: false,
  })

  // const formErr: {name: string | null, format: string | null, timeSeries: string | null} = {
  //   name: !fileName ? "Geben Sie der Datei einen Titel mit mindestens einem Buchstaben." : null,
  //   format: !radioButtonGroup.selected ? 'Wählen sie ein Dateiformat.' : null,
  //   timeSeries: checkboxFormControls.filter((checkbox) => !!checkbox.checked).length === 0 ? 'Wählen Sie mindestens eine Zeitreihe aus.' : null
  // }
  
  // const validForm = () => !formErr['name'] && !formErr['format'] && !formErr['timeSeries'];

  const handleSubmit = (evt: React.FormEvent) => {    
    // if(validForm()) {
    //   evt.preventDefault();
    //   alert(`
    //     Submitting 
    //     Filename ${fileName}, 
    //     Format type ${radioButtonGroup.selected}, 
    //     Time series: ${checkboxFormControls.map((checkbox) => `${checkbox.name}: ${checkbox.checked}`)}`
    //   );
    //   resetFileName();
    //   resetRadioButtonGroup();
    //   checkboxFormControls.map((checkbox) => checkbox.reset())
    //   modalContext.setIsOpen(false)
    // }
  }

  return (
    <div>
      <form name="saveFileForm" onSubmit={handleSubmit}>
        <div className={`${styles.formElementGroup}`}>
          <p>Geben Sie der Datei einen Titel:</p>
          <TextField 
            type={"text"} 
            name={"file-name"} 
            label={"Dateiname*"} 
            onBlur={() => setFormTouched((oldEle) => ({ ...oldEle, name: true }))} 
            {...bindFileName}
            // errorMessage={`${formErr['name'] && formTouched.name ? formErr['name'] : ""}`}
          />
        </div>
        <div className={`${styles.formElementGroup}`}>
          <p>Wählen Sie ein Dateiformat*:</p>
            <RadioButtonGroup 
              options={bindRadioButtonGroup.radioButtonGroup.options} 
              selected={bindRadioButtonGroup.radioButtonGroup.selected}
              disabledOptions={bindRadioButtonGroup.radioButtonGroup.disabledOptions}
              onChange={bindRadioButtonGroup.onChange}
            >
            </RadioButtonGroup>
        </div>
        <div className={`${styles.formElementGroup}`}>
          {/* <fieldset>
            <legend className={`my-3`}><p>Wählen Sie alle Zeitreihen aus, die Sie als Datei abspeichern möchten*:</p></legend>
            {checkboxFormControls.map((data, index) => 
              <div key={index} className="flex gap-2 items-center">
                <input className={`${formErr['timeSeries'] ? 'border-danger' : ''}`} id={data.key} type="checkbox" {...data.bind}/>
                <label htmlFor={data.key}>{data.name}</label>
              </div>
            )}
          </fieldset>
          {formErr['timeSeries'] &&
            <span className={"text-danger text-sm pl-4"}>{formErr['timeSeries']}</span>
          } */}
        </div>
        <div className={`${commonModalStyles.buttonGroup}`}>
          <Button variant={"secondary"} onClick={() => modalContext.setIsOpen(false)}>Abbrechen</Button>
          {/* <Button disabled={!validForm()} type="submit" variant={"primary"}>Speichern</Button> */}
        </div>
      </form>
    </div>
  )
}

export default SaveFileTemplate;