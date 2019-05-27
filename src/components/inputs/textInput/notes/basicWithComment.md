## Text Input

A standard text input with a comment

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
                length: 30,
                comment: "This is a test comment."
            }} />
        </div>
      )
    }
}
```
