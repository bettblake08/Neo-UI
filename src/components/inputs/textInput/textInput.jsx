import React, { Component } from 'react';
import PropTypes from "prop-types";

import Helpers, {
  STATUS_STRINGS,
  COMPONENT_STATUS_CLASS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps
} from "../../../helpers";


class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.defaultStatus,
      alertText: "",
      inputValue: props.config.inputValue || "",
      inputLength: props.config.length || 999
    }

    this.textInputRef = React.createRef();
  }

  componentDidMount() {
    Helpers.Common.attachToParentComponent(this);
  }

  componentDidUpdate() {
    Helpers.Common.resetInteractiveComponentStatus(this);
  }
 
	handleValueChange = e => {
	  const component = this;
	  this.setState({ lastTyped: Date.now(), inputValue: e.target.value });

	  setTimeout(() => {
	    const { inputValue, lastTyped } = component.state;
	    const { config: { testInput } } = component.props;
			
	    if ((Date.now() - lastTyped) >= 1000) {
	      let status = 0;
	      if (typeof testInput === "string") status = Helpers.Regex[testInput].test(inputValue) ? 6 : 5;
	      else if (testInput instanceof RegExp) status = testInput.test(inputValue) ? 6 : 5;
	      else if (testInput instanceof Function) status = testInput(inputValue) ? 6 : 5;

	      component.setState({ status });
	    }
	  }, 1000);
	};
  
	focus = () => this.textInputRef.current.focus();

	setFloatingLabel = () => {
	  const { config } = this.props;
	  if (config.floatingLabel) {
	    return (
	      <label htmlFor={config.label.replace(" ", "")}>{config.label}</label>
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

	isValid = () => this.state.status === 5;

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
	        type="text"
	        className="neo-font--input"
	        value={inputValue}
	        onChange={this.handleValueChange}
	        placeholder={config.placeholder || ""}
	      />

	      {this.setFloatingLabel()}

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
      PropTypes.symbol,
      PropTypes.func		
    ]),
  }).isRequired
}

TextInput.defaultProps = {
  ...defaultReactiveUIDefaultProps
}

export default TextInput;
