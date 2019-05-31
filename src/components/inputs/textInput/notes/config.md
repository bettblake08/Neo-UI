#### Specific Configurations

| Configuration          | Type & Example                                     |  Definition                                                                                    |
| ---------------------- | -------------------------------------------------  | ---------------------------------------------------------------------------------------------- |
| floatingLabel          | Boolean { eg. default `false` } `Optional`         | This is used to activate the floatling effect of the input label.                              |
| testInput              | String/Regex/Function { eg. `(inputValue) => true` } `Optional` | This is used to test the input given.                                             |
| type                   | String { eg. default `neo-text-input` } `Optional` | This allows for the use of a custom CSS class name for the text input component                |
| placeholder            | String { eg. `Any placeholder` } `Optional`        | This adds placeholder text to the input, which enables the floaing effect of the label         |
| label                  | String { eg. `Email Address` } `Optional`          | This is the input label text                                                                   |
| comment                | String { eg. `Max. allowed is 80` } `Optional`     | This is the input comment informing a user to enter an expected value                          |
| inputValue             | String { eg. `johndoe@email.com` } `Optional`      | This is used to preload the text input with a value                                            |
| inputType              | String { eg. default `text` } `Optional`           | This is used to set the input type eg. ( `text`, `password` )                                  |
| length                 | Number { eg. default `999` } `Optional`            | This is used to set the maximum input length                                                   |
