## Text Input

A standard text input no placeholder

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
                length: 30
            }} />
        </div>
      )
    }
}
```
