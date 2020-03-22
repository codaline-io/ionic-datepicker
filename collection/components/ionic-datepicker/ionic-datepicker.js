import { Component, Prop, h, Host, Event, State } from '@stencil/core';
const DateTime = window.luxon.DateTime;
const isDesktop = () => !(window.matchMedia('(any-pointer:coarse)').matches);
export class IonicDatepicker {
    constructor() {
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
         * Change popover options, PopoverOptions | {}
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
        return h(Host, null,
            (this.isDesktop || !this.nativeOnMobile) && h("span", { onClick: this.handleDateClick, class: `${disabledClassName} ${errorClassName} ${placeholderClassName}` }, this.formattedDate || this.placeholder),
            !this.isDesktop && this.nativeOnMobile && h("input", { type: 'date', disabled: this.disabled, class: `${disabledClassName} ${errorClassName}`, placeholder: this.placeholder, onInput: this.handleInput, max: this.max, min: this.min, required: this.required, value: this.date ? this.date.toISODate() : '' }));
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
                "text": "How the date should be formatted for display purposes\nDefault: \"DDD\""
            },
            "attribute": "display-format",
            "reflect": false,
            "defaultValue": "'DDD'"
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
            "defaultValue": "'Datum'"
        },
        "nativeOnMobile": {
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
                "text": "nativeOnMobile if native date picker is used on mobile devices\nDefault: false"
            },
            "attribute": "native-on-mobile",
            "reflect": false,
            "defaultValue": "false"
        },
        "max": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
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
            "defaultValue": "DateTime.local().plus({years: 100}).toISODate()"
        },
        "min": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
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
            "defaultValue": "DateTime.local().minus({years: 100}).toISODate()"
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
        "popoverOptions": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "PopoverOptions | {}",
                "resolved": "PopoverOptions<ComponentRef> | {}",
                "references": {
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
                "text": "Change popover options, PopoverOptions |\u00A0{}\nDefault: {}"
            },
            "defaultValue": "{}"
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
        }
    }; }
    static get states() { return {
        "formattedDate": {},
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
