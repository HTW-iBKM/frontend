import React, {ReactElement} from 'react';
import Flatpickr, {DateTimePickerProps} from "react-flatpickr";
import TextField from "../form/TextField";

function DatePicker(props: DateTimePickerProps): ReactElement  {
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
          return <TextField type={"text"} name={"DatePicker"} label={"Zeitraum"} defaultValue={defaultValue} inputRef={ref} />
        }
      }
    />
  )
}

export default DatePicker;
