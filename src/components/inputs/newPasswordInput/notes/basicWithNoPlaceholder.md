## Text Input

A standard new password input no placeholder

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
        <PasswordInput
            name="password"
            parent={this}
            config={{}}
          />
        </div>
      )
    }
}
```
