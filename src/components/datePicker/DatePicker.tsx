import React, {ReactElement, useRef} from 'react';
import Flatpickr, {DateTimePickerProps} from "react-flatpickr";
import CalenderIcon from "../icons/CalenderIcon";
import Button from "../form/Button";
import "./DatePicker.css";

function DatePicker(props: DateTimePickerProps): ReactElement  {
  const fp = useRef<Flatpickr|null>(null);
  return (
    <div className={"flex relative w-6 h-6"}>
      <Flatpickr
        {...props}
        options={{
          mode: "range",
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
          variant="icon"
          className={"absolute inset-0 w-6 h-6 z-10"}
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
