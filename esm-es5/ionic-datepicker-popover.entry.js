import { r as registerInstance, h } from './index-f3e464ac.js';

const variablesCss = ":root,:host{--base-spacing:var(--ion-padding, 16px);--base-spacing-small:calc(var(--base-spacing) * 0.7);--base-spacing-large:calc(var(--base-spacing) * 1.5);--font-size-base:14px;--font-size-small:calc(var(--font-size-base) * 0.9);--font-size-medium:calc(var(--font-size-base) * 1.2);--font-size-large:calc(var(--font-size-base) * 1.4);--text-color:var(--ion-text-color, #424242);--error-color:var(--ion-color-danger, #eb445a);--popover-width:250px;--square-dimension:33px;--square-border-radius:5px;--square-font-weight:normal;--square-hover-color:var(--ion-color-white, #fff);--square-hover-background:var(--ion-color-secondary, #3dc2ff);--controls-padding:5px;--controls-background:var(--ion-color-white, #fff);--square-active-color:var(--ion-color-white, #fff);--square-active-background:var(--ion-color-primary, #3880ff);--square-current-color:var(--ion-color-white, #fff);--square-current-background:var(--ion-color-medium, #92949c)}";

const ionicDatepickerPopoverCss = variablesCss + "ion-popover.datepicker-popover,ion-popover.sc-ion-popover-md-h.datepicker-popover{--width:var(--popover-width);--max-width:var(--popover-width);--min-width:var(--popover-width)}ionic-datepicker-popover .qs-datepicker-container{border:0;border-radius:0;margin-top:0;-webkit-box-shadow:none;box-shadow:none;position:relative}ionic-datepicker-popover .qs-datepicker .qs-controls{background-color:var(--controls-background);padding:var(--controls-padding)}ionic-datepicker-popover .qs-datepicker .qs-squares{-ms-flex-pack:center;justify-content:center}ionic-datepicker-popover .qs-datepicker .qs-square{border-radius:var(--square-border-radius);height:var(--square-dimension);width:var(--square-dimension)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-day{font-weight:var(--square-font-weight)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-current.qs-active,ionic-datepicker-popover .qs-datepicker .qs-square.qs-active{background-color:var(--square-active-background);color:var(--square-active-color)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-current{background-color:var(--square-current-background);color:var(--square-current-color)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-current .qs-num{text-decoration:none}ionic-datepicker-popover .qs-datepicker .qs-square:not(.qs-empty):not(.qs-disabled):not(.qs-day):not(.qs-active):hover{background-color:var(--square-hover-background);color:var(--square-hover-color)}ionic-datepicker-popover .qs-datepicker .qs-overlay .qs-submit{background:transparent;padding:calc(var(--base-spacing-small) * .5) var(--base-spacing)}ionic-datepicker-popover .qs-datepicker .qs-overlay .qs-overlay-year{font-size:var(--font-size-small);width:auto}ionic-datepicker-popover .qs-datepicker .qs-overlay .qs-close{font-size:var(--font-size-base);padding-right:var(--base-spacing)}";

const DateTime = window.luxon.DateTime;
const IonicDatepickerPopover = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
         * selected default date as iso date|datetime string
         * Default: today
         */
        this.selectedDate = DateTime.local().toISODate();
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
    }
    setDisabled(_prev, current) {
        if (this.picker) {
            this.picker.disabled = current;
        }
    }
    componentDidLoad() {
        this.picker = window.datepicker(this.el, Object.assign({
            alwaysShow: true,
            customDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            customMonths: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            customOverlayMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            dateSelected: this.selectedDate ? new Date(this.selectedDate) : new Date(),
            maxDate: new Date(this.max),
            minDate: new Date(this.min),
            onSelect: (instance) => {
                document.querySelector('ion-popover').dismiss({ date: instance.dateSelected.toISOString() });
            },
            overlayButton: 'Okay',
            overlayPlaceholder: 'Jahr',
            showAllDates: true,
            startDay: 1
        }, this.pickerOptions));
        this.picker.disabled = this.disabled;
    }
    render() {
        return h("div", null, h("div", { class: 'container', ref: (ref) => this.el = ref }));
    }
    static get watchers() { return {
        "disabled": ["setDisabled"]
    }; }
};
IonicDatepickerPopover.style = ionicDatepickerPopoverCss;

export { IonicDatepickerPopover as ionic_datepicker_popover };
