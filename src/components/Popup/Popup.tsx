import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import c from './Popup.module.scss'
import { CurrentCell } from '../Calendar/CalendarBody/CalendarBody';

type Props = {
    currentCell: CurrentCell;
    setCurrentCell: Dispatch<SetStateAction<CurrentCell>>;
    setPopup: Dispatch<SetStateAction<boolean>>
}

export const Popup: FC<Props> = props => {
    const [newTask, setNewTask] = useState('')

    const addTask = () => {
        console.log(newTask)
    }

    return (
        <div className={c['popup-wrap']}>
            <div className={c.popup}>
                <span>New Task!</span>
                <input onChange={(e) => setNewTask(e.target.value)} />
                <div className={c["btn-panel"]}>
                    <button onClick={() => {
                        addTask()
                        props.setPopup(false)
                    }}>add task</button>
                    <button onClick={() => {
                        props.setCurrentCell(null)
                        props.setPopup(false)
                    }}>cancel</button>
                </div>
            </div>
        </div>
    )
}