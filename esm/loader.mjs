import { a as patchEsm, b as bootstrapLazy } from './index-f3e464ac.js';

const defineCustomElements = (win, options) => patchEsm().then(() => {
  return bootstrapLazy([["ionic-datepicker",[[1,"ionic-datepicker",{"displayFormat":[1,"display-format"],"pickerFormat":[1,"picker-format"],"disabled":[4],"pickerOptions":[16],"defaultDate":[1,"default-date"],"placeholder":[1],"ionDateTimeOnMobile":[4,"ion-date-time-on-mobile"],"max":[1],"min":[1],"required":[4],"error":[4],"ionPopoverOptions":[16],"mode":[1],"errorClass":[1,"error-class"],"monthNames":[16],"monthShortNames":[16],"dayNames":[16],"dayShortNames":[16],"okayLabel":[1,"okay-label"],"cancelLabel":[1,"cancel-label"],"yearLabel":[1,"year-label"],"formattedDate":[32]}]]],["ionic-datepicker-popover",[[0,"ionic-datepicker-popover",{"disabled":[4],"pickerOptions":[16],"selectedDate":[1,"selected-date"],"max":[1],"min":[1]}]]]], options);
});

export { defineCustomElements };
