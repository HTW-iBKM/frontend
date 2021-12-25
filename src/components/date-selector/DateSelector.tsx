import React, {ReactElement, useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import { de } from 'date-fns/locale'
import {DateChangeCallBack, DateRangePicker} from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
function DateSelector(): ReactElement {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  return (
    <DateRangePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={setStartDate as DateChangeCallBack}
      onEndDateChange={setEndDate as DateChangeCallBack}
      minimumDate={new Date()}
      minimumLength={1}
      format='dd MMM yyyy'
      locale={de}
    >
      {({ startDateInputProps, endDateInputProps, focus }) => (
        <div className='date-range'>
          <input
            className={'input' + (focus === 'startDate' ? ' -focused' : '')}
            {...startDateInputProps}
            placeholder='Start date'
          />
          <span className='date-range_arrow' />
          <input
            className={'input' + (focus === 'endDate' ? ' -focused' : '')}
            {...endDateInputProps}
            placeholder='End date'
          />
        </div>
      )}
    </DateRangePicker>
  )
}



export default DateSelector