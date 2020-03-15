import React, { Component } from "react";
import PropTypes from "prop-types";

import "./baseComponent.scss";

export default class BaseComponent extends Component {
  static propTypes = {
    children: PropTypes.shape({}).isRequired,
    componentType: PropTypes.string,
    componentModifier: PropTypes.string
  };

  static defaultProps = {
    componentType: "input",
    componentModifier: "default"
  };

  constructor(props) {
    super(props);

    this.state = {
      neoComponents: {}
    };

    this.backgroundRef = React.createRef();
  }

  componentDidMount() {
    this.setupMouseEventListener(this.backgroundRef);
  }

  delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

  getClone = () => {
    const { children, componentType } = this.props;
    const { props } = children;
    let config = { ...props.config };

    if (componentType === "button") {
      config.action = () =>
        this.onClick(props.name, props.config.action().actionStatus);
    }

    return React.cloneElement(children, {
      parent: this,
      config
    });
  };

  onClick = (inputName, status) => {
    const { neoComponents } = this.state;
    neoComponents[inputName].setStatus("loading");
    this.delay().then(() => {
      neoComponents[inputName].setStatus(status);
    });
  };

  setupMouseEventListener = ref => {
    window.onmousemove = e => {
      ref.current.style["margin-left"] = `${(window.innerWidth / 2 -
        e.clientX) /
        10}px`;
      ref.current.style["margin-top"] = `${(window.innerHeight / 2 -
        e.clientY) /
        10}px`;
    };
  };

  render() {
    const { componentModifier } = this.props;

    return (
      <div
        className={`demo-box ${
          componentModifier === "default"
            ? ""
            : `demo-box--${componentModifier}`
        }`}
      >
        <div className="demo-box__background" ref={this.backgroundRef}></div>
        <div className="demo-box__input">{this.getClone()}</div>
      </div>
    );
  }
}
