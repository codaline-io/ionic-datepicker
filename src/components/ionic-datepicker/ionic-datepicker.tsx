import { isPlatform, popoverController, OverlayEventDetail, PopoverOptions } from '@ionic/core'
import { Component, Prop, h, Host, Event, State } from '@stencil/core';
import { DateTime } from 'luxon';
import { EventEmitter } from '@ionic/core/dist/types/stencil.core';

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
   * Default: today
   */
  @Prop() defaultDate = DateTime.local().toISODate();

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
  @State() formattedDate: string;
  @State() date: DateTime

  private isDesktop = isPlatform('desktop');

  constructor() {
    this.handleDateClick = this.handleDateClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  componentWillLoad() {
    this.date = DateTime.fromISO(this.defaultDate)
    this.formattedDate = this.date.toFormat(this.displayFormat);
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

    const popover = await popoverController.create({
      ...this.popoverOptions,
      component: 'ionic-datepicker-popover',
      componentProps: {
        selectedDate: this.date.toISODate(),
        disabled: this.disabled,
        displayFormat: this.displayFormat,
        max: this.max,
        min: this.min,
        pickerOptions: this.pickerOptions
      },
      cssClass: 'datepicker-popover',
      event: event
    });
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
    const errorClassName = this.error && !!this.errorClass ? this.errorClass : '';

    return <Host>
      { this.isDesktop && <span onClick={this.handleDateClick} class={`${disabledClassName} ${errorClassName}`}>
        {this.formattedDate}
      </span> }
      { !this.isDesktop && <input
        type='date'
        disabled={this.disabled}
        class={`${disabledClassName} ${errorClassName}`}
        onInput={this.handleInput}
        max={this.max}
        min={this.min}
        value={this.date.toISODate()}
      /> }
    </Host>;
  }
}
