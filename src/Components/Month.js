import React from "react"
import { format, startOfMonth, getDay } from "date-fns"
import { times } from "ramda"
import { v4 } from "react-native-uuid"

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export const Month = ({ date, titleLabel, children }) => {
  const weekDay = getDay(startOfMonth(date)) % 6
  let startMargin = times(() => <span className="calendar__day" key={v4()} />, weekDay)

  return (
    <div className="calendar__month">
      <div className="heading--small">
        {format(date, "MMMM")}&nbsp;
        {titleLabel}$
      </div>
      {WEEKDAYS.map(day => (
        <span key={v4()} className="month__weekdays">
          {day}
        </span>
      ))}
      {startMargin}
      {children}
    </div>
  )
}