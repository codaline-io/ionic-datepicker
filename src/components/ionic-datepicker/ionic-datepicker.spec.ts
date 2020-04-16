import { IonicDatepicker } from './ionic-datepicker';
import { DEFAULT_OKAY_LABEL, DEFAULT_YEAR_LABEL, DAY_SHORT_NAMES, MONTH_NAMES, MONTH_SHORT_NAMES, DAY_NAMES, DEFAULT_CANCEL_LABEL } from '../utils';
import * as utils from '../utils';
import { newSpecPage, SpecPage } from '@stencil/core/testing';

describe('IonicDatepicker', () => {
  let picker: IonicDatepicker;

  beforeEach(() => {
    picker = new IonicDatepicker();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#init', () => {
    it('has default props', () => {
      expect(picker.monthNames).toEqual(MONTH_NAMES);
      expect(picker.monthShortNames).toEqual(MONTH_SHORT_NAMES);
      expect(picker.dayNames).toEqual(DAY_NAMES);
      expect(picker.dayShortNames).toEqual(DAY_SHORT_NAMES);
      expect(picker.okayLabel).toBe(DEFAULT_OKAY_LABEL);
      expect(picker.cancelLabel).toBe(DEFAULT_CANCEL_LABEL);
      expect(picker.max).toBeDefined();
      expect(picker.min).toBeDefined();
      expect(picker.placeholder).toEqual('Datum auswählen');
      expect(picker.defaultDate).toBe(undefined);
      expect(picker.required).toBe(false);
      expect(picker.displayFormat).toEqual('DD. MMMM YYYY');
      expect(picker.pickerFormat).toEqual('DD. MMMM YYYY');
      expect(picker.disabled).toBe(false);
      expect(picker.ionDateTimeOnMobile).toBe(false);
      expect(picker.error).toBe(false);
      expect(picker.errorClass).toEqual('ionic-datepicker-error');
    });
  });

  describe('#updateDateState', () => {
    it('does nothing when date not changed', () => {
      const dateString = new Date('2020-01-01').toISOString()
      picker.date = dateString;
      picker.updateDateState(dateString);

      expect(picker.date).toEqual(dateString)
    });

    it('sets date to new date', () => {
      const dateString = new Date('2021-01-01').toISOString()
      picker.date = new Date('2020-01-01').toISOString();
      picker.updateDateState(dateString);

      expect(picker.date).toEqual(dateString)
    });

    it('sets date to now when required and new date is null', () => {
      const dateString = new Date('2020-01-01').toISOString();
      picker.date = dateString;
      picker.required = true;
      picker.updateDateState(null);

      expect(picker.date).not.toBe(null);
      expect(picker.date).toBeDefined();
      expect(picker.date).not.toEqual(dateString);
    });
  });

  describe('#componentWillLoad', () => {
    it('sets date to default date', () => {
      const dateString = new Date('2020-01-01').toISOString()
      picker.defaultDate = dateString;
      picker.componentWillLoad();

      expect(picker.date).toEqual(dateString);
    });

    it('sets date to now, when required and no default date', () => {
      picker.required = true;
      picker.componentWillLoad();

      expect(picker.date).toBeDefined();
      expect(picker.date).not.toBe(null);
    });
  });

  describe('#handleFocus', () => {
    it('emits focus event', () => {
      const spy = spyOn(picker.focused, 'emit');
      picker.handleFocus();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#handleBlur', () => {
    it('emits blur event', () => {
      const spy = spyOn(picker.blurred, 'emit');
      picker.handleBlur();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('#handleInput', () => {
    it('updates date and emits change with selected date', () => {
      const dateString = new Date('2021-01-01').toISOString();
      const spy = spyOn(picker.changes, 'emit');
      picker.handleInput({
        detail: {
          value: dateString
        }
      } as any);

      expect(spy).toHaveBeenCalledWith(dateString);
      expect(picker.date).toEqual(dateString);
    });

    it('does nothing when disabled', () => {
      const dateString = new Date('2021-01-01').toISOString();
      picker.disabled = true;
      picker.date = new Date('2020-01-01').toISOString();
      const spy = spyOn(picker.changes, 'emit');
      picker.handleInput({
        detail: {
          value: dateString
        }
      } as any);

      expect(spy).not.toHaveBeenCalled();
      expect(picker.date).toEqual(new Date('2020-01-01').toISOString());
    });
  });

  describe('#handleDateClick', () => {
    it('does nothing if disabled', async () => {
      const spy = spyOn(document, 'createElement');

      picker.disabled = true;
      await picker.handleDateClick({} as MouseEvent);

      expect(spy).not.toHaveBeenCalled();
    });

    it('does nothing if popover is already defined', async () => {
      const spy = spyOn(document, 'createElement');

      picker.disabled = false;
      picker.popover = {} as HTMLIonPopoverElement;
      await picker.handleDateClick({} as MouseEvent);

      expect(spy).not.toHaveBeenCalled();
    });

    it('opens popover and returns new date on dismiss', async () => {
      picker.disabled = false;
      picker.popover = null;
      picker.buttonRef = {
        focus: () => {}
      } as HTMLButtonElement;

      const dateString = new Date().toISOString();
      const onWillDismiss = async () => ({
        data: {
          date: dateString
        }
      });
      const popoverMock = {
        present: async () => {},
        onWillDismiss,
        onDidDismiss: async () => {}
      };

      const spy = spyOn(document, 'createElement').and.returnValue(popoverMock);
      const assignSpy = spyOn(Object, 'assign').and.callThrough();
      const appendSpy = spyOn(document.body, 'appendChild').and.callFake(() => ({}));
      const presentSpy = spyOn(popoverMock, 'present').and.callThrough();
      const changesSpy = spyOn(picker.changes, 'emit').and.callThrough();
      const focusSpy = spyOn(picker.buttonRef, 'focus').and.callThrough();

      await picker.handleDateClick({} as MouseEvent);

      expect(spy).toHaveBeenCalledWith('ion-popover');
      expect(appendSpy).toHaveBeenCalled();
      expect(presentSpy).toHaveBeenCalled();
      expect(changesSpy).toHaveBeenCalledWith(dateString);
      expect(picker.date).toEqual(dateString);
      expect(focusSpy).toHaveBeenCalled();
      expect(picker.popover).toEqual(null);
      expect(assignSpy.calls.first().args).toEqual([{component: 'ionic-datepicker-popover', componentProps: {disabled: false, displayFormat: picker.displayFormat, max: picker.max, min: picker.min, pickerOptions: {customDays: DAY_SHORT_NAMES, customMonths: MONTH_NAMES, customOverlayMonths: MONTH_SHORT_NAMES, overlayButton: DEFAULT_OKAY_LABEL, overlayPlaceholder: DEFAULT_YEAR_LABEL}, selectedDate: null}, cssClass: 'datepicker-popover', event: {}, mode: undefined}, {}]);
    });
  });

  describe('#open', () => {
    it('does nothing when buttonRef and popoverRef exist', async () => {
      picker.buttonRef = {
        click: () => {}
      } as HTMLButtonElement;
      picker.ionDatetimeRef = {
        click: () => {}
      } as HTMLIonDatetimeElement;
      picker.popover = {} as HTMLIonPopoverElement;

      const buttonSpy = spyOn(picker.buttonRef, 'click');
      const ionDatetimeSpy = spyOn(picker.ionDatetimeRef, 'click');

      await picker.open();

      expect(buttonSpy).not.toHaveBeenCalled();
      expect(ionDatetimeSpy).not.toHaveBeenCalled();
    });

    it('triggers click on button, if button exists', async () => {
      picker.buttonRef = {
        click: () => {}
      } as HTMLButtonElement;
      picker.ionDatetimeRef = {
        click: () => {}
      } as HTMLIonDatetimeElement;
      picker.popover = null;

      const buttonSpy = spyOn(picker.buttonRef, 'click');
      const ionDatetimeSpy = spyOn(picker.ionDatetimeRef, 'click');

      await picker.open();

      expect(buttonSpy).toHaveBeenCalled();
      expect(ionDatetimeSpy).not.toHaveBeenCalled();
    });

    it('triggers click on ionDatetimeRef, if ionDatetimeRef exists', async () => {
      picker.buttonRef = null;
      picker.popover = null;
      picker.ionDatetimeRef = {
        open: () => {}
      } as HTMLIonDatetimeElement;

      const ionDatetimeSpy = spyOn(picker.ionDatetimeRef, 'open');

      await picker.open();

      expect(ionDatetimeSpy).toHaveBeenCalled();
    });
  });

  describe('#formatDate', () => {
    it('renders date iso string a specific format', async () => {
      const spy = spyOn(utils, 'renderDatetime').and.callThrough();
      const dateString = new Date('2020-01-01').toISOString();

      expect(picker.formatDate(dateString)).toEqual('01. Januar 2020');
      expect(spy).toHaveBeenCalledWith(picker.displayFormat, dateString, {dayNames: DAY_NAMES, dayShortNames: DAY_SHORT_NAMES, monthNames: MONTH_NAMES, monthShortNames: MONTH_SHORT_NAMES})
    });
  });

  describe('#render', () => {
    let page: SpecPage;

    beforeEach(async () => {
      page = await newSpecPage({
        components: [IonicDatepicker]
      });
    });

    describe('on mobile', () => {
      let component: HTMLIonicDatepickerElement;

      beforeEach(async () => {
        const min = new Date('2019-01-01').toISOString();
        const max = new Date('2021-01-01').toISOString();
        const defaultDate = new Date('2020-04-16').toISOString();
        const html = `<ionic-datepicker max="${max}" ion-date-time-on-mobile="true" min="${min}" default-date="${defaultDate}"></ionic-datepicker>`;

        page.win.matchMedia = jest.fn().mockReturnValue({
          matches: true
        });
        await page.setContent(html);

        component = page.body.querySelector('ionic-datepicker');
      });

      it('renders ionDateTimePicker on mobile', async () => {
        expect(page.root).toEqualHtml(`
          <ionic-datepicker default-date="2020-04-16T00:00:00.000Z" ion-date-time-on-mobile="true" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z">
            <mock:shadow-root>
            <ion-datetime canceltext="Abbrechen" displayformat="DD. MMMM YYYY" donetext="Okay" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z" pickerformat="DD. MMMM YYYY" placeholder="Datum auswählen" value="2020-04-16T00:00:00.000Z"></ion-datetime>
            </mock:shadow-root>
          </ionic-datepicker>
        `);
      });

      it('renders custom paceholder', async () => {
        component.placeholder = 'test';
        component.defaultDate = null;

        await page.waitForChanges();

        expect(page.root).toEqualHtml(`
          <ionic-datepicker default-date="2020-04-16T00:00:00.000Z" ion-date-time-on-mobile="true" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z">
            <mock:shadow-root>
              <ion-datetime canceltext="Abbrechen" displayformat="DD. MMMM YYYY" donetext="Okay" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z" pickerformat="DD. MMMM YYYY" placeholder="test"></ion-datetime>
            </mock:shadow-root>
          </ionic-datepicker>
        `);
      });

      it('renders error class', async () => {
        component.error = true;

        await page.waitForChanges();

        expect(page.root).toEqualHtml(`
          <ionic-datepicker default-date="2020-04-16T00:00:00.000Z" ion-date-time-on-mobile="true" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z">
            <mock:shadow-root>
              <ion-datetime canceltext="Abbrechen" class="ionic-datepicker-error" displayformat="DD. MMMM YYYY" donetext="Okay" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z" pickerformat="DD. MMMM YYYY" placeholder="Datum auswählen" value="2020-04-16T00:00:00.000Z"></ion-datetime>
            </mock:shadow-root>
          </ionic-datepicker>
        `);
      });

      it('renders disbled class', async () => {
        component.disabled = true;

        await page.waitForChanges();

        expect(page.root).toEqualHtml(`
          <ionic-datepicker default-date="2020-04-16T00:00:00.000Z" ion-date-time-on-mobile="true" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z">
            <mock:shadow-root>
              <ion-datetime canceltext="Abbrechen" class="disabled" disabled="" displayformat="DD. MMMM YYYY" donetext="Okay" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z" pickerformat="DD. MMMM YYYY" placeholder="Datum auswählen" value="2020-04-16T00:00:00.000Z"></ion-datetime>
            </mock:shadow-root>
          </ionic-datepicker>
        `);
      });
    });

    describe('on desktop', () => {
      let component: HTMLIonicDatepickerElement;

      beforeEach(async () => {
        const min = new Date('2019-01-01').toISOString();
        const max = new Date('2021-01-01').toISOString();
        const defaultDate = new Date('2020-04-16').toISOString();
        const html = `<ionic-datepicker max="${max}" min="${min}" default-date="${defaultDate}"></ionic-datepicker>`;
        page.win.matchMedia = jest.fn().mockReturnValue({
          matches: false
        });
        await page.setContent(html);

        component = page.body.querySelector('ionic-datepicker');
      });

      it('renders custom date', async () => {
        expect(page.root).toEqualHtml(`
          <ionic-datepicker default-date="2020-04-16T00:00:00.000Z" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z">
            <mock:shadow-root>
              <span>
                16. April 2020
              </span>
              <button class="hidden-button" type="button"></button>
            </mock:shadow-root>
          </ionic-datepicker>
        `);
      });

      it('renders custom paceholder', async () => {
        component.placeholder = 'test';
        component.defaultDate = null;

        await page.waitForChanges();

        expect(page.root).toEqualHtml(`
          <ionic-datepicker default-date="2020-04-16T00:00:00.000Z" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z">
            <mock:shadow-root>
              <span class="placeholder">
                test
              </span>
              <button class="hidden-button" type="button"></button>
            </mock:shadow-root>
          </ionic-datepicker>
        `);
      });

      it('renders error class', async () => {
        component.error = true;

        await page.waitForChanges();

        expect(page.root).toEqualHtml(`
          <ionic-datepicker default-date="2020-04-16T00:00:00.000Z" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z">
            <mock:shadow-root>
              <span class="ionic-datepicker-error">
                16. April 2020
              </span>
              <button class="hidden-button" type="button"></button>
            </mock:shadow-root>
          </ionic-datepicker>
        `);
      });

      it('renders disbled class', async () => {
        component.disabled = true;

        await page.waitForChanges();

        expect(page.root).toEqualHtml(`
          <ionic-datepicker default-date="2020-04-16T00:00:00.000Z" max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z">
            <mock:shadow-root>
              <span class="disabled">
                16. April 2020
              </span>
              <button class="disabled hidden-button" type="button"></button>
            </mock:shadow-root>
          </ionic-datepicker>
        `);
      });
    });
  });
});

