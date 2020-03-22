import { a as patchEsm, b as bootstrapLazy } from './index-f3e464ac.js';

const defineCustomElements = (win, options) => patchEsm().then(() => {
  return bootstrapLazy([["ionic-datepicker",[[1,"ionic-datepicker",{"displayFormat":[1,"display-format"],"disabled":[4],"pickerOptions":[16],"defaultDate":[1,"default-date"],"placeholder":[1],"nativeOnMobile":[4,"native-on-mobile"],"max":[8],"min":[8],"required":[4],"error":[4],"popoverOptions":[16],"errorClass":[1,"error-class"],"formattedDate":[32],"date":[32]}]]],["ionic-datepicker-popover",[[0,"ionic-datepicker-popover",{"disabled":[4],"pickerOptions":[16],"selectedDate":[8,"selected-date"],"max":[8],"min":[8]}]]]], options);
});

export { defineCustomElements };
