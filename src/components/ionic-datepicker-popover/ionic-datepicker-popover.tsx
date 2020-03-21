import { Component, h, Prop, Watch } from '@stencil/core';

const DateTime = (window as any).luxon.DateTime

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
  @Prop() selectedDate = DateTime.local().toISODate();

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

  componentDidLoad() {
    this.picker = (window as any).datepicker(this.el, { ...{
      alwaysShow: true,
      customDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
      customMonths: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      customOverlayMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
      dateSelected: this.selectedDate ? new Date(this.selectedDate) : new Date(),
      disableMobile: true,
      maxDate: new Date(this.max),
      minDate: new Date(this.min),
      onSelect: (instance: { dateSelected: Date }) => document.querySelector('ion-popover').dismiss({ date: instance.dateSelected.toISOString() }),
      overlayButton: 'Okay',
      overlayPlaceholder: 'Jahr',
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
