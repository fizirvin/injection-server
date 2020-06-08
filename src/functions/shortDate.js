import { format } from 'date-fns'

const shortDate = (date) => format(date, "yyyy-MMM-dd")

export default shortDate;