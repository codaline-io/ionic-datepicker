import { Component, h, Prop, Watch } from '@stencil/core';
import { DAY_SHORT_NAMES, DEFAULT_OKAY_LABEL, DEFAULT_YEAR_LABEL, MONTH_NAMES, MONTH_SHORT_NAMES, DEFAULT_MAX, DEFAULT_MIN, toISODate } from '../utils';
export class IonicDatepickerPopover {
    constructor() {
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
    setDisabled(newValue) {
        if (this.picker) {
            this.picker.disabled = newValue;
        }
    }
    componentDidLoad() {
        const date = this.selectedDate ? new Date(this.selectedDate) : null;
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
    }
    onSelect(instance) {
        document.querySelector('ion-popover').dismiss({ date: instance.dateSelected ? toISODate(instance.dateSelected.toISOString()) : null });
    }
    render() {
        return h("div", null,
            h("div", { class: 'container', ref: (ref) => this.el = ref }));
    }
    static get is() { return "ionic-datepicker-popover"; }
    static get originalStyleUrls() { return {
        "$": ["ionic-datepicker-popover.css"]
    }; }
    static get styleUrls() { return {
        "$": ["ionic-datepicker-popover.css"]
    }; }
    static get properties() { return {
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
        "selectedDate": {
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
                "text": "selected default date as iso date|datetime string\nDefault: today"
            },
            "attribute": "selected-date",
            "reflect": false
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
        }
    }; }
    static get watchers() { return [{
            "propName": "disabled",
            "methodName": "setDisabled"
        }]; }
}
