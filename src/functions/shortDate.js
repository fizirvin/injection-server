import { utcToZonedTime, format } from 'date-fns-tz'

function shortDate(date){
    const mexDate = utcToZonedTime(date, 'America/Mexico_City')
    const output = format(mexDate, 'yyyy-MMM-dd', { timeZone: 'America/Mexico_City' })
    return output
}

export default shortDate;