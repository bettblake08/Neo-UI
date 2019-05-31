> `defaultStatus` config has been disabled.

#### Specific Configurations

| Configuration          | Type & Example                                     |  Definition                                                                                    |
| ---------------------- | -------------------------------------------------  | ---------------------------------------------------------------------------------------------- |
| floatingLabel          | Boolean { eg. default `false` } `Optional`         | This is used to activate the floating effect of the input label.                               |
| testInput              | String / Regex / Function { eg. `(inputValue) => true` } `Optional` | This is used to test the input given.                                         |
| type                   | String { eg. default `neo-text-input` } `Optional` | This allows for the use of a custom CSS class name for the text input component                |
| placeholder            | String { eg. `Any placeholder` } `Optional`        | This adds placeholder text to the input, which enables the floating effect of the label        |
| inputs                 | Object { eg. `{ password: {}, rePassword: {} }` } `Optional` | This allows configs for each password input to be overridden. See `textInput` documentation    |
