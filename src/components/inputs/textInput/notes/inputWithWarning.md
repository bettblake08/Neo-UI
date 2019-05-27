## Text Input

A standard text input with a warning tint to it.

### Configurations

{{interactiveUIConfig}}

{{textInputConfig}}

### Example

```javascript
export default class BaseComponent extends Component {
    state = {
        neoComponents: {}
    }

    render() {
      return (
        <div className="demo-box">
          <TextInput
            name="email"
            defaultStatus={4}
            config={{
                floatingLabel: true,
                label: "Email Address",
                placeholder: "Any placeholder"
                length: 30
            }} />
        </div>
      )
    }
}
```
