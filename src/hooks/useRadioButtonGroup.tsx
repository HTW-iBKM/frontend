import { useState } from "react";

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

export const useRadioButtonGroup = (initialValue: RadioButtonGroupInterface) => {
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