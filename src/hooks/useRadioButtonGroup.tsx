import { useState } from "react";

interface RadioButtonGroupFormControl {
  radioButtonGroup: RadioButtonGroupInterface,
  setRadioButtonGroup: React.Dispatch<React.SetStateAction<RadioButtonGroupInterface>>
  reset: () => void,
  bind: {
    radioButtonGroup: RadioButtonGroupInterface,
    onChange: (label: string) => void
  }
}
export interface RadioButtonGroupInterface {
  options: string[];
  selected?: string;
  disabledOptions?: string[];
}

const resetValue: RadioButtonGroupInterface = {
  options: [],
  selected: "",
  disabledOptions: [],
}

export const useRadioButtonGroup = (initialValue: RadioButtonGroupInterface): RadioButtonGroupFormControl => {
  const [radioButtonGroup, setRadioButtonGroup] = useState(initialValue);
  
  return {
    radioButtonGroup,
    setRadioButtonGroup,
    reset: () => setRadioButtonGroup(resetValue),
    bind: {
      radioButtonGroup,
      onChange: (label: string) => {
        const newSelected: RadioButtonGroupInterface = {
          options: radioButtonGroup.options,
          selected: label,
          disabledOptions: radioButtonGroup.disabledOptions
        }
        setRadioButtonGroup(newSelected);
      }
    }
  };
};