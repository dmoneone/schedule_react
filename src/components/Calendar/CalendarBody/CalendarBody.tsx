import React, { FC, useState } from 'react'
import { startOfMonth, endOfMonth, getDaysInMonth, eachDayOfInterval, format } from "date-fns";
import c from '../Calendar.module.scss'
import { splitArray } from '../../../helpers/splitArray';
import cn from 'classnames'
import { Popup } from '../../Popup/Popup';
import { Cell } from './Cell/Cell';
import { extendArray } from '../../../helpers/extendArray';
import { Task } from '../Calendar';

type Props = {
    selectedDate: Date;
    currentDate: Date;
}

export type CurrentCell = Date | null

type Schedule = {
    date: Date;
    tasks: Task[];
}[][]

export const CalendarBody: FC<Props> = props => {
    const [isPopupOpen, setPopup] = useState(false)
    const [currentCell, setCurrentCell] = useState<CurrentCell>(null)
    
    const dateFormat = "MMMM yyyy dddd";

    const getClassDate = (date: Date) => {
        let isToday = false

        if (format(new Date(), dateFormat) === format(date, dateFormat)) {
            isToday = true
        }

        return cn({
            [c.today]: isToday,
            [c.date]: true
        })
    }


    const monthStart = startOfMonth(props.selectedDate)
    const monthEnd = endOfMonth(props.selectedDate)

    const days: string[] = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const cells: Array<Date> = eachDayOfInterval({ start: monthStart, end: monthEnd })
    const splitedArray = splitArray<Date>(cells, 7)
    const extendedArray = extendArray(splitedArray)

    const [schedule, setSchedule] = useState<Schedule>(extendedArray)

    extendedArray[0][0].tasks.push(
        {
            time: '10',
            title: 'yoyoyoyo'
        },
        {
            time: '10',
            title: 'dmoneone'
        }
    )

    const findCellAndSetSchedule = (date: Date, title: string) => {
        let indexes = []
        if (schedule) {
            for (let i = 0; i < schedule?.length; i++) {
                console.log(schedule[i], 'i')
                let ind = schedule[i].findIndex(item => {
                    return format(item.date, dateFormat) === format(date, dateFormat) 
                })
                if(ind !== -1) {
                    indexes.push(i, ind)
                    break
                }
            }
        }

        console.log(indexes)
        schedule[indexes[0]][indexes[1]].tasks.push({
            time: 'x',
            title
        })

        setSchedule(schedule)
    }


    return (
        <div className={c['calendar-body']}>
            { isPopupOpen && <Popup
                setCurrentCell={setCurrentCell}
                currentCell={currentCell}
                setPopup={setPopup}
                findCellAndSetSchedule={findCellAndSetSchedule}

            />}
            <div className={c.days}>
                <ul>
                    {
                        days.map((day, i) => {
                            return <li key={day + i}>{day}</li>
                        })
                    }
                </ul>
            </div>

            <div className={c.cells}>
                {
                    schedule.map((array, i) => {
                        return (
                            <ul key={i}>
                                {
                                    array.map((item, j) => {
                                        return (
                                            <Cell
                                                key={item.date.toISOString()}
                                                getClassDate={getClassDate}
                                                date={item.date}
                                                setPopup={setPopup}
                                                setCurrentCell={setCurrentCell}
                                                tasks={item.tasks}
                                            >
                                            </Cell>
                                        )
                                    })
                                }
                            </ul>
                        )
                    })
                    
                }
            </div>
        </div>
    )
}