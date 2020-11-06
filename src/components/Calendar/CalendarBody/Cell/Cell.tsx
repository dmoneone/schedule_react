import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import c from '../../../Calendar/Calendar.module.scss'
import { Task } from '../../Calendar'
import { CurrentCell } from '../CalendarBody'
import { Event } from './Event/Event'

type Props = {
    getClassDate: (date: Date) => string
    date: Date;
    setPopup: (flag: boolean) => void
    setCurrentCell: Dispatch<SetStateAction<CurrentCell>>;
    tasks?: Array<Task>;
    droppable: any;
}

const compare = (a: any, b: any) => {
    if (a.time < b.time) {
        return -1;
    }
    if (a.time > b.time) {
        return 1;
    }
    return 0;
}

export const Cell: FC<Props> = props => {
    const [tasks, setTasks] = useState(props.tasks)

    return (
        <>
            <li onClick={() => {
                props.setPopup(true)
                props.setCurrentCell(props.date)
            }}>
                <span className={props.getClassDate(props.date)}>{props.date.getDate()}</span>


                <>
                    {(props.date && tasks?.length) ? <ul className={c['task-nav']} {...props.droppable.droppableProps} ref={props.droppable.innerRef}>
                        {
                            tasks && tasks.sort(compare).map((item, i) => {
                                return (
                                    <Draggable key={i} draggableId={item.time + item.title} index={i}>
                                        {
                                            draggable => (
                                                <Event
                                                    draggable={draggable}
                                                    item={item}
                                                />
                                            )
                                        }
                                    </Draggable>
                                )
                            })
                        }
                    </ul> : null}
                </>

            </li>
        </>
    )
}