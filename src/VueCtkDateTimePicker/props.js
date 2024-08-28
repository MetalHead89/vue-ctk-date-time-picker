import { getDefaultLocale } from './utils'

export default {
  value: { type: [String, Object], default: null },
  label: { type: String, default: 'Select date & time' },
  noLabel: { type: Boolean, default: false },
  hint: { type: String, default: null },
  error: { type: Boolean, default: null },
  color: { type: String, default: 'dodgerblue' },
  buttonColor: { type: String, default: null },
  dark: { type: Boolean, default: false },
  overlay: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  position: { type: String, default: null },
  locale: { type: String, default: getDefaultLocale() },
  formatted: { type: String, default: 'llll' },
  format: { type: String, default: 'YYYY-MM-DD hh:mm a' },
  outputFormat: { type: String, default: null },
  minuteInterval: { type: [String, Number], default: 1 },
  minDate: { type: String, default: null },
  maxDate: { type: String, default: null },
  autoClose: { type: Boolean, default: false },
  onlyTime: { type: Boolean, default: false },
  onlyDate: { type: Boolean, default: false },
  noHeader: { type: Boolean, default: false },
  range: { type: Boolean, default: false },
  noWeekendsDays: { type: Boolean, default: false },
  disabledWeekly: { type: Array, default: () => ([]) },
  noShortcuts: { type: Boolean, default: false },
  noButton: { type: Boolean, default: false },
  disabledDates: { type: Array, default: () => ([]) },
  disabledHours: { type: Array, default: () => ([]) },
  enabledDates: { type: Array, default: () => ([]) },
  open: { type: Boolean, default: false },
  persistent: { type: Boolean, default: false },
  inputSize: { type: String, default: null },
  buttonNowTranslation: { type: String, default: null },
  noButtonNow: { type: Boolean, default: false },
  noButtonValidate: { type: Boolean, default: false },
  firstDayOfWeek: { type: Number, default: null },
  shortcut: { type: String, default: null },
  customShortcuts: {
    type: Array,
    default: () => ([
      { key: 'thisWeek', label: 'This week', value: 'isoWeek' },
      { key: 'lastWeek', label: 'Last week', value: '-isoWeek' },
      { key: 'last7Days', label: 'Last 7 days', value: 7 },
      { key: 'last30Days', label: 'Last 30 days', value: 30 },
      { key: 'thisMonth', label: 'This month', value: 'month' },
      { key: 'lastMonth', label: 'Last month', value: '-month' },
      { key: 'thisYear', label: 'This year', value: 'year' },
      { key: 'lastYear', label: 'Last year', value: '-year' }
    ])
  },
  noValueToCustomElem: { type: Boolean, default: false },
  behaviour: { type: Object, default: () => ({}) },
  noKeyboard: { type: Boolean, default: false },
  right: { type: Boolean, default: false },
  noClearButton: { type: Boolean, default: false },
  defaultDate: { type: String, default: null }
}
