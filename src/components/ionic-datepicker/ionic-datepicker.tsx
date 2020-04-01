import { OverlayEventDetail, PopoverOptions, Mode } from '@ionic/core'
import { Component, EventEmitter, Prop, h, Host, Event, State, Method, Watch } from '@stencil/core';
import { DEFAULT_MAX, DEFAULT_MIN, DAY_NAMES, DAY_SHORT_NAMES, DEFAULT_CANCEL_LABEL, DEFAULT_OKAY_LABEL, DEFAULT_YEAR_LABEL, MONTH_NAMES, MONTH_SHORT_NAMES, renderDatetime } from '../utils';

const isDesktop = () => !(window.matchMedia('(any-pointer:coarse)').matches)

@Component({
  tag: 'ionic-datepicker',
  styleUrl: 'ionic-datepicker.css',
  shadow: true
})
export class IonicDatepicker {
  /**
   * How the date should be formatted for ion-datetime for display purposes (https://ionicframework.com/docs/api/datetime/#display-and-picker-formats)
   * Default: "DD. MMMM YYYY"
   */
  @Prop() displayFormat = 'DD. MMMM YYYY';

  /**
   * How the date should be formatted for ion-datetime  for display purposes (https://ionicframework.com/docs/api/datetime/#display-and-picker-formats)
   * Default: "DD. MMMM YYYY"
   */
  @Prop() pickerFormat = 'DD. MMMM YYYY';

  /**
   * Flag if datepicking is disabled
   * Default: disabled
   */
  @Prop() disabled = false;

  /**
   * Options for the js-datepicker
   * Default: {}
   */
  @Prop() pickerOptions: object = {};

  /**
   * default date as iso date|datetime string
   * Default: today when required
   */
  @Prop() defaultDate?: string;
  @Watch('defaultDate')
  updateDateState(next) {
    if (this.date !== next) {
      if (this.required) {
        if (!next || !next.trim()) {
          this.date = new Date().toISOString();
          return
        }
      }
      this.date = next
    }
  }

  /**
   * placeholder if not required and empty
   * Default: Datum
   */
  @Prop() placeholder = 'Datum auswählen';

  /**
   * ionDateTimeOnMobile if ion datetime picker is used on mobile devices
   * Default: false
   */
  @Prop() ionDateTimeOnMobile = false;

  /**
   * Max selectable date as iso date|datetime string
   * Default: today + 100 years
   */
  @Prop() max = DEFAULT_MAX();

  /**
   * Min selectable date as iso date|datetime string
   * Default: today - 100 years
   */
  @Prop() min = DEFAULT_MIN();

  /**
   * Required input
   * Default: false
   */
  @Prop() required = false;

  /**
   * Flag if it should be marked as error
   * Default: false
   */
  @Prop() error = false;

  /**
   * Change ionic popover options, Omit<PopoverOptions, 'mode' | 'component' | 'componentProps'>
   * Default: {}
   */
  @Prop() ionPopoverOptions: Omit<PopoverOptions, 'mode' | 'component' | 'componentProps'> = {};

  /**
   * Changes the mode of ion-popover and ion-datetime>
   * Default: undefined
   */
  @Prop() mode?: Mode;

  /**
   * Possibility to overwrite the error css class
   * Default: 'ionic-datepicker-error'
   */
  @Prop() errorClass = 'ionic-datepicker-error';

  /**
   * Possibility to overwrite month names
   * Default: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
   */
  @Prop() monthNames = MONTH_NAMES;

  /**
   * Possibility to overwrite month shortnames
   * Default: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
   */
  @Prop() monthShortNames = MONTH_SHORT_NAMES;

  /**
   * Possibility to overwrite day names
   * Default: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
   */
  @Prop() dayNames = DAY_NAMES;

  /**
   * Possibility to overwrite day shortnames
   * Default: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
   */
  @Prop() dayShortNames = DAY_SHORT_NAMES;

  /**
   * Set okay label
   * Default: 'Okay'
   */
  @Prop() okayLabel = DEFAULT_OKAY_LABEL;

  /**
   * Set cancel label
   * Default: 'Abbrechen'
   */
  @Prop() cancelLabel = DEFAULT_CANCEL_LABEL;

  /**
   * Set year label
   * Default: 'Jahr'
   */
  @Prop() yearLabel = DEFAULT_YEAR_LABEL;

  /**
   * Event that emits the iso date string everytime the date changes
   */
  @Event() changes: EventEmitter<string>;

  /**
   * Event that emits when the component gets the focus
   */
  @Event() focused: EventEmitter<void>;

  /**
   * Event that emits when the component loses the focus and gets blurred
   */
  @Event() blurred: EventEmitter<void>;

  /**
   * Stores the current selected date as iso string
   */
  @State() date: string = '';

  private isDesktop = isDesktop();
  private popover?: HTMLIonPopoverElement
  private buttonRef: HTMLButtonElement | null = null
  private ionDatetimeRef: HTMLIonDatetimeElement | null = null

  /**
   * Programmatically open the picker
   */
  @Method()
  async open() {
    if (this.buttonRef) {
      if (this.popover) {
        return
      }

      return this.buttonRef.click()
    } else if (this.ionDatetimeRef) {
      return this.ionDatetimeRef.open()
    }
  }

  constructor() {
    this.handleDateClick = this.handleDateClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentWillLoad() {
    if (this.required) {
      if (!this.defaultDate || !this.defaultDate.trim()) {
        this.date = new Date().toISOString();
      }
    }
    if (this.defaultDate) {
      this.date = this.defaultDate
    }
  }

  handleFocus() {
    this.focused.emit()
  }

  handleBlur() {
    this.blurred.emit()
  }

  private formatDate(date: string) {
    return renderDatetime(this.displayFormat, date, {
      dayNames: this.dayNames,
      dayShortNames: this.dayShortNames,
      monthNames: this.monthNames,
      monthShortNames: this.monthShortNames
    });
  }

  handleInput(ev: CustomEvent<{ value: string }>) {
    if (!this.disabled) {
      this.date = ev.detail.value;
      this.changes.emit(ev.detail.value);
    }
  }

  async handleDateClick(event: MouseEvent) {
    // Only when popover is not already open and not disabled
    if (this.disabled || this.popover) {
      return;
    }

    // Open datepicker popover
    this.popover = Object.assign(document.createElement('ion-popover'), {
      ...this.ionPopoverOptions,
      component: 'ionic-datepicker-popover',
      componentProps: {
        selectedDate: this.date || null,
        disabled: this.disabled,
        displayFormat: this.displayFormat,
        max: this.max,
        min: this.min,
        pickerOptions: {
          ...this.pickerOptions,
          customDays: this.dayShortNames,
          customMonths: this.monthNames,
          customOverlayMonths: this.monthShortNames,
          overlayButton: this.okayLabel,
          overlayPlaceholder: this.yearLabel
        }
      },
      cssClass: 'datepicker-popover',
      event: event,
      mode: this.mode
    });
    document.body.appendChild(this.popover);
    await this.popover.present();

    // Update data
    const { data }: OverlayEventDetail<{date?: string}> = await this.popover.onWillDismiss();
    if (data && data.date !== undefined) {
      // only allow to unset date when not required
      if (data.date || !this.required) {
        this.date = data.date;
        this.changes.emit(data.date);
      }
    }

    // Set focus again
    await this.popover.onDidDismiss()
    if (this.buttonRef) {
      this.buttonRef.focus()
    }

    // remove popover reference
    this.popover = null
  }

  render() {
    const disabledClassName = this.disabled ? 'disabled' : '';
    const placeholderClassName = !this.date ? 'placeholder' : '';
    const errorClassName = this.error && !!this.errorClass ? this.errorClass : '';

    return <Host>
      { (this.isDesktop || !this.ionDateTimeOnMobile) && [
        <span class={`${disabledClassName} ${errorClassName} ${placeholderClassName}`}>
          {this.date ? this.formatDate(this.date) : this.placeholder}
        </span>,
        <button
          ref={(ref) => this.buttonRef = ref}
          class={`hidden-button ${disabledClassName}`}
          onClick={this.handleDateClick}
          type='button'
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}></button>
      ]}
      { !this.isDesktop && this.ionDateTimeOnMobile &&
        <ion-datetime
          ref={(ref) => this.ionDatetimeRef = ref}
          value={this.defaultDate}
          displayFormat={this.displayFormat}
          pickerFormat={this.pickerFormat}
          class={`${disabledClassName} ${errorClassName}`}
          placeholder={this.placeholder}
          monthNames={this.monthNames}
          monthShortNames={this.monthShortNames}
          dayNames={this.dayNames}
          dayShortNames={this.dayShortNames}
          cancelText={this.cancelLabel}
          doneText={this.okayLabel}
          min={this.min}
          max={this.max}
          disabled={this.disabled}
          onIonChange={this.handleInput.bind(this)}
          mode={this.mode}
          onIonFocus={this.handleFocus}
          onIonBlur={this.handleBlur}
        >
        </ion-datetime>
      }
    </Host>;
  }
}
