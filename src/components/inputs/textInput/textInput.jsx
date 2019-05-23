import React, { Component } from 'react';
import PropTypes from "prop-types";

import Helpers, {
  STATUS_STRINGS,
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
    const { parent, componentStateKey, name } = this.props;
    parent.setState(state => ({
      [componentStateKey]: {
        ...state[componentStateKey],
        [name]: this
      }
    }));
  }

  componentDidUpdate() {
    const { status } = this.state;
    const { defaultStatus } = this.props;
    if ([1, 2].includes(status)) {
      const component = this;
      setTimeout(() => {
        component.setState({ status: defaultStatus });
      }, 3000);
    }
  }

	handleValueChange = e => {
	  const component = this;
	  this.setState({ lastTyped: Date.now(), inputValue: e.target.value });

	  setTimeout(() => {
	    const { inputValue, lastTyped } = component.state;
	    const { config: { regex, action } } = component.props;
	    if ((Date.now() - lastTyped) >= 1000) {
	      if (regex instanceof String) component.setStatus(Helpers.Regex[regex].test(inputValue) ? 6 : 5);
	      else if (regex) component.setStatus(regex.test(inputValue) ? 6 : 5);
	      action();
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

	setStatus = (status, alertText = '') => this.setState({
	  status: STATUS_STRINGS.findIndex(string => string === status) || 0,
	  alertText
	})

	isValid = () => this.state.status === 5;

	render() {
	  const { inputValue, alertText, status } = this.state;
	  const { config } = this.props;

	  const errorClass = `neo-font--comment ${config.type}__error--`;
	  const commentClass = `neo-font--comment ${config.type}__comment--`;

	  let mainClass = `${config.type}--${STATUS_STRINGS[status]}`;
	  mainClass += config.floatingLabel ? " neo-font--input has-float-label" : "";

	  return (
	    <div className={mainClass} >
	      <div className={`${config.type}__label neo-font--input`}>{config.label}</div>

	      <input
	        id={config.label.replace(" ", "")}
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
    regex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.symbol
    ]),
  }).isRequired
}

TextInput.defaultProps = {
  ...defaultReactiveUIDefaultProps
}

export default TextInput;
