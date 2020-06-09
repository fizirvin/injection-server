import { utcToZonedTime, format } from 'date-fns-tz'

function shortDate(date){
    const output = format(utcToZonedTime(date, 'America/Mexico_City'), 'yyyy-MMM-dd', { timeZone: 'America/Mexico_City' })
    return output
}

export default shortDate;