export declare const MONTH_NAMES: string[];
export declare const MONTH_SHORT_NAMES: string[];
export declare const DAY_NAMES: string[];
export declare const DAY_SHORT_NAMES: string[];
export declare const DEFAULT_OKAY_LABEL = "Okay";
export declare const DEFAULT_CANCEL_LABEL = "Abbrechen";
export declare const DEFAULT_YEAR_LABEL = "Jahr";
export declare const DEFAULT_MAX: () => string;
export declare const DEFAULT_MIN: () => string;
/**
 * Gets a date value given a format
 * Defaults to the current date if
 * no date given
 */
export declare const renderDatetime: (template: string, dateString: string, locale: LocaleData) => string;
export declare const toISODate: (dateString: string) => string;
interface LocaleData {
    monthNames?: string[];
    monthShortNames?: string[];
    dayNames?: string[];
    dayShortNames?: string[];
}
export {};
