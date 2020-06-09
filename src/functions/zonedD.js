import { toDate } from 'date-fns-tz'

function zonedD(date){
    return toDate(date, { timeZone: 'America/Mexico_City' })
}

export default zonedD;