#### Common

| Configuration          | Type & Example                                     |  Definition                                                                                    |
| ---------------------- | -------------------------------------------------  | ---------------------------------------------------------------------------------------------- |
| parent                 | React Component { eg. `this` } `Required`          | This is a React Component the UI component attaches itself to. This allows a user to access the UI Component |
| name                   | String { eg. default `saveButton` } `Required`     | This is the key of the UI component a user can use in the parent component |
| componentStateKey      | String { eg. default `neoComponents` } `Optional`  | This is the key used by the UI component to attach itself to the parent component. This is one of the state keys defined |
| defaultStatus          | Number { eg. default `0` } `Optional`              | This is to specify the default state of the UI component. { `0` Normal, `4` Warning, `5` Success:fixed, `6` Failed:fixed } |
