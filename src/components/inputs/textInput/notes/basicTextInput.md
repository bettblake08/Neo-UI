## Text Input

A standard text input

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
