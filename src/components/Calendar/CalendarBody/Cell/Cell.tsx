import React, { Dispatch, FC, SetStateAction } from 'react'
import c from '../../../Calendar/Calendar.module.scss'
import { Task } from '../../Calendar'
import { CurrentCell } from '../CalendarBody'

type Props = {
    getClassDate: (date: Date) => string
    date: Date;
    setPopup: (flag: boolean) => void
    setCurrentCell: Dispatch<SetStateAction<CurrentCell>>;
    tasks?: Array<Task>;
}

export const Cell: FC<Props> = props => {
    return (
        <>
            <li onClick={() => {
                props.setPopup(true)
                props.setCurrentCell(props.date)
            }}>
                <span className={props.getClassDate(props.date)}>{props.date.getDate()}</span>

                { props.tasks?.length ? <ul className={c['task-nav']}>
                    {
                        props.tasks.map((item, i) => {
                            return <li key={i}>{item.title}</li>
                        })
                    }
                </ul> : null }
            </li>
        </>
    )
}