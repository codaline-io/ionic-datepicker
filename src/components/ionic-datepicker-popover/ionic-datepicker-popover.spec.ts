import datepicker from 'js-datepicker';
import { newSpecPage } from '@stencil/core/testing';
import {win} from '@stencil/core/internal/testing';
(win as any).datepicker = datepicker

import { IonicDatepickerPopover } from './ionic-datepicker-popover';
import { DEFAULT_OKAY_LABEL, DEFAULT_YEAR_LABEL, DAY_SHORT_NAMES, MONTH_NAMES, MONTH_SHORT_NAMES } from '../utils';

describe('IonicDatepickerPopover', () => {
  let pickerPopover: IonicDatepickerPopover;
  let windowSpy;

  beforeEach(() => {
    (global as any).window.datepicker = datepicker;
    windowSpy = jest.spyOn((global as any).window, 'datepicker').mockImplementation(() => ({}));
    pickerPopover = new IonicDatepickerPopover();
  });

  afterEach(() => {
    windowSpy.mockRestore();
    delete (global as any).window.datepicker;
  });

  describe('#componentDidMount', () => {
    it('initialises js-datepicker', () => {
      pickerPopover.min = new Date('2019-01-01').toISOString();
      pickerPopover.max = new Date('2021-01-01').toISOString();
      pickerPopover.componentDidLoad();

      expect(windowSpy).toHaveBeenCalledWith(
        undefined,
        {
          "alwaysShow": true,
          "customDays": DAY_SHORT_NAMES,
          "customMonths": MONTH_NAMES,
          "customOverlayMonths": MONTH_SHORT_NAMES,
          "dateSelected": null,
          "maxDate": new Date(pickerPopover.max),
          "minDate": new Date(pickerPopover.min),
          "onSelect": pickerPopover.onSelect,
          "overlayButton": DEFAULT_OKAY_LABEL,
          "overlayPlaceholder": DEFAULT_YEAR_LABEL,
          "showAllDates": true,
          "startDay": 1
        }
      );
      expect(pickerPopover.picker.disabled).toBe(false);
    });

    it('overwrites picker options', () => {
      pickerPopover.min = new Date('2019-01-01').toISOString();
      pickerPopover.max = new Date('2021-01-01').toISOString();
      pickerPopover.selectedDate = new Date('2021-01-01').toISOString();
      pickerPopover.disabled = true;
      pickerPopover.pickerOptions = {
        alwaysShow: false,
        customDays: ['1', '2', '3', '4', '5', '6', '7'],
        customMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        customOverlayMonths: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        overlayButton: 'Yay',
        overlayPlaceholder: 'Year',
        showAllDates: false,
        startDay: 0
      };
      pickerPopover.componentDidLoad();

      expect(windowSpy).toHaveBeenCalledWith(
        undefined,
        {
          "alwaysShow": false,
          "customDays": ['1', '2', '3', '4', '5', '6', '7'],
          "customMonths": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          "customOverlayMonths": ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          "dateSelected": new Date(pickerPopover.selectedDate),
          "maxDate": new Date(pickerPopover.max),
          "minDate": new Date(pickerPopover.min),
          "onSelect": pickerPopover.onSelect,
          "overlayButton": 'Yay',
          "overlayPlaceholder": 'Year',
          "showAllDates": false,
          "startDay": 0
        }
      );
      expect(pickerPopover.picker.disabled).toBe(true);
    });
  });

  describe('#onSelect', () => {
    let dismissSpy;
    const popoverMock = {
      dismiss: () => {}
    };

    beforeEach(() => {
      spyOn(document, 'querySelector').and.returnValue(popoverMock);
      dismissSpy = spyOn(popoverMock, 'dismiss');
    });

    it('dismiss popover with selected date', () => {
      pickerPopover.onSelect({ dateSelected: new Date('2020-01-01') });
      expect(dismissSpy).toHaveBeenCalledWith({ date: '2020-01-01' });
    });

    it('dismiss popover with null if no date selected', () => {
      pickerPopover.onSelect({});
      expect(dismissSpy).toHaveBeenCalledWith({ date: null });
    });
  });

  describe('#setDisabled', () => {
    beforeEach(() => {
      pickerPopover.picker = {
        disabled: false
      }
    });

    it('updates disabled - disables', () => {
      pickerPopover.setDisabled(true);

      expect(pickerPopover.picker.disabled).toBe(true);
    });

    it('updates disabled - enables', () => {
      pickerPopover.disabled = true;
      pickerPopover.setDisabled(false);

      expect(pickerPopover.picker.disabled).toBe(false);
    });
  });

  describe('#render', () => {
    it('renders div and sets element', async () => {
      const min = new Date('2019-01-01').toISOString();
      const max = new Date('2021-01-01').toISOString();
      const selected = new Date('2020-04-16').toISOString();
      const html = `<ionic-datepicker-popover max="${max}" min="${min}" selected-date="${selected}"></ionic-datepicker-popover>`;

      const page = await newSpecPage({
        components: [IonicDatepickerPopover]
      });
      (page.win as any).datepicker = datepicker;

      await page.setContent(html);

      expect(page.root).toEqualHtml(`
<ionic-datepicker-popover max="2021-01-01T00:00:00.000Z" min="2019-01-01T00:00:00.000Z" selected-date="2020-04-16T00:00:00.000Z">
  <div style="position: relative;">
    <div class="container"></div>
    <div class="qs-datepicker-container" style="top: 0px; left: 0px;">
      <div class="qs-datepicker">
        <div class="qs-controls">
          <div class="qs-arrow qs-left"></div>
          <div class="qs-month-year">
            <span class="qs-month">
              April
            </span>
            <span class="qs-year">
              2020
            </span>
          </div>
          <div class="qs-arrow qs-right"></div>
        </div>
        <div class="qs-squares">
          <div class="qs-day qs-square">
            Mo
          </div>
          <div class="qs-day qs-square">
            Di
          </div>
          <div class="qs-day qs-square">
            Mi
          </div>
          <div class="qs-day qs-square">
            Do
          </div>
          <div class="qs-day qs-square">
            Fr
          </div>
          <div class="qs-day qs-square">
            Sa
          </div>
          <div class="qs-day qs-square">
            So
          </div>
          <div class="Mo qs-disabled qs-empty qs-outside-current-month qs-square">
            <span class="qs-num">
              30
            </span>
          </div>
          <div class="Di qs-disabled qs-empty qs-outside-current-month qs-square">
            <span class="qs-num">
              31
            </span>
          </div>
          <div class="Mi qs-num qs-square">
            <span class="qs-num">
              1
            </span>
          </div>
          <div class="Do qs-num qs-square">
            <span class="qs-num">
              2
            </span>
          </div>
          <div class="Fr qs-num qs-square">
            <span class="qs-num">
              3
            </span>
          </div>
          <div class="Sa qs-num qs-square">
            <span class="qs-num">
              4
            </span>
          </div>
          <div class="So qs-num qs-square">
            <span class="qs-num">
              5
            </span>
          </div>
          <div class="Mo qs-num qs-square">
            <span class="qs-num">
              6
            </span>
          </div>
          <div class="Di qs-num qs-square">
            <span class="qs-num">
              7
            </span>
          </div>
          <div class="Mi qs-num qs-square">
            <span class="qs-num">
              8
            </span>
          </div>
          <div class="Do qs-num qs-square">
            <span class="qs-num">
              9
            </span>
          </div>
          <div class="Fr qs-num qs-square">
            <span class="qs-num">
              10
            </span>
          </div>
          <div class="Sa qs-num qs-square">
            <span class="qs-num">
              11
            </span>
          </div>
          <div class="So qs-num qs-square">
            <span class="qs-num">
              12
            </span>
          </div>
          <div class="Mo qs-num qs-square">
            <span class="qs-num">
              13
            </span>
          </div>
          <div class="Di qs-num qs-square">
            <span class="qs-num">
              14
            </span>
          </div>
          <div class="Mi qs-num qs-square">
            <span class="qs-num">
              15
            </span>
          </div>
          <div class="Do qs-active qs-current qs-num qs-square">
            <span class="qs-num">
              16
            </span>
          </div>
          <div class="Fr qs-num qs-square">
            <span class="qs-num">
              17
            </span>
          </div>
          <div class="Sa qs-num qs-square">
            <span class="qs-num">
              18
            </span>
          </div>
          <div class="So qs-num qs-square">
            <span class="qs-num">
              19
            </span>
          </div>
          <div class="Mo qs-num qs-square">
            <span class="qs-num">
              20
            </span>
          </div>
          <div class="Di qs-num qs-square">
            <span class="qs-num">
              21
            </span>
          </div>
          <div class="Mi qs-num qs-square">
            <span class="qs-num">
              22
            </span>
          </div>
          <div class="Do qs-num qs-square">
            <span class="qs-num">
              23
            </span>
          </div>
          <div class="Fr qs-num qs-square">
            <span class="qs-num">
              24
            </span>
          </div>
          <div class="Sa qs-num qs-square">
            <span class="qs-num">
              25
            </span>
          </div>
          <div class="So qs-num qs-square">
            <span class="qs-num">
              26
            </span>
          </div>
          <div class="Mo qs-num qs-square">
            <span class="qs-num">
              27
            </span>
          </div>
          <div class="Di qs-num qs-square">
            <span class="qs-num">
              28
            </span>
          </div>
          <div class="Mi qs-num qs-square">
            <span class="qs-num">
              29
            </span>
          </div>
          <div class="Do qs-num qs-square">
            <span class="qs-num">
              30
            </span>
          </div>
          <div class="Fr qs-disabled qs-empty qs-outside-current-month qs-square">
            <span class="qs-num">
              1
            </span>
          </div>
          <div class="Sa qs-disabled qs-empty qs-outside-current-month qs-square">
            <span class="qs-num">
              2
            </span>
          </div>
          <div class="So qs-disabled qs-empty qs-outside-current-month qs-square">
            <span class="qs-num">
              3
            </span>
          </div>
        </div>
        <div class="qs-hidden qs-overlay">
          <div>
            <input class="qs-overlay-year" placeholder="Jahr">
            <div class="qs-close">
              ✕
            </div>
          </div>
          <div class="qs-overlay-month-container">
            <div class="qs-overlay-month" data-month-num="0">
              <span data-month-num="0">
                Jan
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="1">
              <span data-month-num="1">
                Feb
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="2">
              <span data-month-num="2">
                Mär
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="3">
              <span data-month-num="3">
                Apr
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="4">
              <span data-month-num="4">
                Mai
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="5">
              <span data-month-num="5">
                Jun
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="6">
              <span data-month-num="6">
                Jul
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="7">
              <span data-month-num="7">
                Aug
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="8">
              <span data-month-num="8">
                Sep
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="9">
              <span data-month-num="9">
                Okt
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="10">
              <span data-month-num="10">
                Nov
              </span>
            </div>
            <div class="qs-overlay-month" data-month-num="11">
              <span data-month-num="11">
                Dez
              </span>
            </div>
          </div>
          <div class="qs-disabled qs-submit">
            Okay
          </div>
        </div>
      </div>
    </div>
  </div>
</ionic-datepicker-popover>
      `);
    });
  });
});

