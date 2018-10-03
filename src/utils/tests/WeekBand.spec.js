import moment from '../../moment-range';
import WeekBand from '../WeekBand';

describe('WeekBand', function () {

  beforeAll( function () {
    this.originalLocale = moment.locale();
    const localesBefore = moment.locales();
    WeekBand.setupWeekBandLocale(3);
    const localesAfter = moment.locales();
    this.newLocales = localesAfter.filter(locale => !localesBefore.includes(locale));
  });

  describe('#setupWeekBandLocale', function () {

    it('sets up new week band locale', function () {
      expect(this.newLocales).toEqual(['week-band-locale']);
    });

    it('sets up new week band locale', function () {
      expect(moment.locale()).toEqual(this.originalLocale);
    });

  });

  describe('#shiftToWeekBand', function () {

    beforeEach( function () {
      this.inputDate = moment.utc('2018-09-17T18:00:00').locale('fr');
      this.outputDate = WeekBand.shiftToWeekBand(this.inputDate, 'startOf');
    });

    it('does not modify the inputted date', function () {
      expect(this.inputDate.format()).toBe('2018-09-17T18:00:00Z');
      expect(this.inputDate.locale()).toBe('fr');
    });

    it('returns a new shifted date in the same input locale', function () {
      expect(this.outputDate.format()).toBe('2018-09-12T00:00:00Z');
      expect(this.outputDate.locale()).toBe('fr');
    });

  });

  describe('#checkInWeekBand', function () {

    describe('when in same week', function () {

      it('returns true', function () {
        const date1 = moment.utc('2018-09-19T23:59:59');
        const date2 = moment.utc('2018-09-20T00:00:00');
        expect(WeekBand.checkInWeekBand(date1, date2)).toBe(true);
      });

    });

    describe('when not in same week', function () {

      it('returns false', function () {
        const date1 = moment.utc('2018-09-18T23:59:59');
        const date2 = moment.utc('2018-09-19T00:00:00');
        expect(WeekBand.checkInWeekBand(date1, date2)).toBe(false);
      });

    });

  });

});
