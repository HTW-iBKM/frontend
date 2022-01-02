import React, {ReactElement} from 'react';
import Flatpickr, {DateTimePickerProps} from "react-flatpickr";
import TextField from "../form/TextField";

function DatePicker(props: DateTimePickerProps)  {
  return (
    <Flatpickr
      {...props}
      options={{
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
      }}
      render={
        ({defaultValue}, ref) => {
          return <TextField type={"text"} name={"inputField7"} label={"Zeitraum"} defaultValue={defaultValue} inputRef={ref} />
        }
      }
    />
  )
}

export default DatePicker;
