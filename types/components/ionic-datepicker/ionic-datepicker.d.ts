import { PopoverOptions, Mode } from '@ionic/core';
import { EventEmitter } from '../../stencil-public-runtime';
export declare class IonicDatepicker {
    /**
     * How the date should be formatted for ion-datetime for display purposes (https://ionicframework.com/docs/api/datetime/#display-and-picker-formats)
     * Default: "DD. MMMM YYYY"
     */
    displayFormat: string;
    /**
     * How the date should be formatted for ion-datetime  for display purposes (https://ionicframework.com/docs/api/datetime/#display-and-picker-formats)
     * Default: "DD. MMMM YYYY"
     */
    pickerFormat: string;
    /**
     * Flag if datepicking is disabled
     * Default: disabled
     */
    disabled: boolean;
    /**
     * Options for the js-datepicker
     * Default: {}
     */
    pickerOptions: object;
    /**
     * default date as iso date|datetime string
     * Default: today when required
     */
    defaultDate?: string;
    updateDateState(next: any): void;
    /**
     * placeholder if not required and empty
     * Default: Datum
     */
    placeholder: string;
    /**
     * ionDateTimeOnMobile if ion datetime picker is used on mobile devices
     * Default: false
     */
    ionDateTimeOnMobile: boolean;
    /**
     * Max selectable date as iso date|datetime string
     * Default: today + 100 years
     */
    max: string;
    /**
     * Min selectable date as iso date|datetime string
     * Default: today - 100 years
     */
    min: string;
    /**
     * Required input
     * Default: false
     */
    required: boolean;
    /**
     * Flag if it should be marked as error
     * Default: false
     */
    error: boolean;
    /**
     * Change ionic popover options, Omit<PopoverOptions, 'mode' | 'component' | 'componentProps'>
     * Default: {}
     */
    ionPopoverOptions: Omit<PopoverOptions, 'mode' | 'component' | 'componentProps'>;
    /**
     * Changes the mode of ion-popover and ion-datetime>
     * Default: undefined
     */
    mode?: Mode;
    /**
     * Possibility to overwrite the error css class
     * Default: 'ionic-datepicker-error'
     */
    errorClass: string;
    /**
     * Possibility to overwrite month names
     * Default: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
     */
    monthNames: string[];
    /**
     * Possibility to overwrite month shortnames
     * Default: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
     */
    monthShortNames: string[];
    /**
     * Possibility to overwrite day names
     * Default: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
     */
    dayNames: string[];
    /**
     * Possibility to overwrite day shortnames
     * Default: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
     */
    dayShortNames: string[];
    /**
     * Set okay label
     * Default: 'Okay'
     */
    okayLabel: string;
    /**
     * Set cancel label
     * Default: 'Abbrechen'
     */
    cancelLabel: string;
    /**
     * Set year label
     * Default: 'Jahr'
     */
    yearLabel: string;
    /**
     * Event that emits the iso date string everytime the date changes
     */
    changes: EventEmitter<string>;
    /**
     * Event that emits when the component gets the focus
     */
    focused: EventEmitter<void>;
    /**
     * Event that emits when the component loses the focus and gets blurred
     */
    blurred: EventEmitter<void>;
    /**
     * Stores the current selected date as iso string
     */
    date: string;
    isDesktop: boolean;
    popover?: HTMLIonPopoverElement;
    buttonRef: HTMLButtonElement | null;
    ionDatetimeRef: HTMLIonDatetimeElement | null;
    /**
     * Programmatically open the picker
     */
    open(): Promise<void>;
    constructor();
    componentWillLoad(): void;
    handleFocus(): void;
    handleBlur(): void;
    formatDate(date: string): string;
    handleInput(ev: CustomEvent<{
        value: string;
    }>): void;
    handleDateClick(event: MouseEvent): Promise<void>;
    render(): any;
}
