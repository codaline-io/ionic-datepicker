import { PopoverOptions } from '@ionic/core';
import { EventEmitter } from '../../stencil-public-runtime';
export declare class IonicDatepicker {
    /**
     * How the date should be formatted for display purposes
     * Default: "DDD"
     */
    displayFormat: string;
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
    /**
     * placeholder if not required and empty
     * Default: Datum
     */
    placeholder: string;
    /**
     * nativeOnMobile if native date picker is used on mobile devices
     * Default: false
     */
    nativeOnMobile: boolean;
    /**
     * Max selectable date as iso date|datetime string
     * Default: today + 100 years
     */
    max: any;
    /**
     * Min selectable date as iso date|datetime string
     * Default: today - 100 years
     */
    min: any;
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
     * Change popover options, PopoverOptions | {}
     * Default: {}
     */
    popoverOptions: PopoverOptions | {};
    /**
     * Possibility to overwrite the error css class
     * Default: 'ionic-datepicker-error'
     */
    errorClass: string;
    /**
     * Event that emits the iso date string everytime the date changes
     */
    changes: EventEmitter<string>;
    /**
     * Stores the current selected date as formatted string for display purposes
     */
    formattedDate: string;
    date: any;
    private isDesktop;
    constructor();
    componentWillLoad(): void;
    handleInput(ev: InputEvent): void;
    handleDateClick(event: MouseEvent): Promise<void>;
    render(): any;
}
