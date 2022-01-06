import React, {ReactElement, useRef} from 'react';
import Flatpickr, {DateTimePickerProps} from "react-flatpickr";
import TextField from "../form/TextField";
import CalenderIcon from "../icons/CalenderIcon";
import Button from "../form/Button";

function DatePicker(props: DateTimePickerProps): ReactElement  {
  const fp = useRef<Flatpickr|null>(null);
  return (
    <div className={"flex relative w-6 h-6"}>
      <Flatpickr
        {...props}
        options={{
          mode: "range",
          minDate: "today",
          dateFormat: "Y-m-d",
        }}
        render={
          ({defaultValue}, ref) => {
            return <input className={"invisible w-6 h-6"} type={"text"} name={"DatePicker"} defaultValue={defaultValue} ref={ref} />
          }
        }
        ref={fp}
      />
        <Button
          variant={"icon"}
          className={"absolute left-0 top-0 w-6 h-6"}
          onClick={() => {
            fp.current?.flatpickr.open();
          }}
        >
          <CalenderIcon/>
        </Button>
    </div>
  )
}

export default DatePicker;
