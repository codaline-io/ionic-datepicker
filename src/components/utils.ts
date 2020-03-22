export const MONTH_NAMES = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
export const MONTH_SHORT_NAMES = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
export const DAY_NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
export const DAY_SHORT_NAMES = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

export const DEFAULT_OKAY_LABEL = 'Okay';
export const DEFAULT_CANCEL_LABEL = 'Abbrechen';
export const DEFAULT_YEAR_LABEL = 'Jahr';

export const DEFAULT_MAX = () => new Date(new Date().setFullYear(new Date().getFullYear() + 100)).toISOString();
export const DEFAULT_MIN = () => new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString();
/**
 * Gets a date value given a format
 * Defaults to the current date if
 * no date given
 */

export const renderDatetime = (template: string, dateString: string | undefined, locale: LocaleData): string | undefined => {
  if (dateString === undefined) {
    return undefined;
  }

  const value = parseDate(dateString)

  const tokens: string[] = [];
  let hasText = false;
  FORMAT_KEYS.forEach((format, index) => {
    if (template.indexOf(format.f) > -1) {
      const token = '{' + index + '}';
      const text = renderTextFormat(format.f, (value as any)[format.k], value, locale);

      if (!hasText && text !== undefined && (value as any)[format.k] != null) {
        hasText = true;
      }

      tokens.push(token, text || '');

      template = template.replace(format.f, token);
    }
  });

  if (!hasText) {
    return undefined;
  }

  for (let i = 0; i < tokens.length; i += 2) {
    template = template.replace(tokens[i], tokens[i + 1]);
  }

  return template;
};

const renderTextFormat = (format: string, value: any, date: DatetimeData | undefined, locale: LocaleData): string | undefined => {
  if ((format === FORMAT_DDDD || format === FORMAT_DDD)) {
    try {
      value = (new Date(date!.year!, date!.month! - 1, date!.day)).getDay();

      if (format === FORMAT_DDDD) {
        return (locale.dayNames ? locale.dayNames : DAY_NAMES)[value];
      }

      return (locale.dayShortNames ? locale.dayShortNames : DAY_SHORT_NAMES)[value];

    } catch (e) {
      // ignore
    }

    return undefined;
  }

  if (format === FORMAT_A) {
    return date !== undefined && date.hour !== undefined
      ? (date.hour < 12 ? 'AM' : 'PM')
      : value ? value.toUpperCase() : '';
  }

  if (format === FORMAT_a) {
    return date !== undefined && date.hour !== undefined
      ? (date.hour < 12 ? 'am' : 'pm')
      : value || '';
  }

  if (value == null) {
    return '';
  }

  if (format === FORMAT_YY || format === FORMAT_MM ||
    format === FORMAT_DD || format === FORMAT_HH ||
    format === FORMAT_mm || format === FORMAT_ss) {
    return twoDigit(value);
  }

  if (format === FORMAT_YYYY) {
    return fourDigit(value);
  }

  if (format === FORMAT_MMMM) {
    return (locale.monthNames ? locale.monthNames : MONTH_NAMES)[value - 1];
  }

  if (format === FORMAT_MMM) {
    return (locale.monthShortNames ? locale.monthShortNames : MONTH_SHORT_NAMES)[value - 1];
  }

  if (format === FORMAT_hh || format === FORMAT_h) {
    if (value === 0) {
      return '12';
    }
    if (value > 12) {
      value -= 12;
    }
    if (format === FORMAT_hh && value < 10) {
      return ('0' + value);
    }
  }

  return value.toString();
};

const ISO_8601_REGEXP = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;
const TIME_REGEXP = /^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/;

const twoDigit = (val: number | undefined): string => {
  return ('0' + (val !== undefined ? Math.abs(val) : '0')).slice(-2);
};

const fourDigit = (val: number | undefined): string => {
  return ('000' + (val !== undefined ? Math.abs(val) : '0')).slice(-4);
};

const parseDate = (val: string | undefined | null): DatetimeData | undefined => {
  // manually parse IS0 cuz Date.parse cannot be trusted
  // ISO 8601 format: 1994-12-15T13:47:20Z
  let parse: any[] | null = null;

  if (val != null && val !== '') {
    // try parsing for just time first, HH:MM
    parse = TIME_REGEXP.exec(val);
    if (parse) {
      // adjust the array so it fits nicely with the datetime parse
      parse.unshift(undefined, undefined);
      parse[2] = parse[3] = undefined;

    } else {
      // try parsing for full ISO datetime
      parse = ISO_8601_REGEXP.exec(val);
    }
  }

  if (parse === null) {
    // wasn't able to parse the ISO datetime
    return undefined;
  }

  // ensure all the parse values exist with at least 0
  for (let i = 1; i < 8; i++) {
    parse[i] = parse[i] !== undefined ? parseInt(parse[i], 10) : undefined;
  }

  let tzOffset = 0;
  if (parse[9] && parse[10]) {
    // hours
    tzOffset = parseInt(parse[10], 10) * 60;
    if (parse[11]) {
      // minutes
      tzOffset += parseInt(parse[11], 10);
    }
    if (parse[9] === '-') {
      // + or -
      tzOffset *= -1;
    }
  }

  return {
    year: parse[1],
    month: parse[2],
    day: parse[3],
    hour: parse[4],
    minute: parse[5],
    second: parse[6],
    millisecond: parse[7],
    tzOffset,
  };
};

export const toISODate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
};

interface DatetimeData {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
  tzOffset?: number;
}

interface LocaleData {
  monthNames?: string[];
  monthShortNames?: string[];
  dayNames?: string[];
  dayShortNames?: string[];
}

const FORMAT_YYYY = 'YYYY';
const FORMAT_YY = 'YY';
const FORMAT_MMMM = 'MMMM';
const FORMAT_MMM = 'MMM';
const FORMAT_MM = 'MM';
const FORMAT_M = 'M';
const FORMAT_DDDD = 'DDDD';
const FORMAT_DDD = 'DDD';
const FORMAT_DD = 'DD';
const FORMAT_D = 'D';
const FORMAT_HH = 'HH';
const FORMAT_H = 'H';
const FORMAT_hh = 'hh';
const FORMAT_h = 'h';
const FORMAT_mm = 'mm';
const FORMAT_m = 'm';
const FORMAT_ss = 'ss';
const FORMAT_s = 's';
const FORMAT_A = 'A';
const FORMAT_a = 'a';

const FORMAT_KEYS = [
  { f: FORMAT_YYYY, k: 'year' },
  { f: FORMAT_MMMM, k: 'month' },
  { f: FORMAT_DDDD, k: 'day' },
  { f: FORMAT_MMM, k: 'month' },
  { f: FORMAT_DDD, k: 'day' },
  { f: FORMAT_YY, k: 'year' },
  { f: FORMAT_MM, k: 'month' },
  { f: FORMAT_DD, k: 'day' },
  { f: FORMAT_HH, k: 'hour' },
  { f: FORMAT_hh, k: 'hour' },
  { f: FORMAT_mm, k: 'minute' },
  { f: FORMAT_ss, k: 'second' },
  { f: FORMAT_M, k: 'month' },
  { f: FORMAT_D, k: 'day' },
  { f: FORMAT_H, k: 'hour' },
  { f: FORMAT_h, k: 'hour' },
  { f: FORMAT_m, k: 'minute' },
  { f: FORMAT_s, k: 'second' },
  { f: FORMAT_A, k: 'ampm' },
  { f: FORMAT_a, k: 'ampm' },
];
