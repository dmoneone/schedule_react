import { Task } from '../components/Calendar/Calendar';

export function extendArray(array: Date[][]) {
    return array.map(array => {
        return array.map(date => {
            return {
                date,
                droppableId: '',
                tasks: [] as Array<Task>
            }
        })
    })
}
