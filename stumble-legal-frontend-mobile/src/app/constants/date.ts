export const BIRTHDAY_MIN_DATE = new Date('1950-01-01');

export const BIRTHDAY_MAX_DATE = new Date(
  `${new Date().getFullYear() - 18}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
);
