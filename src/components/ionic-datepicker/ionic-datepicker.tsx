import { OverlayEventDetail, PopoverOptions } from '@ionic/core'
import { Component, EventEmitter, Prop, h, Host, Event, State } from '@stencil/core';

const DateTime = (window as any).luxon.DateTime

const isDesktop = () => !(window.matchMedia('(any-pointer:coarse)').matches)

@Component({
  tag: 'ionic-datepicker',
  styleUrl: 'ionic-datepicker.css',
  shadow: true
})
export class IonicDatepicker {
  /**
   * How the date should be formatted for display purposes
   * Default: "DDD"
   */
  @Prop() displayFormat = 'DDD';

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

  /**
   * placeholder if not required and empty
   * Default: Datum
   */
  @Prop() placeholder = 'Datum';

  /**
   * Max selectable date as iso date|datetime string
   * Default: today + 100 years
   */
  @Prop() max = DateTime.local().plus({years: 100}).toISODate();

  /**
   * Min selectable date as iso date|datetime string
   * Default: today - 100 years
   */
  @Prop() min = DateTime.local().minus({years: 100}).toISODate();

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
   * Change popover options, PopoverOptions | {}
   * Default: {}
   */
  @Prop() popoverOptions: PopoverOptions | {} = {};

  /**
   * Possibility to overwrite the error css class
   * Default: 'ionic-datepicker-error'
   */
  @Prop() errorClass = 'ionic-datepicker-error';

  /**
   * Event that emits the iso date string everytime the date changes
   */
  @Event() changes: EventEmitter<string>;

  /**
   * Stores the current selected date as formatted string for display purposes
   */
  @State() formattedDate: string = '';
  @State() date: any

  private isDesktop = isDesktop();

  constructor() {
    this.handleDateClick = this.handleDateClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentWillLoad() {
    if (this.required) {
      if (!this.defaultDate || !this.defaultDate.trim()) {
        this.defaultDate = DateTime.local().toISODate();
      }
    }
    if (this.defaultDate) {
      this.date = DateTime.fromISO(this.defaultDate)
      this.formattedDate = this.date.toFormat(this.displayFormat);
    }
  }

  handleInput(ev: InputEvent) {
    if (!this.isDesktop) {
      this.date = DateTime.fromISO((ev.target as any).value as string);
      this.formattedDate = this.date.toFormat(this.displayFormat);

      this.changes.emit(this.date.toISODate());
    }
  }

  async handleDateClick(event: MouseEvent) {
    if (!this.isDesktop || this.disabled) {
      return;
    }

    const popover = Object.assign(document.createElement('ion-popover'), {
      ...this.popoverOptions,
      component: 'ionic-datepicker-popover',
      componentProps: {
        selectedDate: this.date ? this.date.toISODate() : null,
        disabled: this.disabled,
        displayFormat: this.displayFormat,
        max: this.max,
        min: this.min,
        pickerOptions: this.pickerOptions
      },
      cssClass: 'datepicker-popover',
      event: event
    });
    document.body.appendChild(popover);
    await popover.present();

    const { data }: OverlayEventDetail<{date?: string}> = await popover.onWillDismiss();

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

    return <Host>
      { this.isDesktop && <span onClick={this.handleDateClick} class={`${disabledClassName} ${errorClassName} ${placeholderClassName}`}>
        {this.formattedDate || this.placeholder}
      </span> }
      { !this.isDesktop && <input
        type='date'
        disabled={this.disabled}
        class={`${disabledClassName} ${errorClassName}`}
        placeholder={this.placeholder}
        onInput={this.handleInput}
        max={this.max}
        min={this.min}
        required={this.required}
        value={this.date ? this.date.toISODate() : ''}
      /> }
    </Host>;
  }
}
