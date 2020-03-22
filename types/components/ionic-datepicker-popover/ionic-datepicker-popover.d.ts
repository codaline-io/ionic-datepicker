export declare class IonicDatepickerPopover {
    private picker;
    private el;
    /**
     * Flag if datepicking is disabled
     * Default: disabled
     */
    disabled: boolean;
    setDisabled(_prev: boolean, current: boolean): void;
    /**
     * Options for the js-datepicker
     * Default: {}
     */
    pickerOptions: object;
    /**
     * selected default date as iso date|datetime string
     * Default: today
     */
    selectedDate: any;
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
    componentDidLoad(): void;
    render(): any;
}
