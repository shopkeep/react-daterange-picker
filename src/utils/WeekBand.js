import moment from '../moment-range';

const customLocaleName = 'week-band-locale';

const localed = (date) => date.clone().locale(customLocaleName);

const WeekBand = {
  setupWeekBandLocale(dayOfWeek) {
    const originalLocale =  moment.locale();

    moment.defineLocale(customLocaleName, {
      parentLocale: originalLocale,
      week: {
        dow: dayOfWeek,
      },
    });

    moment.locale(originalLocale);
  },

  shiftToWeekBand(date, method) {
    const originalLocale = date.locale();
    return localed(date)[method]('week').locale(originalLocale);
  },

  checkInWeekBand(date1, date2) {
    return localed(date1).isSame(localed(date2), 'week');
  },
};

export default WeekBand;
