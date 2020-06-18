import { utcToZonedTime, format } from 'date-fns-tz'

function yearWeek(date){
    const mexDate = utcToZonedTime(date, 'America/Mexico_City')
    const output = format(mexDate, "yyyy-'W'ww", { timeZone: 'America/Mexico_City' })
    return output
}

export default yearWeek;