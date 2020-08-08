import formatDate from "date-fns/format";
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

export function formatDateRange(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const format = (date) => formatDate(date, 'MMM d yyyy');
  return {
    startDate: format(startDate),
    endDate: format(endDate),
    daysBetween: differenceInCalendarDays(endDate, startDate)
  }
}
