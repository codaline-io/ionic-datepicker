import { Component, Prop, h, Host, Event, State } from '@stencil/core';
import { DEFAULT_MAX, DEFAULT_MIN, DAY_NAMES, DAY_SHORT_NAMES, DEFAULT_CANCEL_LABEL, DEFAULT_OKAY_LABEL, DEFAULT_YEAR_LABEL, MONTH_NAMES, MONTH_SHORT_NAMES, renderDatetime } from '../utils';
const isDesktop = () => !(window.matchMedia('(any-pointer:coarse)').matches);
export class IonicDatepicker {
    constructor() {
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
        this.handleDateClick = this.handleDateClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    componentWillLoad() {
        if (this.required) {
            if (!this.defaultDate || !this.defaultDate.trim()) {
                this.date = new Date().toISOString();
            }
        }
        if (this.defaultDate) {
            this.date = this.defaultDate;
        }
    }
    formatDate(date) {
        return renderDatetime(this.displayFormat, date, {
            dayNames: this.dayNames,
            dayShortNames: this.dayShortNames,
            monthNames: this.monthNames,
            monthShortNames: this.monthShortNames
        });
    }
    handleInput(ev) {
        if (!this.disabled) {
            this.date = ev.detail.value;
            this.changes.emit(ev.detail.value);
        }
    }
    async handleDateClick(event) {
        if (this.disabled) {
            return;
        }
        const popover = Object.assign(document.createElement('ion-popover'), Object.assign(Object.assign({}, this.ionPopoverOptions), { component: 'ionic-datepicker-popover', componentProps: {
                selectedDate: this.date || null,
                disabled: this.disabled,
                displayFormat: this.displayFormat,
                max: this.max,
                min: this.min,
                pickerOptions: Object.assign(Object.assign({}, this.pickerOptions), { customDays: this.dayShortNames, customMonths: this.monthNames, customOverlayMonths: this.monthShortNames, overlayButton: this.okayLabel, overlayPlaceholder: this.yearLabel })
            }, cssClass: 'datepicker-popover', event: event, mode: this.mode }));
        document.body.appendChild(popover);
        await popover.present();
        const { data } = await popover.onWillDismiss();
        if (data && data.date) {
            this.date = data.date;
            this.changes.emit(data.date);
        }
    }
    render() {
        const disabledClassName = this.disabled ? 'disabled' : '';
        const placeholderClassName = !this.date ? 'placeholder' : '';
        const errorClassName = this.error && !!this.errorClass ? this.errorClass : '';
        return h(Host, null,
            (this.isDesktop || !this.ionDateTimeOnMobile) && h("span", { onClick: this.handleDateClick, class: `${disabledClassName} ${errorClassName} ${placeholderClassName}` }, this.date ? this.formatDate(this.date) : this.placeholder),
            !this.isDesktop && this.ionDateTimeOnMobile &&
                h("ion-datetime", { value: this.defaultDate, displayFormat: this.displayFormat, pickerFormat: this.pickerFormat, class: `${disabledClassName} ${errorClassName}`, placeholder: this.placeholder, monthNames: this.monthNames, monthShortNames: this.monthShortNames, dayNames: this.dayNames, dayShortNames: this.dayShortNames, cancelText: this.cancelLabel, doneText: this.okayLabel, min: this.min, max: this.max, disabled: this.disabled, onIonChange: this.handleInput.bind(this), mode: this.mode }));
    }
    static get is() { return "ionic-datepicker"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["ionic-datepicker.css"]
    }; }
    static get styleUrls() { return {
        "$": ["ionic-datepicker.css"]
    }; }
    static get properties() { return {
        "displayFormat": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "How the date should be formatted for ion-datetime for display purposes (https://ionicframework.com/docs/api/datetime/#display-and-picker-formats)\nDefault: \"DD. MMMM YYYY\""
            },
            "attribute": "display-format",
            "reflect": false,
            "defaultValue": "'DD. MMMM YYYY'"
        },
        "pickerFormat": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "How the date should be formatted for ion-datetime  for display purposes (https://ionicframework.com/docs/api/datetime/#display-and-picker-formats)\nDefault: \"DD. MMMM YYYY\""
            },
            "attribute": "picker-format",
            "reflect": false,
            "defaultValue": "'DD. MMMM YYYY'"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Flag if datepicking is disabled\nDefault: disabled"
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "pickerOptions": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "object",
                "resolved": "object",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Options for the js-datepicker\nDefault: {}"
            },
            "defaultValue": "{}"
        },
        "defaultDate": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "default date as iso date|datetime string\nDefault: today when required"
            },
            "attribute": "default-date",
            "reflect": false
        },
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "placeholder if not required and empty\nDefault: Datum"
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "'Datum ausw\u00E4hlen'"
        },
        "ionDateTimeOnMobile": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "ionDateTimeOnMobile if ion datetime picker is used on mobile devices\nDefault: false"
            },
            "attribute": "ion-date-time-on-mobile",
            "reflect": false,
            "defaultValue": "false"
        },
        "max": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Max selectable date as iso date|datetime string\nDefault: today + 100 years"
            },
            "attribute": "max",
            "reflect": false,
            "defaultValue": "DEFAULT_MAX()"
        },
        "min": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Min selectable date as iso date|datetime string\nDefault: today - 100 years"
            },
            "attribute": "min",
            "reflect": false,
            "defaultValue": "DEFAULT_MIN()"
        },
        "required": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Required input\nDefault: false"
            },
            "attribute": "required",
            "reflect": false,
            "defaultValue": "false"
        },
        "error": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Flag if it should be marked as error\nDefault: false"
            },
            "attribute": "error",
            "reflect": false,
            "defaultValue": "false"
        },
        "ionPopoverOptions": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Omit<PopoverOptions, 'mode' | 'component' | 'componentProps'>",
                "resolved": "{ showBackdrop?: boolean; backdropDismiss?: boolean; translucent?: boolean; cssClass?: string | string[]; event?: Event; delegate?: FrameworkDelegate; animated?: boolean; keyboardClose?: boolean; id?: string; enterAnimation?: AnimationBuilder; leaveAnimation?: AnimationBuilder; }",
                "references": {
                    "Omit": {
                        "location": "global"
                    },
                    "PopoverOptions": {
                        "location": "import",
                        "path": "@ionic/core"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Change ionic popover options, Omit<PopoverOptions, 'mode' | 'component' | 'componentProps'>\nDefault: {}"
            },
            "defaultValue": "{}"
        },
        "mode": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "Mode",
                "resolved": "\"ios\" | \"md\"",
                "references": {
                    "Mode": {
                        "location": "import",
                        "path": "@ionic/core"
                    }
                }
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "Changes the mode of ion-popover and ion-datetime>\nDefault: undefined"
            },
            "attribute": "mode",
            "reflect": false
        },
        "errorClass": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Possibility to overwrite the error css class\nDefault: 'ionic-datepicker-error'"
            },
            "attribute": "error-class",
            "reflect": false,
            "defaultValue": "'ionic-datepicker-error'"
        },
        "monthNames": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Possibility to overwrite month names\nDefault: ['Januar', 'Februar', 'M\u00E4rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']"
            },
            "defaultValue": "MONTH_NAMES"
        },
        "monthShortNames": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Possibility to overwrite month shortnames\nDefault: ['Jan', 'Feb', 'M\u00E4r', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']"
            },
            "defaultValue": "MONTH_SHORT_NAMES"
        },
        "dayNames": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Possibility to overwrite day names\nDefault: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']"
            },
            "defaultValue": "DAY_NAMES"
        },
        "dayShortNames": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "string[]",
                "resolved": "string[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Possibility to overwrite day shortnames\nDefault: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']"
            },
            "defaultValue": "DAY_SHORT_NAMES"
        },
        "okayLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set okay label\nDefault: 'Okay'"
            },
            "attribute": "okay-label",
            "reflect": false,
            "defaultValue": "DEFAULT_OKAY_LABEL"
        },
        "cancelLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set cancel label\nDefault: 'Abbrechen'"
            },
            "attribute": "cancel-label",
            "reflect": false,
            "defaultValue": "DEFAULT_CANCEL_LABEL"
        },
        "yearLabel": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Set year label\nDefault: 'Jahr'"
            },
            "attribute": "year-label",
            "reflect": false,
            "defaultValue": "DEFAULT_YEAR_LABEL"
        }
    }; }
    static get states() { return {
        "date": {}
    }; }
    static get events() { return [{
            "method": "changes",
            "name": "changes",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event that emits the iso date string everytime the date changes"
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
