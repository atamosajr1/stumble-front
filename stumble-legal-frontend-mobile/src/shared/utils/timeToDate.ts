export const timeToDate = (date: Date, newDate: Date) => {
  date.setHours(newDate.getHours());
  date.setMinutes(newDate.getMinutes());
  date.setSeconds(newDate.getSeconds());
};

export const updateDateKeepTime = (time: Date, dayAndMonth: Date): Date => {
  const updated = new Date(dayAndMonth);
  updated.setHours(time.getHours());
  updated.setMinutes(time.getMinutes());
  updated.setSeconds(time.getSeconds());
  updated.setMilliseconds(time.getMilliseconds());
  return new Date(updated);
};
