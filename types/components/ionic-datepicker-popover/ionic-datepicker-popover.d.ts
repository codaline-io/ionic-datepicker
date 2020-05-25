export declare class IonicDatepickerPopover {
    picker: any;
    private el;
    /**
     * Flag if datepicking is disabled
     * Default: disabled
     */
    disabled: boolean;
    setDisabled(newValue: boolean): void;
    /**
     * Options for the js-datepicker
     * Default: {}
     */
    pickerOptions: object;
    /**
     * selected default date as iso date|datetime string
     * Default: today
     */
    selectedDate?: string;
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
    componentDidLoad(): void;
    onSelect(instance: {
        dateSelected?: Date;
    }): Promise<void>;
    render(): any;
}
