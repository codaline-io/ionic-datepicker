import { Component, h, Prop, Watch } from '@stencil/core';
const DateTime = window.luxon.DateTime;
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
                "text": "selected default date as iso date|datetime string\nDefault: today"
            },
            "attribute": "selected-date",
            "reflect": false,
            "defaultValue": "DateTime.local().toISODate()"
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
        }
    }; }
    static get watchers() { return [{
            "propName": "disabled",
            "methodName": "setDisabled"
        }]; }
}
