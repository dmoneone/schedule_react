import { format } from 'date-fns'
import React, { FC, useEffect, useState } from 'react'
import c from './Calendar.module.scss'
import { CalendarBody } from './CalendarBody/CalendarBody'
import { CalendarHeader } from './CalendarHeader/CalendarHeader'

export type Task = {
    title: string;
    desciption?: string;
    time: string;
}

export type Schedule = {
    date: Date;
    droppableId: string;
    tasks: Task[];
}[][]

export const Calendar: FC<any> = props => {
    const [currentDate] = useState(new Date())
    const [selectedDate, selectDate] = useState(new Date())
    const [isButtonDisabled, disableButton] = useState(false)
    const [schedule, setSchedule] = useState<Schedule | null>(null)

    useEffect(() => {
        uploadMonthSchedule()
    }, [schedule])

    const uploadMonthSchedule = () => {
        console.info(schedule, `${ format(selectedDate, "MMMM yyyy") } - is ready to be uploaded`)
    }

    return (
        <div className={c.calendar}>
            <CalendarHeader
                selectDate={selectDate}
                selectedDate={selectedDate}
                currentDate={currentDate}
                isButtonDisabled={isButtonDisabled}
            />
            <CalendarBody
                selectedDate={selectedDate}
                currentDate={currentDate}
                disableButton={disableButton}
                schedule={schedule}
                setSchedule={setSchedule}
            />
        </div>
    )
}