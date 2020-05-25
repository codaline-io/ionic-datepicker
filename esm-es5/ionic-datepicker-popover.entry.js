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
import { r as registerInstance, h } from './index-3b1f6ec0.js';
import { D as DEFAULT_MAX, a as DEFAULT_MIN, d as DAY_SHORT_NAMES, M as MONTH_NAMES, b as MONTH_SHORT_NAMES, e as DEFAULT_OKAY_LABEL, g as DEFAULT_YEAR_LABEL, t as toISODate } from './utils-f44cc100.js';
var ionicDatepickerPopoverCss = ":root,:host{--base-spacing:var(--ion-padding, 16px);--base-spacing-small:calc(var(--base-spacing) * 0.7);--base-spacing-large:calc(var(--base-spacing) * 1.5);--font-size-base:14px;--font-size-small:calc(var(--font-size-base) * 0.9);--font-size-medium:calc(var(--font-size-base) * 1.2);--font-size-large:calc(var(--font-size-base) * 1.4);--text-color:var(--ion-text-color, #424242);--error-color:var(--ion-color-danger, #eb445a);--placeholder-color:var(--ion-placeholder-color, var(--ion-color-step-400, #999));--popover-width:250px;--squares-padding:5px;--square-dimension:33px;--square-border-radius:5px;--square-font-weight:normal;--square-hover-color:#fff;--square-hover-background:var(--ion-color-secondary, #3dc2ff);--controls-padding:5px;--controls-background:#fff;--square-active-color:#fff;--square-active-background:var(--ion-color-primary, #3880ff);--square-current-color:#fff;--square-current-background:var(--ion-color-medium, #92949c);--overlay-background:rgba(255, 255, 255, .8);--overlay-text-color:var(--text-color)}ion-popover.datepicker-popover,ion-popover.sc-ion-popover-md-h.datepicker-popover{--width:var(--popover-width);--max-width:var(--popover-width);--min-width:var(--popover-width)}ionic-datepicker-popover .qs-datepicker-container{border:0;border-radius:0;margin-top:0;-webkit-box-shadow:none;box-shadow:none;position:relative}ionic-datepicker-popover .qs-datepicker .qs-controls{background-color:var(--controls-background);padding:var(--controls-padding)}ionic-datepicker-popover .qs-datepicker .qs-squares{-ms-flex-pack:center;justify-content:center;padding:var(--squares-padding)}ionic-datepicker-popover .qs-datepicker .qs-square{border-radius:var(--square-border-radius);height:var(--square-dimension);width:var(--square-dimension)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-day{font-weight:var(--square-font-weight)}ionic-datepicker-popover .qs-datepicker .qs-square .qs-num{color:var(--text-color)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-current.qs-active,ionic-datepicker-popover .qs-datepicker .qs-square.qs-active{background-color:var(--square-active-background)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-current.qs-active .qs-num,ionic-datepicker-popover .qs-datepicker .qs-square.qs-active .qs-num{color:var(--square-active-color)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-current{background-color:var(--square-current-background)}ionic-datepicker-popover .qs-datepicker .qs-square.qs-current.qs-num{color:var(--square-current-color);text-decoration:none}ionic-datepicker-popover .qs-datepicker .qs-square:not(.qs-empty):not(.qs-disabled):not(.qs-day):not(.qs-active):hover{background-color:var(--square-hover-background)}ionic-datepicker-popover .qs-datepicker .qs-square:not(.qs-empty):not(.qs-disabled):not(.qs-day):not(.qs-active):hover .qs-num{color:var(--square-hover-color)}ionic-datepicker-popover .qs-datepicker .qs-overlay{background:var(--overlay-background)}ionic-datepicker-popover .qs-datepicker .qs-overlay .qs-submit{display:none}ionic-datepicker-popover .qs-datepicker .qs-overlay .qs-close{color:var(--overlay-text-color);font-size:var(--font-size-base);padding:var(--base-spacing)}ionic-datepicker-popover .qs-datepicker .qs-overlay .qs-overlay-month{color:var(--overlay-text-color);cursor:pointer;font-size:var(--font-size-base);opacity:1}ionic-datepicker-popover .qs-datepicker .qs-overlay .qs-overlay-year{color:var(--overlay-text-color);border-bottom:.5px solid var(--overlay-text-color);font-size:var(--font-size-base);padding:calc(var(--base-spacing-small) * .5) 0;width:120px}";
var IonicDatepickerPopover = /** @class */ (function () {
    function class_1(hostRef) {
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
         * Max selectable date as iso date|datetime string
         * Default: today + 100 years
         */
        this.max = DEFAULT_MAX();
        /**
         * Min selectable date as iso date|datetime string
         * Default: today - 100 years
         */
        this.min = DEFAULT_MIN();
    }
    class_1.prototype.setDisabled = function (newValue) {
        if (this.picker) {
            this.picker.disabled = newValue;
        }
    };
    class_1.prototype.componentDidLoad = function () {
        console.log(window.datepicker);
        var date = this.selectedDate ? new Date(this.selectedDate) : null;
        this.picker = window.datepicker(this.el, Object.assign({
            alwaysShow: true,
            customDays: DAY_SHORT_NAMES,
            customMonths: MONTH_NAMES,
            customOverlayMonths: MONTH_SHORT_NAMES,
            dateSelected: date && date.getTime() <= new Date(this.max).getTime() && date.getTime() >= new Date(this.min).getTime() ? date : null,
            maxDate: new Date(this.max),
            minDate: new Date(this.min),
            onSelect: this.onSelect,
            overlayButton: DEFAULT_OKAY_LABEL,
            overlayPlaceholder: DEFAULT_YEAR_LABEL,
            showAllDates: true,
            startDay: 1
        }, this.pickerOptions));
        this.picker.disabled = this.disabled;
    };
    class_1.prototype.onSelect = function (instance) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, document.querySelector('ion-popover').dismiss({ date: instance.dateSelected ? toISODate(instance.dateSelected.toISOString()) : null })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.render = function () {
        var _this = this;
        return h("div", null, h("div", { class: 'container', ref: function (ref) { return _this.el = ref; } }));
    };
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "disabled": ["setDisabled"]
            };
        },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
IonicDatepickerPopover.style = ionicDatepickerPopoverCss;
export { IonicDatepickerPopover as ionic_datepicker_popover };
