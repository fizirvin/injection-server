import { format } from 'date-fns'

function timeZoneDate(date){
    return format(date, 'yyyy-MM-dd')
}

export default timeZoneDate;