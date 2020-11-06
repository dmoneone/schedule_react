import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import c from '../Calendar.module.scss'
import { splitArray } from '../../../helpers/splitArray';
import cn from 'classnames'
import { Popup } from '../../Popup/Popup';
import { Cell } from './Cell/Cell';
import { extendArray } from '../../../helpers/extendArray';
import { Task } from '../Calendar';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

type Props = {
    selectedDate: Date;
    currentDate: Date;
    disableButton: Dispatch<SetStateAction<boolean>>;
}

export type CurrentCell = Date | null

type Schedule = {
    date: Date;
    tasks: Task[];
}[][] | null

export const CalendarBody: FC<Props> = props => {
    const [isPopupOpen, setPopup] = useState(false)
    const [currentCell, setCurrentCell] = useState<CurrentCell>(null)
    const [schedule, setSchedule] = useState<Schedule>(null)

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

    extendedArray[0][0].tasks.push(
        {
            time: '10:00',
            title: 'yoyoyoyo'
        },
        {
            time: '11:00',
            title: 'dmoneone'
        }
    )

    const findAndSetCell = (extendedArray: {
        date: Date;
        tasks: Task[];
    }[][], date: Date, title: string, time: string) => {

        let indexes = []
        for (let i = 0; i < extendedArray?.length; i++) {
            let ind = extendedArray[i].findIndex(item => {
                return format(item.date, dateFormat) === format(date, dateFormat)
            })
            if (ind !== -1) {
                indexes.push(i, ind)
                break
            }
        }

        extendedArray && extendedArray[indexes[0]][indexes[1]].tasks.push({
            time,
            title,
        })

        setSchedule(extendedArray)
    }

    const findCellAndSetSchedule = (date: Date, title: string, time: string) => {
        if (!schedule) {
            findAndSetCell(extendedArray, date, title, time)
        } else {
            findAndSetCell(schedule, date, title, time)
        }
    }

    const renderCells = (schedule: {
        date: Date;
        tasks: Task[];
    }[][], droppable: any) => {
        return schedule.map((array, i) => {
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
                                    droppable={droppable}
                                >
                                </Cell>
                            )
                        })
                    }
                </ul>
            )
        })
    }

    const onDragEnd = (result: any) => {
        console.log(result)
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
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Droppable droppableId="tasks">
                    {
                        (droppable) => (
                            <div className={c.cells}>
                                {
                                    schedule && renderCells(schedule, droppable)
                                }
                                {
                                    !schedule && renderCells(extendedArray, droppable)
                                }
                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>

        </div>
    )
}