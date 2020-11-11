import { format } from "date-fns"
import { Schedule } from "../components/Calendar/Calendar"

export const consist = (schedule: Schedule, date: Date, dateFormat: string): boolean => {
    for(let i = 0; i < schedule.length; i++) {
        for(let j = 0; j < schedule[i].length; j++) {
            if(format(schedule[i][j].date, dateFormat) === format(date, dateFormat)) {
                return true
            }
        }
    }
    
    return false
}