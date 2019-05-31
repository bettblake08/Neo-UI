## Text Input

A standard new password input with minimal configurations

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
            config={{
              placeholder: "At least 1 of each (A-Z),(a-z),(1-9),(@$.#). 8-16 characters."
            }} />
        </div>
      )
    }
}
```
