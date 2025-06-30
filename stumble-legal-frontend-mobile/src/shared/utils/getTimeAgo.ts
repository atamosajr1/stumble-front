import {
  differenceInCalendarDays,
  differenceInHours,
  differenceInMinutes,
  isToday,
} from 'date-fns';

export const getTimeAgo = (dttm: string) => {
  if (!dttm) return '';
  const now = new Date();
  const date = new Date(dttm);

  if (isToday(date)) {
    const hours = differenceInHours(now, date);
    if (hours > 0) {
      return `${hours} h ago`;
    }

    const minutes = differenceInMinutes(now, date);
    if (minutes > 0) {
      return `${minutes} min ago`;
    }

    return 'just now';
  }

  const days = differenceInCalendarDays(now, date);
  return days >= 0 ? `${days} d ago` : `in ${Math.abs(days)} d`;
};
