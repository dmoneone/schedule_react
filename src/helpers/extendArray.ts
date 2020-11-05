import { Task } from '../components/Calendar/Calendar';

export function extendArray(array: Date[][]) {
    return array.map(array => {
        return array.map(date => {
            return {
                date,
                tasks: [] as Array<Task>
            }
        })
    })
}