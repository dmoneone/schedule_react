import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import c from './Popup.module.scss'
import { CurrentCell } from '../Calendar/CalendarBody/CalendarBody';
import { Task } from '../Calendar/Calendar';
import { cleanup } from '@testing-library/react';

type Props = {
    currentCell: CurrentCell;
    setCurrentCell: Dispatch<SetStateAction<CurrentCell>>;
    setPopup: Dispatch<SetStateAction<boolean>>;
    findCellAndSetSchedule: (currentCell: any, newTask: string, time: string) => void;
}

export const Popup: FC<Props> = props => {
    const [newTask, setNewTask] = useState('')
    const [selectedTime, selectTime] = useState('10:00')

    const addTask = () => {
        console.log(newTask, selectedTime)
    }

    return (
        <div className={c['popup-wrap']} onClick={e => {
            props.setPopup(false)
        }}>
            <div className={c.popup} onClick={e => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
            }}>
                <span>New Task!</span>
                <span className={c.date}>{props.currentCell?.toDateString()}</span>
                <input onChange={(e) => setNewTask(e.target.value)} />
                <input type="time" id="appt" name="appt"
                    min="09:00" max="18:00" required
                    onChange={e => selectTime(e.target.value)}
                ></input>
                <div className={c["btn-panel"]}>
                    <button onClick={() => {
                        addTask()
                        props.setPopup(false)
                        props.findCellAndSetSchedule(props.currentCell, newTask, selectedTime)
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