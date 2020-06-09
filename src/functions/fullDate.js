import { utcToZonedTime, format } from 'date-fns-tz'

function fullDate(date){
    const output = format(utcToZonedTime(date, 'America/Mexico_City'), 'iii PPpppp', { timeZone: 'America/Mexico_City' })
    return output
}

export default fullDate;