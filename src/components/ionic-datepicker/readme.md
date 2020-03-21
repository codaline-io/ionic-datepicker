# my-component



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute        | Description                                                                    | Type                                 | Default                                            |
| ---------------- | ---------------- | ------------------------------------------------------------------------------ | ------------------------------------ | -------------------------------------------------- |
| `defaultDate`    | `default-date`   | default date as iso date\|datetime string Default: today                       | `string`                             | `DateTime.local().toISODate()`                     |
| `disabled`       | `disabled`       | Flag if datepicking is disabled Default: disabled                              | `boolean`                            | `false`                                            |
| `displayFormat`  | `display-format` | How the date should be formatted for display purposes Default: "DDD"           | `string`                             | `'DDD'`                                            |
| `error`          | `error`          | Flag if it should be marked as error Default: false                            | `boolean`                            | `false`                                            |
| `errorClass`     | `error-class`    | Possibility to overwrite the error css class Default: 'ionic-datepicker-error' | `string`                             | `'ionic-datepicker-error'`                         |
| `max`            | `max`            | Max selectable date as iso date\|datetime string Default: today + 100 years    | `string`                             | `DateTime.local().plus({years: 100}).toISODate()`  |
| `min`            | `min`            | Min selectable date as iso date\|datetime string Default: today - 100 years    | `string`                             | `DateTime.local().minus({years: 100}).toISODate()` |
| `pickerOptions`  | --               | Options for the js-datepicker Default: {}                                      | `object`                             | `{}`                                               |
| `popoverOptions` | --               | Change popover options, PopoverOptions \| {} Default: {}                       | `PopoverOptions<ComponentRef> \| {}` | `{}`                                               |


## Events

| Event     | Description                                                     | Type                  |
| --------- | --------------------------------------------------------------- | --------------------- |
| `changes` | Event that emits the iso date string everytime the date changes | `CustomEvent<string>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
