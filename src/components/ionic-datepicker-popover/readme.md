# my-component



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                                                                 | Type      | Default                                            |
| --------------- | --------------- | --------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| `disabled`      | `disabled`      | Flag if datepicking is disabled Default: disabled                           | `boolean` | `false`                                            |
| `max`           | `max`           | Max selectable date as iso date\|datetime string Default: today + 100 years | `string`  | `DateTime.local().plus({years: 100}).toISODate()`  |
| `min`           | `min`           | Min selectable date as iso date\|datetime string Default: today - 100 years | `string`  | `DateTime.local().minus({years: 100}).toISODate()` |
| `pickerOptions` | --              | Options for the js-datepicker Default: {}                                   | `object`  | `{}`                                               |
| `selectedDate`  | `selected-date` | selected default date as iso date\|datetime string Default: today           | `string`  | `DateTime.local().toISODate()`                     |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
