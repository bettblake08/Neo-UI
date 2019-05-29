## Basic Button

A standard button in response to a failed attempt

### Configurations

{{interactiveUIConfig}}

{{ButtonConfig}}

### Example

```javascript
export default class BaseComponent extends Component {
    state = {
        neoComponents: {}
    }

    // This is used to mimic an asynchronous call demonstrating how the button updates its
    // state
    delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

    onClick = () => {
        const { neoComponents } = this.state;
        neoComponents['saveButton'].setStatus('loading');
        this.delay().then(() => {
            neoComponents['saveButton'].setStatus('fail');
        });
    }

    render() {
        return (
            <Button
                name="saveButton"
                parent={this}
                config={{
                    label: "Save",
                    action: this.onClick
                }}
            />
        )
    }
}
```
