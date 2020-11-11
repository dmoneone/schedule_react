import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import c from '../Calendar.module.scss'
import { splitArray } from '../../../helpers/splitArray';
import cn from 'classnames'
import { Popup } from '../../Popup/Popup';
import { Cell } from './Cell/Cell';
import { extendArray } from '../../../helpers/extendArray';
import { Schedule, Task } from '../Calendar';
import { DragDropContext } from 'react-beautiful-dnd';
import { consist } from '../../../helpers/consist';

type Props = {
    selectedDate: Date;
    currentDate: Date;
    disableButton: Dispatch<SetStateAction<boolean>>;
    schedule: Schedule | null;
    setSchedule: Dispatch<SetStateAction<Schedule | null>>;
}

export type CurrentCell = Date | null

export const CalendarBody: FC<Props> = props => {
    const [isPopupOpen, setPopup] = useState(false)
    const [currentCell, setCurrentCell] = useState<CurrentCell>(null)

    useEffect(() => {
        const monthStart = startOfMonth(props.selectedDate)
        const monthEnd = endOfMonth(props.selectedDate)

        const cells: Array<Date> = eachDayOfInterval({ start: monthStart, end: monthEnd })
        const splitedArray = splitArray<Date>(cells, 7)
        const extendedArray = extendArray(splitedArray)

        findCellAndSetSchedule(extendedArray, new Date('November 1, 2020'), 'November', '10:00')
        findCellAndSetSchedule(extendedArray, new Date('December 3, 2020'), 'December', '10:00')

        props.setSchedule(extendedArray)
    }, [props.selectedDate])

    // useEffect(() => {
    //     console.log(props.schedule, '___')
    //     if (props.schedule) {
    //         findCellAndSetSchedule(new Date('November 1, 2020'), 'Fake', '10:00')
    //         findCellAndSetSchedule(new Date('December 31, 2020'), 'Fake 2', '10:00')
    //     }
    // }, [props.schedule, props.selectedDate])


    const dateFormat = "MMMM yyyy dddd";
    const days: string[] = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

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

    const findAndSetCell = (schedule: Schedule, date: Date, title: string, time: string) => {
        let indexes = []
        for (let i = 0; i < schedule?.length; i++) {
            let ind = schedule[i].findIndex(item => {
                return format(item.date, dateFormat) === format(date, dateFormat)
            })
            if (ind !== -1) {
                indexes.push(i, ind)
                break
            }
        }

        schedule[indexes[0]][indexes[1]].tasks.push({
            time,
            title,
        })

        props.setSchedule(schedule)
    }

    const findCellAndSetSchedule = (shedule: Schedule, date: Date, title: string, time: string) => {
        let sheduleCopy = [...shedule]
        if (!consist(sheduleCopy, date, dateFormat)) return console.error('This month does not consist the' + ' ' + date.toDateString())
        findAndSetCell(sheduleCopy, date, title, time)
    }

    const renderCells = (schedule: Schedule) => {
        // if(!consist(_schedule, date)) return console.error('This month does not consist the' + ' ' + date.toDateString())
        const jsx = schedule.map((array, i) => {
            return (
                <ul key={i}>
                    {
                        array.map((item, j) => {
                            let dropableId = `events${item.date.toDateString()}`
                            item.droppableId = dropableId
                            return (
                                <Cell
                                    key={item.date ? item.date.toISOString() : j}
                                    getClassDate={getClassDate}
                                    date={item.date}
                                    setPopup={setPopup}
                                    setCurrentCell={setCurrentCell}
                                    tasks={item.tasks}
                                    schedule={schedule}
                                    setSchedule={props.setSchedule}
                                    dropableId={dropableId}
                                >
                                </Cell>
                            )
                        })
                    }
                </ul>
            )
        })

        return jsx
    }

    const findDayByDroppableId = (schedule: Schedule, droppableId: string) => {
        let result: any;
        for (let i: number = 0; i < schedule.length; i++) {
            result = schedule[i].find(item => item.droppableId === droppableId)
            if (result) {
                break
            }
        }
        return result
    }

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        console.log(
            'from ' + result.source.droppableId,
            'to ' + result.destination.droppableId,
            'fromIndex ' + result.source.index,
            'toIndex ' + result.destination.index
        )

        const scheduleCopy = [...props.schedule as Schedule];

        const from = findDayByDroppableId(scheduleCopy, result.source.droppableId)
        const to = findDayByDroppableId(scheduleCopy, result.destination.droppableId)
        const [removed] = from.tasks.splice(result.source.index, 1)
        to.tasks.splice(result.destination.index, 0, removed)

        props.setSchedule(scheduleCopy)
    }



    console.log(props.schedule, "schedule")

    return (
        <div className={c['calendar-body']}>
            { isPopupOpen && <Popup
                setCurrentCell={setCurrentCell}
                currentCell={currentCell}
                setPopup={setPopup}
                schedule={props.schedule}
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
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div className={c.cells}>
                    {
                        props.schedule && renderCells(props.schedule)
                    }
                </div>

            </DragDropContext>

        </div>
    )
}