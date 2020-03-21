# Neo UI
[![CircleCI](https://circleci.com/gh/bettblake08/Neo-UI.svg?style=svg)](https://circleci.com/gh/bettblake08/Neo-UI)
[![Maintainability](https://api.codeclimate.com/v1/badges/c0eabe343848efaf00c3/maintainability)](https://codeclimate.com/github/bettblake08/Neo-UI/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c0eabe343848efaf00c3/test_coverage)](https://codeclimate.com/github/bettblake08/Neo-UI/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/bettblake08/Neo-UI/badge.svg?targetFile=package.json)](https://snyk.io/test/github/bettblake08/Neo-UI?targetFile=package.json)
![Publishing Status](https://github.com/bettblake08/Neo-UI/workflows/Neo-UI%20package/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/80c0b094-b4da-44ed-bf43-cf905e95fbf0/deploy-status)](https://app.netlify.com/sites/neo-ui-react/deploys)
[![Storybook](https://cdn.jsdelivr.net/gh/storybooks/brand@master/badge/badge-storybook.svg)][2]

## Description
This is a React UI components library.

## Getting Started

### Prerequisites

- NPM
- React

### Installing

A step by step guide to help you get started with Neo-UI for react

Firstly, run

```
npm install @bettbrian08/neo-ui-react
```

In your root React Component, import this to have the default CSS stylings for Neo-UI

```javascript
import "@bettbrian08/neo-ui-react/dist/themes/default";
```

Here is an example for how to use a UI component

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
            neoComponents['saveButton'].setStatus('success');
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

For more examples, visit the [storybook documentation][2]

## Built With

* [React][3] - The javascript framework for frontend development
* [Storybook][4] - The UI components development environment

## Contributing

Please read [CONTRIBUTING.md][7] for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer][5] for versioning. For the versions available, see the [tags on this repository][8]. 

## Authors

* **Brian K. Bett** - *Initial work*

See also the list of [contributors][6] who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md][9] file for details

## Credit

Created by [@bettblake08][1].

[1]: https://github.com/bettblake08
[2]: https://neo-ui-react.netlify.com
[3]: https://reactjs.org/
[4]: https://storybook.js.org/
[5]: http://semver.org/
[6]: https://github.com/contributors
[7]: https://gist.github.com/PurpleBooth/b24679402957c63ec426
[8]: https://github.com/your/project/tags
[9]: https://github.com/bettblake08/Neo-UI/blob/master/LICENSE