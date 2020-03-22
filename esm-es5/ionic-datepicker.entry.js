import { r as registerInstance, c as createEvent, h, H as Host } from './index-f3e464ac.js';

const variablesCss = ":root,:host{--base-spacing:var(--ion-padding, 16px);--base-spacing-small:calc(var(--base-spacing) * 0.7);--base-spacing-large:calc(var(--base-spacing) * 1.5);--font-size-base:14px;--font-size-small:calc(var(--font-size-base) * 0.9);--font-size-medium:calc(var(--font-size-base) * 1.2);--font-size-large:calc(var(--font-size-base) * 1.4);--text-color:var(--ion-text-color, #424242);--error-color:var(--ion-color-danger, #eb445a);--popover-width:250px;--square-dimension:33px;--square-border-radius:5px;--square-font-weight:normal;--square-hover-color:var(--ion-color-white, #fff);--square-hover-background:var(--ion-color-secondary, #3dc2ff);--controls-padding:5px;--controls-background:var(--ion-color-white, #fff);--square-active-color:var(--ion-color-white, #fff);--square-active-background:var(--ion-color-primary, #3880ff);--square-current-color:var(--ion-color-white, #fff);--square-current-background:var(--ion-color-medium, #92949c)}";

const ionicDatepickerCss = variablesCss + "span{cursor:pointer}:host{padding-right:var(--base-spacing-small)}input{border:0}span.placeholder{font-style:italic}span.disabled,input[disabled],:host.disabled{cursor:not-allowed;background:transparent;opacity:.3}span.ionic-datepicker-error{color:var(--error-color)}";

const DateTime = window.luxon.DateTime;
const isDesktop = () => !(window.matchMedia('(any-pointer:coarse)').matches);
const IonicDatepicker = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * How the date should be formatted for display purposes
         * Default: "DDD"
         */
        this.displayFormat = 'DDD';
        /**
         * Flag if datepicking is disabled
         * Default: disabled
         */
        this.disabled = false;
        /**
         * Options for the js-datepicker
         * Default: {}
         */
        this.pickerOptions = {};
        /**
         * placeholder if not required and empty
         * Default: Datum
         */
        this.placeholder = 'Datum';
        /**
         * nativeOnMobile if native date picker is used on mobile devices
         * Default: false
         */
        this.nativeOnMobile = false;
        /**
         * Max selectable date as iso date|datetime string
         * Default: today + 100 years
         */
        this.max = DateTime.local().plus({ years: 100 }).toISODate();
        /**
         * Min selectable date as iso date|datetime string
         * Default: today - 100 years
         */
        this.min = DateTime.local().minus({ years: 100 }).toISODate();
        /**
         * Required input
         * Default: false
         */
        this.required = false;
        /**
         * Flag if it should be marked as error
         * Default: false
         */
        this.error = false;
        /**
         * Change ionic popover options, PopoverOptions | {}
         * Default: {}
         */
        this.popoverOptions = {};
        /**
         * Possibility to overwrite the error css class
         * Default: 'ionic-datepicker-error'
         */
        this.errorClass = 'ionic-datepicker-error';
        /**
         * Stores the current selected date as formatted string for display purposes
         */
        this.formattedDate = '';
        this.isDesktop = isDesktop();
        this.handleDateClick = this.handleDateClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.changes = createEvent(this, "changes", 7);
    }
    componentWillLoad() {
        if (this.required) {
            if (!this.defaultDate || !this.defaultDate.trim()) {
                this.defaultDate = DateTime.local().toISODate();
            }
        }
        if (this.defaultDate) {
            this.date = DateTime.fromISO(this.defaultDate);
            this.formattedDate = this.date.toFormat(this.displayFormat);
        }
    }
    handleInput(ev) {
        if (this.disabled) {
            this.date = DateTime.fromISO(ev.target.value);
            this.formattedDate = this.date.toFormat(this.displayFormat);
            this.changes.emit(this.date.toISODate());
        }
    }
    async handleDateClick(event) {
        if (this.disabled) {
            return;
        }
        const popover = Object.assign(document.createElement('ion-popover'), Object.assign(Object.assign({}, this.popoverOptions), { component: 'ionic-datepicker-popover', componentProps: {
                selectedDate: this.date ? this.date.toISODate() : null,
                disabled: this.disabled,
                displayFormat: this.displayFormat,
                max: this.max,
                min: this.min,
                pickerOptions: this.pickerOptions
            }, cssClass: 'datepicker-popover', event: event }));
        document.body.appendChild(popover);
        await popover.present();
        const { data } = await popover.onWillDismiss();
        if (data && data.date) {
            this.date = DateTime.fromISO(data.date);
            this.formattedDate = this.date.toFormat(this.displayFormat);
            const dateString = this.date.toFormat('yyyy-LL-dd');
            this.changes.emit(dateString);
        }
    }
    render() {
        const disabledClassName = this.disabled ? 'disabled' : '';
        const placeholderClassName = !this.formattedDate ? 'placeholder' : '';
        const errorClassName = this.error && !!this.errorClass ? this.errorClass : '';
        return h(Host, null, (this.isDesktop || !this.nativeOnMobile) && h("span", { onClick: this.handleDateClick, class: `${disabledClassName} ${errorClassName} ${placeholderClassName}` }, this.formattedDate || this.placeholder), !this.isDesktop && this.nativeOnMobile && h("input", { type: 'date', disabled: this.disabled, class: `${disabledClassName} ${errorClassName}`, placeholder: this.placeholder, onInput: this.handleInput, max: this.max, min: this.min, required: this.required, value: this.date ? this.date.toISODate() : '' }));
    }
};
IonicDatepicker.style = ionicDatepickerCss;

export { IonicDatepicker as ionic_datepicker };
