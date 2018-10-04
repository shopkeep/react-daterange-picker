'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _momentRange = require('../moment-range');

var _momentRange2 = _interopRequireDefault(_momentRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customLocaleName = 'week-band-locale';

var localed = function localed(date) {
  return date.clone().locale(customLocaleName);
};

var WeekBand = {
  setupWeekBandLocale: function setupWeekBandLocale(dayOfWeek) {
    var originalLocale = _momentRange2.default.locale();

    _momentRange2.default.defineLocale(customLocaleName, {
      parentLocale: originalLocale,
      week: {
        dow: dayOfWeek
      }
    });

    _momentRange2.default.locale(originalLocale);
  },
  shiftToWeekBand: function shiftToWeekBand(date, method) {
    var originalLocale = date.locale();
    return localed(date)[method]('week').locale(originalLocale);
  },
  checkInWeekBand: function checkInWeekBand(date1, date2) {
    return localed(date1).isSame(localed(date2), 'week');
  }
};

exports.default = WeekBand;