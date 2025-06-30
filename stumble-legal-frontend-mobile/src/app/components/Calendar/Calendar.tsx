import { addWeeks, startOfDay, startOfWeek } from 'date-fns';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import React, { FC, memo } from 'react';
import CalendarStrip from 'react-native-calendar-strip';

import { theme } from '~/app/uiKit';
import { ArrowLeft, ArrowRight } from '~/assets/icons';

import { useStyles } from './useStyles';

interface Props {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const CalendarScreen: FC<Props> = memo(({ setSelectedDate }) => {
  const today = new Date();
  const weekStart = startOfWeek(today);
  const styles = useStyles();

  return (
    <CalendarStrip
      showMonth
      customDatesStyles={date => {
        const day = date.day();
        if (day === 0) {
          return {
            dateNameStyle: styles.sundayDateName,
            dateNumberStyle: styles.sundayDateNumber,
          };
        }
        return {};
      }}
      dateNameStyle={styles.dateNameStyle}
      dateNumberStyle={styles.dateNumberStyle}
      datesBlacklist={date => moment(date).isBefore(moment().startOf('day'), 'day')}
      disabledDateNameStyle={styles.sundayDateName}
      disabledDateNumberStyle={styles.sundayDateNumber}
      highlightDateNameStyle={styles.dateNameStyle}
      highlightDateNumberContainerStyle={styles.highlightDateNumberContainerStyle}
      highlightDateNumberStyle={styles.highlightDateNumberStyle}
      leftSelector={<ArrowLeft color={theme.colors.gray[3]} />}
      maxDate={addWeeks(today, 8)} // Optionally set a maximum date for a specific number of weeks ahead
      minDate={weekStart} // Set minimum date to the start of the current week
      rightSelector={<ArrowRight color={theme.colors.black[1]} />}
      selectedDate={today}
      startingDate={weekStart}
      style={styles.calendar}
      useIsoWeekday={false}
      onDateSelected={date => {
        const selected = date.toDate();
        setSelectedDate(startOfDay(selected));
      }}
    />
  );
});
