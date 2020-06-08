import { format } from 'date-fns'

const shortDate = (date) => format(date, "yyyy-MM-dd")

export default shortDate;