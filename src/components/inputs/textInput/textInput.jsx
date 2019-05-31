import React, { Component } from 'react';
import PropTypes from "prop-types";

import {
  STATUS_STRINGS,
  COMPONENT_STATUS_CLASS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps,
  Common
} from "../../../helpers";

import { getInputStatus } from "./helpers";


class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.defaultStatus,
      alertText: "",
      lastTyped: Date.now(),
      inputValue: props.config.inputValue || ""
    }

    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    Common.attachToParentComponent(this);
  }

  componentDidUpdate() {
    Common.resetInteractiveComponentStatus(this);
  }
 
	handleValueChange = e => {
	  const component = this;
	  const { config: { length = 999, testInput } } = this.props;
	  this.setState({
	    lastTyped: Date.now(),
	    inputValue: e.target.value.substr(0, length)
	  });

	  setTimeout(() => {
	    const { inputValue, lastTyped } = component.state;
	    const lastChanged = process.env.NODE_ENV === 'test' ? Date.now() - 1001: lastTyped;

	    if ((Date.now() - lastChanged) >= 1000) {
	      component.setState({ status: getInputStatus(inputValue, testInput) ? 6 : 5 });
	    }
	  }, 1000);
	};
  
	focus = () => this.textInputRef.current.focus();

	setFloatingLabel = label => {
	  const { config } = this.props;
	  if (config.floatingLabel) {
	    return (
	      <label htmlFor={label.replace(" ", "")}>{label}</label>
	    );
	  }
	}

	setStatus = (status, alertText = '') => {
	  const statusIndex = STATUS_STRINGS.findIndex(string => string === status)
	  this.setState({
	    status:  statusIndex > 0 ? statusIndex : 0,
	    alertText
	  })
	}

	isValid = () => this.state.status === 6;

	getValue = () => this.state.inputValue;

	render() {
	  const { inputValue, alertText, status } = this.state;
	  const { config, name } = this.props;
	  const label = config.label || name;
	  const typeClass = config.type || "neo-text-input";
	  const errorClass = `neo-font--comment ${typeClass}__error--`;
	  const commentClass = `neo-font--comment ${typeClass}__comment--`;

	  let mainClass = `${typeClass}--${COMPONENT_STATUS_CLASS[status]}`;
	  mainClass += config.floatingLabel ? " neo-font--input has-float-label" : "";
		
	  return (
	    <div className={mainClass} >
	      <div className={`${typeClass}__label neo-font--input`}>{label}</div>

	      <input
	        id={label.replace(" ", "")}
	        ref={this.textInputRef}
	        type={config.inputType || "text"}
	        className="neo-font--input"
	        value={inputValue}
	        onChange={this.handleValueChange}
	        placeholder={config.placeholder || ""}
	      />

	      {this.setFloatingLabel(label)}

	      <div className={`${commentClass}${alertText ? "disabled" : "active"}`}>{config.comment}</div>
	      <div className={`${errorClass}${alertText ? "active" : 'disabled'}`}>{alertText}</div>

	    </div>
	  );
	}
}

TextInput.propTypes = {
  ...defaultReactiveUIProps,
  config: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    floatingLabel: PropTypes.bool,
    comment: PropTypes.string,
    inputValue: PropTypes.string,
    length: PropTypes.number,
    testInput: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp),
      PropTypes.func		
    ]),
  }).isRequired
}

TextInput.defaultProps = {
  ...defaultReactiveUIDefaultProps
}

export default TextInput;
