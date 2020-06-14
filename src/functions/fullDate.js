import { utcToZonedTime, format } from 'date-fns-tz'

function fullDate(date){
    if(!date) {return null}
    const mexDate = utcToZonedTime(date, 'America/Mexico_City')
    const output = format(mexDate, 'iii PPp zzz', { timeZone: 'America/Mexico_City' })
    return output
}

export default fullDate;