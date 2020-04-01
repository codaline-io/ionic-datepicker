var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host } from './index-5b81d7b4.js';
import { D as DEFAULT_MAX, a as DEFAULT_MIN, M as MONTH_NAMES, b as MONTH_SHORT_NAMES, c as DAY_NAMES, d as DAY_SHORT_NAMES, e as DEFAULT_OKAY_LABEL, f as DEFAULT_CANCEL_LABEL, g as DEFAULT_YEAR_LABEL, r as renderDatetime } from './utils-f44cc100.js';
var variablesCss = ":root,:host{--base-spacing:var(--ion-padding, 16px);--base-spacing-small:calc(var(--base-spacing) * 0.7);--base-spacing-large:calc(var(--base-spacing) * 1.5);--font-size-base:14px;--font-size-small:calc(var(--font-size-base) * 0.9);--font-size-medium:calc(var(--font-size-base) * 1.2);--font-size-large:calc(var(--font-size-base) * 1.4);--text-color:var(--ion-text-color, #424242);--error-color:var(--ion-color-danger, #eb445a);--placeholder-color:var(--ion-placeholder-color, var(--ion-color-step-400, #999));--popover-width:250px;--squares-padding:5px;--square-dimension:33px;--square-border-radius:5px;--square-font-weight:normal;--square-hover-color:#fff;--square-hover-background:var(--ion-color-secondary, #3dc2ff);--controls-padding:5px;--controls-background:#fff;--square-active-color:#fff;--square-active-background:var(--ion-color-primary, #3880ff);--square-current-color:#fff;--square-current-background:var(--ion-color-medium, #92949c);--overlay-background:rgba(255, 255, 255, .8);--overlay-text-color:var(--text-color)}";
var ionicDatepickerCss = variablesCss + ":host{position:relative}span,button.hidden-button{padding-right:var(--base-spacing-small)}span.placeholder{color:var(--placeholder-color)}span.ionic-datepicker-error{color:var(--error-color)}button.hidden-button{position:absolute;cursor:pointer;left:0;top:0;width:100%;height:100%;background:transparent;border:0;outline:none}button.hidden-button:active,button.hidden-button:focus,button.hidden-button::-moz-focus-inner{border:0;outline:none}span.disabled,button.hidden-button.disabled{cursor:not-allowed;background:transparent;opacity:.3}";
var isDesktop = function () { return !(window.matchMedia('(any-pointer:coarse)').matches); };
var IonicDatepicker = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        /**
         * How the date should be formatted for ion-datetime for display purposes (https://ionicframework.com/docs/api/datetime/#display-and-picker-formats)
         * Default: "DD. MMMM YYYY"
         */
        this.displayFormat = 'DD. MMMM YYYY';
        /**
         * How the date should be formatted for ion-datetime  for display purposes (https://ionicframework.com/docs/api/datetime/#display-and-picker-formats)
         * Default: "DD. MMMM YYYY"
         */
        this.pickerFormat = 'DD. MMMM YYYY';
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
        this.placeholder = 'Datum auswählen';
        /**
         * ionDateTimeOnMobile if ion datetime picker is used on mobile devices
         * Default: false
         */
        this.ionDateTimeOnMobile = false;
        /**
         * Max selectable date as iso date|datetime string
         * Default: today + 100 years
         */
        this.max = DEFAULT_MAX();
        /**
         * Min selectable date as iso date|datetime string
         * Default: today - 100 years
         */
        this.min = DEFAULT_MIN();
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
         * Change ionic popover options, Omit<PopoverOptions, 'mode' | 'component' | 'componentProps'>
         * Default: {}
         */
        this.ionPopoverOptions = {};
        /**
         * Possibility to overwrite the error css class
         * Default: 'ionic-datepicker-error'
         */
        this.errorClass = 'ionic-datepicker-error';
        /**
         * Possibility to overwrite month names
         * Default: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
         */
        this.monthNames = MONTH_NAMES;
        /**
         * Possibility to overwrite month shortnames
         * Default: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
         */
        this.monthShortNames = MONTH_SHORT_NAMES;
        /**
         * Possibility to overwrite day names
         * Default: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
         */
        this.dayNames = DAY_NAMES;
        /**
         * Possibility to overwrite day shortnames
         * Default: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
         */
        this.dayShortNames = DAY_SHORT_NAMES;
        /**
         * Set okay label
         * Default: 'Okay'
         */
        this.okayLabel = DEFAULT_OKAY_LABEL;
        /**
         * Set cancel label
         * Default: 'Abbrechen'
         */
        this.cancelLabel = DEFAULT_CANCEL_LABEL;
        /**
         * Set year label
         * Default: 'Jahr'
         */
        this.yearLabel = DEFAULT_YEAR_LABEL;
        /**
         * Stores the current selected date as iso string
         */
        this.date = '';
        this.isDesktop = isDesktop();
        this.buttonRef = null;
        this.ionDatetimeRef = null;
        this.handleDateClick = this.handleDateClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.changes = createEvent(this, "changes", 7);
        this.focused = createEvent(this, "focused", 7);
        this.blurred = createEvent(this, "blurred", 7);
    }
    class_1.prototype.updateDateState = function (_prev, next) {
        if (this.date !== next) {
            this.date = next;
            if (this.required) {
                if (!next || !next.trim()) {
                    this.date = new Date().toISOString();
                }
            }
        }
    };
    /**
     * Programmatically open the picker
     */
    class_1.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.buttonRef) {
                    if (this.popover) {
                        return [2 /*return*/];
                    }
                    return [2 /*return*/, this.buttonRef.click()];
                }
                else if (this.ionDatetimeRef) {
                    return [2 /*return*/, this.ionDatetimeRef.open()];
                }
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        if (this.required) {
            if (!this.defaultDate || !this.defaultDate.trim()) {
                this.date = new Date().toISOString();
            }
        }
        if (this.defaultDate) {
            this.date = this.defaultDate;
        }
    };
    class_1.prototype.handleFocus = function () {
        this.focused.emit();
    };
    class_1.prototype.handleBlur = function () {
        this.blurred.emit();
    };
    class_1.prototype.formatDate = function (date) {
        return renderDatetime(this.displayFormat, date, {
            dayNames: this.dayNames,
            dayShortNames: this.dayShortNames,
            monthNames: this.monthNames,
            monthShortNames: this.monthShortNames
        });
    };
    class_1.prototype.handleInput = function (ev) {
        if (!this.disabled) {
            this.date = ev.detail.value;
            this.changes.emit(ev.detail.value);
        }
    };
    class_1.prototype.handleDateClick = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Only when popover is not already open and not disabled
                        if (this.disabled || this.popover) {
                            return [2 /*return*/];
                        }
                        // Open datepicker popover
                        this.popover = Object.assign(document.createElement('ion-popover'), Object.assign(Object.assign({}, this.ionPopoverOptions), { component: 'ionic-datepicker-popover', componentProps: {
                                selectedDate: this.date || null,
                                disabled: this.disabled,
                                displayFormat: this.displayFormat,
                                max: this.max,
                                min: this.min,
                                pickerOptions: Object.assign(Object.assign({}, this.pickerOptions), { customDays: this.dayShortNames, customMonths: this.monthNames, customOverlayMonths: this.monthShortNames, overlayButton: this.okayLabel, overlayPlaceholder: this.yearLabel })
                            }, cssClass: 'datepicker-popover', event: event, mode: this.mode }));
                        document.body.appendChild(this.popover);
                        return [4 /*yield*/, this.popover.present()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.popover.onWillDismiss()];
                    case 2:
                        data = (_a.sent()).data;
                        if (data && data.date !== undefined) {
                            // only allow to unset date when not required
                            if (data.date || !this.required) {
                                this.date = data.date;
                                this.changes.emit(data.date);
                            }
                        }
                        // Set focus again
                        return [4 /*yield*/, this.popover.onDidDismiss()];
                    case 3:
                        // Set focus again
                        _a.sent();
                        if (this.buttonRef) {
                            this.buttonRef.focus();
                        }
                        // remove popover reference
                        this.popover = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.render = function () {
        var _this = this;
        var disabledClassName = this.disabled ? 'disabled' : '';
        var placeholderClassName = !this.date ? 'placeholder' : '';
        var errorClassName = this.error && !!this.errorClass ? this.errorClass : '';
        return h(Host, null, (this.isDesktop || !this.ionDateTimeOnMobile) && [
            h("span", { class: disabledClassName + " " + errorClassName + " " + placeholderClassName }, this.date ? this.formatDate(this.date) : this.placeholder),
            h("button", { ref: function (ref) { return _this.buttonRef = ref; }, class: "hidden-button " + disabledClassName, onClick: this.handleDateClick, type: 'button', onFocus: this.handleFocus, onBlur: this.handleBlur })
        ], !this.isDesktop && this.ionDateTimeOnMobile &&
            h("ion-datetime", { ref: function (ref) { return _this.ionDatetimeRef = ref; }, value: this.defaultDate, displayFormat: this.displayFormat, pickerFormat: this.pickerFormat, class: disabledClassName + " " + errorClassName, placeholder: this.placeholder, monthNames: this.monthNames, monthShortNames: this.monthShortNames, dayNames: this.dayNames, dayShortNames: this.dayShortNames, cancelText: this.cancelLabel, doneText: this.okayLabel, min: this.min, max: this.max, disabled: this.disabled, onIonChange: this.handleInput.bind(this), mode: this.mode, onIonFocus: this.handleFocus, onIonBlur: this.handleBlur }));
    };
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "defaultDate": ["updateDateState"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
IonicDatepicker.style = ionicDatepickerCss;
export { IonicDatepicker as ionic_datepicker };
