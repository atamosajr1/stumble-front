export const amPmTo24 = (dt: Date, h: string = '00:00 pm') => {
  const s = /(\d+):(\d+)(.+)/.exec(h) as RegExpExecArray;
  dt.setHours(s[3] === 'pm' ? 12 + parseInt(s[1], 10) : parseInt(s[1], 10));
  dt.setMinutes(parseInt(s[2], 10));

  return dt;
};
