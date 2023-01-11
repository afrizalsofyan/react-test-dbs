import { useState } from "react"
import ReactDatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'

const DatePickerInput = () => {
  const [start, setStart] = useState(new Date())
  return (
    <ReactDatePicker selected={start} onChange={(date) => setStart(date)} />
  )
}

export default DatePickerInput