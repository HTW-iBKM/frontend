import { useState } from "react";

interface InputFormControl {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  reset: () => void,
  bind: {
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  }
}

export const useInput = (initialValue: string): InputFormControl => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }
    }
  };
};