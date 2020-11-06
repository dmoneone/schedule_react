import React, { FC } from 'react'
import c from '../../../Calendar.module.scss'

export const Event: FC<any> = props => {
    return (
        <li ref={props.draggable.innerRef} {...props.draggable.draggableProps} {...props.draggable.dragHandleProps}>
            <span className={c.time}>{props.item.time}</span>
            {props.item.title}
        </li>
    )
}