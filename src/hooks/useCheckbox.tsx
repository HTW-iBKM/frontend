import React, { useState } from "react";

interface CheckboxFormControl {
  checked: boolean,
  setCheckbox: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void,
  bind: {
    checked: boolean,
    onChange: () => void
  }
}

export const useCheckbox = (initialValue: boolean): CheckboxFormControl => {
  const [checked, setCheckbox] = useState(initialValue);

  return {
    checked,
    setCheckbox,
    reset: () => setCheckbox(false),
    bind: {
      checked,
      onChange: () => {
        setCheckbox(!checked);
      }
    }
  };
};