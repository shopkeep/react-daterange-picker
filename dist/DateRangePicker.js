'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _momentRange = require('./moment-range');

var _momentRange2 = _interopRequireDefault(_momentRange);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _calendar = require('calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _BemMixin = require('./utils/BemMixin');

var _BemMixin2 = _interopRequireDefault(_BemMixin);

var _WeekBand = require('./utils/WeekBand');

var _WeekBand2 = _interopRequireDefault(_WeekBand);

var _CustomPropTypes = require('./utils/CustomPropTypes');

var _CustomPropTypes2 = _interopRequireDefault(_CustomPropTypes);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _CalendarMonth = require('./calendar/CalendarMonth');

var _CalendarMonth2 = _interopRequireDefault(_CalendarMonth);

var _CalendarDate = require('./calendar/CalendarDate');

var _CalendarDate2 = _interopRequireDefault(_CalendarDate);

var _PaginationArrow = require('./PaginationArrow');

var _PaginationArrow2 = _interopRequireDefault(_PaginationArrow);

var _isMomentRange = require('./utils/isMomentRange');

var _isMomentRange2 = _interopRequireDefault(_isMomentRange);

var _hasUpdatedValue = require('./utils/hasUpdatedValue');

var _hasUpdatedValue2 = _interopRequireDefault(_hasUpdatedValue);

var _getYearMonth = require('./utils/getYearMonth');

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var absoluteMinimum = (0, _momentRange2.default)(new Date(-8640000000000000 / 2)).startOf('day');
var absoluteMaximum = (0, _momentRange2.default)(new Date(8640000000000000 / 2)).startOf('day');

function noop() {}

var DateRangePicker = (0, _createReactClass2.default)({
  mixins: [_BemMixin2.default, _reactAddonsPureRenderMixin2.default],
  displayName: "DateRangePicker",

  propTypes: {
    bemBlock: _propTypes2.default.string,
    bemNamespace: _propTypes2.default.string,
    className: _propTypes2.default.string,
    dateStates: _propTypes2.default.array, // an array of date ranges and their states
    defaultState: _propTypes2.default.string,
    disableNavigation: _propTypes2.default.bool,
    firstOfWeek: _propTypes2.default.oneOf([0, 1, 2, 3, 4, 5, 6]),
    helpMessage: _propTypes2.default.string,
    initialDate: _propTypes2.default.instanceOf(Date),
    initialFromValue: _propTypes2.default.bool,
    initialMonth: _propTypes2.default.number, // Overrides values derived from initialDate/initialRange
    initialRange: _propTypes2.default.object,
    initialYear: _propTypes2.default.number, // Overrides values derived from initialDate/initialRange
    locale: _propTypes2.default.string,
    maximumDate: _propTypes2.default.instanceOf(Date),
    minimumDate: _propTypes2.default.instanceOf(Date),
    numberOfCalendars: _propTypes2.default.number,
    onHighlightDate: _propTypes2.default.func, // triggered when a date is highlighted (hovered)
    onHighlightRange: _propTypes2.default.func, // triggered when a range is highlighted (hovered)
    onSelect: _propTypes2.default.func, // triggered when a date or range is selectec
    onSelectStart: _propTypes2.default.func, // triggered when the first date in a range is selected
    paginationArrowComponent: _propTypes2.default.func,
    selectedLabel: _propTypes2.default.string,
    selectionType: _propTypes2.default.oneOf(['single', 'range']),
    singleDateRange: _propTypes2.default.bool,
    weekBandingDateRange: _propTypes2.default.bool,
    weekBandingStartDayOfWeek: _propTypes2.default.number,
    showLegend: _propTypes2.default.bool,
    stateDefinitions: _propTypes2.default.object,
    value: _CustomPropTypes2.default.momentOrMomentRange
  },

  getDefaultProps: function getDefaultProps() {
    var date = new Date();
    var initialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    return {
      bemNamespace: null,
      bemBlock: 'DateRangePicker',
      className: '',
      numberOfCalendars: 1,
      firstOfWeek: 0,
      disableNavigation: false,
      nextLabel: '',
      previousLabel: '',
      initialDate: initialDate,
      initialFromValue: true,
      locale: (0, _momentRange2.default)().locale(),
      selectionType: 'range',
      singleDateRange: false,
      weekBandingDateRange: false,
      weekBandingStartDayOfWeek: 7,
      stateDefinitions: {
        '__default': {
          color: null,
          selectable: true,
          label: null
        }
      },
      selectedLabel: "Your selected dates",
      defaultState: '__default',
      dateStates: [],
      showLegend: false,
      onSelect: noop,
      paginationArrowComponent: _PaginationArrow2.default
    };
  },
  componentWillMount: function componentWillMount() {
    if (this.props.weekBandingDateRange) {
      _WeekBand2.default.setupWeekBandLocale(this.props.weekBandingStartDayOfWeek);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.weekBandingDateRange && this.props.weekBandingStartDayOfWeek !== nextProps.weekBandingStartDayOfWeek) {
      _WeekBand2.default.setupWeekBandLocale(nextProps.weekBandingStartDayOfWeek);
    }

    var nextDateStates = this.getDateStates(nextProps);
    var nextEnabledRange = this.getEnabledRange(nextProps);

    var updatedState = {
      selectedStartDate: null,
      hideSelection: false,
      dateStates: this.state.dateStates && _immutable2.default.is(this.state.dateStates, nextDateStates) ? this.state.dateStates : nextDateStates,
      enabledRange: this.state.enabledRange && this.state.enabledRange.isSame(nextEnabledRange) ? this.state.enabledRange : nextEnabledRange
    };

    if ((0, _hasUpdatedValue2.default)(this.props, nextProps)) {
      if (!nextProps.value || !this.isStartOrEndVisible(nextProps)) {
        var yearMonth = (0, _getYearMonth.getYearMonthProps)(nextProps);

        updatedState.year = yearMonth.year;
        updatedState.month = yearMonth.month;
      }
    }

    this.setState(updatedState);
  },
  getInitialState: function getInitialState() {
    var now = new Date();
    var _props = this.props,
        initialYear = _props.initialYear,
        initialMonth = _props.initialMonth,
        initialFromValue = _props.initialFromValue,
        value = _props.value;

    var year = now.getFullYear();
    var month = now.getMonth();

    if (Number.isInteger(initialYear) && Number.isInteger(initialMonth)) {
      year = initialYear;
      month = initialMonth;
    }

    if (initialFromValue && (_momentRange2.default.isMoment(value) || (0, _isMomentRange2.default)(value))) {
      var yearMonth = (0, _getYearMonth.getYearMonthProps)(this.props);
      month = yearMonth.month;
      year = yearMonth.year;
    }

    return {
      year: year,
      month: month,
      selectedStartDate: null,
      highlightedDate: null,
      highlightRange: null,
      hideSelection: false,
      enabledRange: this.getEnabledRange(this.props),
      dateStates: this.getDateStates(this.props)
    };
  },
  getEnabledRange: function getEnabledRange(props) {
    var min = props.minimumDate ? (0, _momentRange2.default)(props.minimumDate).startOf('day') : absoluteMinimum;
    var max = props.maximumDate ? (0, _momentRange2.default)(props.maximumDate).startOf('day') : absoluteMaximum;

    return _momentRange2.default.range(min, max);
  },
  getDateStates: function getDateStates(props) {
    var dateStates = props.dateStates,
        defaultState = props.defaultState,
        stateDefinitions = props.stateDefinitions;

    var actualStates = [];
    var minDate = absoluteMinimum;
    var maxDate = absoluteMaximum;
    var dateCursor = (0, _momentRange2.default)(minDate).startOf('day');

    var defs = _immutable2.default.fromJS(stateDefinitions);

    dateStates.forEach(function (s) {
      var r = s.range;
      var start = r.start.startOf('day');
      var end = r.end.startOf('day');

      if (!dateCursor.isSame(start, 'day')) {
        actualStates.push({
          state: defaultState,
          range: _momentRange2.default.range(dateCursor, start)
        });
      }
      actualStates.push(s);
      dateCursor = end;
    });

    actualStates.push({
      state: defaultState,
      range: _momentRange2.default.range(dateCursor, maxDate)
    });

    // sanitize date states
    return _immutable2.default.List(actualStates).map(function (s) {
      var def = defs.get(s.state);
      return _immutable2.default.Map({
        range: s.range,
        state: s.state,
        selectable: def.get('selectable', true),
        color: def.get('color')
      });
    });
  },
  isDateDisabled: function isDateDisabled(date) {
    return !this.state.enabledRange.contains(date);
  },
  isDateSelectable: function isDateSelectable(date) {
    return this.dateRangesForDate(date).some(function (r) {
      return r.get('selectable');
    });
  },
  nonSelectableStateRanges: function nonSelectableStateRanges() {
    return this.state.dateStates.filter(function (d) {
      return !d.get('selectable');
    });
  },
  dateRangesForDate: function dateRangesForDate(date) {
    return this.state.dateStates.filter(function (d) {
      return d.get('range').contains(date);
    });
  },
  sanitizeRange: function sanitizeRange(range, forwards) {
    /* Truncates the provided range at the first intersection
     * with a non-selectable state. Using forwards to determine
     * which direction to work
     */
    var blockedRanges = this.nonSelectableStateRanges().map(function (r) {
      return r.get('range');
    });
    var intersect = void 0;

    if (forwards) {
      intersect = blockedRanges.find(function (r) {
        return range.intersect(r);
      });
      if (intersect) {
        return _momentRange2.default.range(range.start, intersect.start);
      }
    } else {
      intersect = blockedRanges.findLast(function (r) {
        return range.intersect(r);
      });

      if (intersect) {
        return _momentRange2.default.range(intersect.end, range.end);
      }
    }

    if (range.start.isBefore(this.state.enabledRange.start)) {
      return _momentRange2.default.range(this.state.enabledRange.start, range.end);
    }

    if (range.end.isAfter(this.state.enabledRange.end)) {
      return _momentRange2.default.range(range.start, this.state.enabledRange.end);
    }

    return range;
  },
  highlightRange: function highlightRange(range) {
    this.setState({
      highlightedRange: range,
      highlightedDate: null
    });
    if (typeof this.props.onHighlightRange === 'function') {
      this.props.onHighlightRange(range, this.statesForRange(range));
    }
  },
  onUnHighlightDate: function onUnHighlightDate() {
    this.setState({
      highlightedDate: null
    });
  },
  onSelectDate: function onSelectDate(date) {
    var _props2 = this.props,
        selectionType = _props2.selectionType,
        weekBandingDateRange = _props2.weekBandingDateRange;
    var selectedStartDate = this.state.selectedStartDate;


    if (selectionType === 'range') {
      if (selectedStartDate) {
        this.completeRangeSelection();
      } else if (date && !this.isDateDisabled(date) && this.isDateSelectable(date)) {
        var originalDateSelection = date.clone();

        if (weekBandingDateRange) {
          date = _WeekBand2.default.shiftToWeekBand(date, 'startOf');
        }

        this.startRangeSelection(date);
        if (this.props.singleDateRange) {
          this.highlightRange(_momentRange2.default.range(date, date));
        }

        this.onHighlightDate(originalDateSelection);
      }
    } else {
      if (!this.isDateDisabled(date) && this.isDateSelectable(date)) {
        this.completeSelection();
      }
    }
  },
  onHighlightDate: function onHighlightDate(date) {
    var _props3 = this.props,
        selectionType = _props3.selectionType,
        weekBandingDateRange = _props3.weekBandingDateRange;
    var selectedStartDate = this.state.selectedStartDate;


    var datePair = void 0;
    var range = void 0;
    var forwards = void 0;

    if (selectionType === 'range') {
      if (selectedStartDate) {
        datePair = _immutable2.default.List.of(selectedStartDate, date).sortBy(function (d) {
          return d.unix();
        });
        range = _momentRange2.default.range(datePair.get(0), datePair.get(1));
        forwards = range.start.unix() === selectedStartDate.unix();

        if (weekBandingDateRange) {
          var _ref = forwards ? ['startOf', 'endOf'] : ['endOf', 'startOf'],
              _ref2 = _slicedToArray(_ref, 2),
              selectedDirection = _ref2[0],
              dateDirection = _ref2[1];

          selectedStartDate = _WeekBand2.default.shiftToWeekBand(selectedStartDate, selectedDirection);
          date = _WeekBand2.default.shiftToWeekBand(date, dateDirection);
          datePair = _immutable2.default.List.of(selectedStartDate, date).sortBy(function (d) {
            return d.unix();
          });
          range = _momentRange2.default.range(datePair.get(0), datePair.get(1));
        }

        range = this.sanitizeRange(range, forwards);
        this.highlightRange(range);
      } else if (!this.isDateDisabled(date) && this.isDateSelectable(date)) {
        this.highlightDate(date);
      }
    } else {
      if (!this.isDateDisabled(date) && this.isDateSelectable(date)) {
        this.highlightDate(date);
      }
    }
  },
  startRangeSelection: function startRangeSelection(date) {
    this.setState({
      hideSelection: true,
      selectedStartDate: date
    });
    if (typeof this.props.onSelectStart === 'function') {
      this.props.onSelectStart((0, _momentRange2.default)(date));
    }
  },
  statesForDate: function statesForDate(date) {
    return this.state.dateStates.filter(function (d) {
      return date.within(d.get('range'));
    }).map(function (d) {
      return d.get('state');
    });
  },
  statesForRange: function statesForRange(range) {
    if (range.start.isSame(range.end, 'day')) {
      return this.statesForDate(range.start);
    }
    return this.state.dateStates.filter(function (d) {
      return d.get('range').intersect(range);
    }).map(function (d) {
      return d.get('state');
    });
  },
  completeSelection: function completeSelection() {
    var highlightedDate = this.state.highlightedDate;
    if (highlightedDate) {
      this.setState({
        hideSelection: false,
        highlightedDate: null
      });
      this.props.onSelect(highlightedDate, this.statesForDate(highlightedDate));
    }
  },
  completeRangeSelection: function completeRangeSelection() {
    var range = this.state.highlightedRange;

    if (range && (!range.start.isSame(range.end, 'day') || this.props.singleDateRange)) {
      this.setState({
        selectedStartDate: null,
        highlightedRange: null,
        highlightedDate: null,
        hideSelection: false
      });
      this.props.onSelect(range, this.statesForRange(range));
    }
  },
  highlightDate: function highlightDate(date) {
    this.setState({
      highlightedDate: date
    });
    if (typeof this.props.onHighlightDate === 'function') {
      this.props.onHighlightDate(date, this.statesForDate(date));
    }
  },
  getMonthDate: function getMonthDate() {
    return (0, _momentRange2.default)(new Date(this.state.year, this.state.month, 1));
  },
  isStartOrEndVisible: function isStartOrEndVisible(props) {
    var _this = this;

    var value = props.value,
        selectionType = props.selectionType,
        numberOfCalendars = props.numberOfCalendars;


    var isVisible = function isVisible(date) {
      var yearMonth = (0, _getYearMonth.getYearMonth)(date);
      var isSameYear = yearMonth.year === _this.state.year;
      var isMonthVisible = yearMonth.month === _this.state.month || numberOfCalendars === 2 && yearMonth.month - 1 === _this.state.month;

      return isSameYear && isMonthVisible;
    };

    if (selectionType === 'single') {
      return isVisible(value);
    }

    return isVisible(value.start) || isVisible(value.end);
  },
  canMoveBack: function canMoveBack() {
    if (this.getMonthDate().subtract(1, 'days').isBefore(this.state.enabledRange.start)) {
      return false;
    }
    return true;
  },
  moveBack: function moveBack() {
    var monthDate = void 0;

    if (this.canMoveBack()) {
      monthDate = this.getMonthDate();
      monthDate.subtract(1, 'months');
      this.setState((0, _getYearMonth.getYearMonth)(monthDate));
    }
  },
  canMoveForward: function canMoveForward() {
    if (this.getMonthDate().add(this.props.numberOfCalendars, 'months').isAfter(this.state.enabledRange.end)) {
      return false;
    }
    return true;
  },
  moveForward: function moveForward() {
    var monthDate = void 0;

    if (this.canMoveForward()) {
      monthDate = this.getMonthDate();
      monthDate.add(1, 'months');
      this.setState((0, _getYearMonth.getYearMonth)(monthDate));
    }
  },
  changeYear: function changeYear(year) {
    var _state = this.state,
        enabledRange = _state.enabledRange,
        month = _state.month;


    if ((0, _momentRange2.default)({ years: year, months: month, date: 1 }).unix() < enabledRange.start.unix()) {
      month = enabledRange.start.month();
    }

    if ((0, _momentRange2.default)({ years: year, months: month + 1, date: 1 }).unix() > enabledRange.end.unix()) {
      month = enabledRange.end.month();
    }

    this.setState({
      year: year,
      month: month
    });
  },
  changeMonth: function changeMonth(date) {
    this.setState({
      month: date
    });
  },
  rangesOverlap: function rangesOverlap(rangeA, rangeB) {
    if (rangeA.overlaps(rangeB) || rangeA.contains(rangeB.start) || rangeA.contains(rangeB.end)) {
      return true;
    }
    return false;
  },
  renderCalendar: function renderCalendar(index) {
    var _props4 = this.props,
        bemBlock = _props4.bemBlock,
        bemNamespace = _props4.bemNamespace,
        firstOfWeek = _props4.firstOfWeek,
        numberOfCalendars = _props4.numberOfCalendars,
        selectionType = _props4.selectionType,
        weekBandingDateRange = _props4.weekBandingDateRange,
        value = _props4.value;
    var _state2 = this.state,
        dateStates = _state2.dateStates,
        enabledRange = _state2.enabledRange,
        hideSelection = _state2.hideSelection,
        highlightedDate = _state2.highlightedDate,
        highlightedRange = _state2.highlightedRange;

    var monthDate = this.getMonthDate();
    var year = monthDate.year();
    var month = monthDate.month();
    var key = index + '-' + year + '-' + month;
    var props = void 0;

    monthDate.add(index, 'months');

    var cal = new _calendar2.default.Calendar(firstOfWeek);
    var monthDates = _immutable2.default.fromJS(cal.monthDates(monthDate.year(), monthDate.month()));
    var monthStart = monthDates.first().first();
    var monthEnd = monthDates.last().last();
    var monthRange = _momentRange2.default.range(monthStart, monthEnd);

    if (_momentRange2.default.isMoment(value) && !monthRange.contains(value)) {
      value = null;
    } else if ((0, _isMomentRange2.default)(value) && !this.rangesOverlap(monthRange, value)) {
      value = null;
    }

    if (!_momentRange2.default.isMoment(highlightedDate) || !monthRange.contains(highlightedDate)) {
      highlightedDate = null;
    }

    if (!(0, _isMomentRange2.default)(highlightedRange) || !this.rangesOverlap(monthRange, highlightedRange)) {
      highlightedRange = null;
    }

    props = {
      bemBlock: bemBlock,
      bemNamespace: bemNamespace,
      dateStates: dateStates,
      enabledRange: enabledRange,
      firstOfWeek: firstOfWeek,
      hideSelection: hideSelection,
      highlightedDate: highlightedDate,
      highlightedRange: highlightedRange,
      index: index,
      key: key,
      selectionType: selectionType,
      weekBandingDateRange: weekBandingDateRange,
      value: value,
      maxIndex: numberOfCalendars - 1,
      firstOfMonth: monthDate,
      onMonthChange: this.changeMonth,
      onYearChange: this.changeYear,
      onSelectDate: this.onSelectDate,
      onHighlightDate: this.onHighlightDate,
      onUnHighlightDate: this.onUnHighlightDate,
      dateRangesForDate: this.dateRangesForDate,
      dateComponent: _CalendarDate2.default,
      locale: this.props.locale
    };

    return _react2.default.createElement(_CalendarMonth2.default, props);
  },


  render: function render() {
    var _props5 = this.props,
        PaginationArrowComponent = _props5.paginationArrowComponent,
        className = _props5.className,
        numberOfCalendars = _props5.numberOfCalendars,
        stateDefinitions = _props5.stateDefinitions,
        selectedLabel = _props5.selectedLabel,
        showLegend = _props5.showLegend,
        helpMessage = _props5.helpMessage;


    var calendars = _immutable2.default.Range(0, numberOfCalendars).map(this.renderCalendar);
    className = this.cx({ element: null }) + ' ' + className;

    return _react2.default.createElement(
      'div',
      { className: className.trim() },
      _react2.default.createElement(PaginationArrowComponent, { direction: 'previous', onTrigger: this.moveBack, disabled: !this.canMoveBack() }),
      calendars.toJS(),
      _react2.default.createElement(PaginationArrowComponent, { direction: 'next', onTrigger: this.moveForward, disabled: !this.canMoveForward() }),
      helpMessage ? _react2.default.createElement(
        'span',
        { className: this.cx({ element: 'HelpMessage' }) },
        helpMessage
      ) : null,
      showLegend ? _react2.default.createElement(_Legend2.default, { stateDefinitions: stateDefinitions, selectedLabel: selectedLabel }) : null
    );
  }
});

exports.default = DateRangePicker;