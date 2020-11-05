import React, { FC, useState } from 'react'
import c from './Calendar.module.scss'
import { CalendarBody } from './CalendarBody/CalendarBody'
import { CalendarHeader } from './CalendarHeader/CalendarHeader'

export type Task = {
    title: string;
    desciption?: string;
    time: string;
}

export const Calendar: FC<any> = props => {
    const [currentDate] = useState(new Date())
    const [selectedDate, selectDate] = useState(new Date())

    return (
        <div className={c.calendar}>
            <CalendarHeader
                selectDate={selectDate}
                selectedDate={selectedDate}
                currentDate={currentDate}
            />
            <CalendarBody
                selectedDate={selectedDate}
                currentDate={currentDate}
            />
        </div>
    )
}