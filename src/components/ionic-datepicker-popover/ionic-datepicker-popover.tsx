import { Component, h, Prop, Watch } from '@stencil/core';
import { DAY_SHORT_NAMES, DEFAULT_OKAY_LABEL, DEFAULT_YEAR_LABEL, MONTH_NAMES, MONTH_SHORT_NAMES, DEFAULT_MAX, DEFAULT_MIN, toISODate } from '../utils';

@Component({
  tag: 'ionic-datepicker-popover',
  styleUrl: 'ionic-datepicker-popover.css'
})
export class IonicDatepickerPopover {
  private picker: any;
  private el: HTMLDivElement;

  /**
   * Flag if datepicking is disabled
   * Default: disabled
   */
  @Prop() disabled = false;
  @Watch('disabled')
  setDisabled(_prev: boolean, current: boolean) {
    if (this.picker) {
      this.picker.disabled = current
    }
  }

  /**
   * Options for the js-datepicker
   * Default: {}
   */
  @Prop() pickerOptions: object = {};

  /**
   * selected default date as iso date|datetime string
   * Default: today
   */
  @Prop() selectedDate?: string;

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

  componentDidLoad() {
    const date = this.selectedDate ? new Date(this.selectedDate) : null
    this.picker = (window as any).datepicker(this.el, { ...{
      alwaysShow: true,
      customDays: DAY_SHORT_NAMES,
      customMonths: MONTH_NAMES,
      customOverlayMonths: MONTH_SHORT_NAMES,
      dateSelected: date && date.getTime() <= new Date(this.max).getTime() && date.getTime() >= new Date(this.min).getTime() ? date : new Date(),
      maxDate: new Date(this.max),
      minDate: new Date(this.min),
      onSelect: (instance: { dateSelected: Date }) => {
        document.querySelector('ion-popover').dismiss({ date: toISODate(instance.dateSelected.toISOString()) })
      },
      overlayButton: DEFAULT_OKAY_LABEL,
      overlayPlaceholder: DEFAULT_YEAR_LABEL,
      showAllDates: true,
      startDay: 1
    }, ...this.pickerOptions});

    this.picker.disabled = this.disabled;
  }

  render() {
    return <div>
      <div class='container' ref={(ref) => this.el = ref} />
    </div>;
  }
}
