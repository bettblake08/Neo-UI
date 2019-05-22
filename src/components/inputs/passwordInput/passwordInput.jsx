import React, { Component } from "react";
import PropTypes from "prop-types";
import { STATUS_STRINGS } from "../../../helpers";

class PasswordInput extends Component {

	static propTypes = {
	  config: PropTypes.shape({
	    class: PropTypes.string.isRequired,
	    floatingLabel: PropTypes.bool,
	    label: PropTypes.string.isRequired,
	    placeholder: PropTypes.string,
	    action: PropTypes.func,
	    inputValue: PropTypes.string
	  }).isRequired,
	  status: PropTypes.number,
	  parent: PropTypes.shape().isRequired,
	  index: PropTypes.number,
	  regex: PropTypes.instanceOf(RegExp)
	}

	static defaultProps = {
	  status: 0,
	  index: 0,
	  regex: null
	}

	constructor(props) {
	  super(props);

	  this.state = {
	    defaultStatus: props.status,
	    status: props.status,
	    errorText: "",
	    inputValue: props.config.inputValue || "",
	    action: !props.config.action ? () => {} : props.config.action,
	    lastTyped: Date.now()
	  };

	  this.inputRef = React.createRef();

	  this.handleValueChange = this.handleValueChange.bind(this);
	  this.focus = this.focus.bind(this);
	  this.setFloatingLabel = this.setFloatingLabel.bind(this);
	  this.setStatus = this.setStatus.bind(this);
	}

	componentDidMount() {
	  var state = this.props.parent.state;
	  state.passwordInputs.push(this);
	  this.props.parent.setState(state);
	}

	componentDidUpdate() {
	  const { status, defaultStatus } = this.state;
	  if ([1,2].includes(status)) {
	    var component = this;
	    setTimeout(() => {
	      component.setState({
	        status: defaultStatus
	      });
	    }, 3000);
	  }
	}

	setStatus = status => this.setState({ status });

	handleValueChange = e => {
	  const { action } = this.state;
	  const component = this;
	  this.setState({ lastTyped: Date.now(), inputValue: e.target.value });
	
	  setTimeout(() => {
	    const { inputValue, lastTyped } = component.state;
	    const { regex } = component.props;
	    if ((Date.now() - lastTyped) >= 1000) {
	      if (regex) component.setStatus(regex.test(inputValue) ? 6 : 5);
	      action();
	    }
	  }, 1000);
	}

	focus = () => this.inputRef.current.focus();

	setFloatingLabel = () => {
	  const {config } = this.props;
	  if (config.floatingLabel) {
	    return (
	      <label htmlFor={config.label.replace(" ", "")} >{config.label}</label>
	    );
	  }
	}

	render() {
	  const { status, errorText, inputValue } = this.state;
	  const { index, config } = this.props; 
	
	  var errorClass = `f_comment_1 ${config.class}__error--`;
	  var commentClass = `f_comment_1 ${config.class}__comment--`;

	  var mainClass = `${config.class}--${STATUS_STRINGS[status]} ${
	    config.floatingLabel ? "f_input_1 has-float-label" : ""
	  }`;

	  return (
	    <div className={mainClass} >
	      <div className={`${config.class}__label f_label_1`}>{config.label}</div>

	      <input 
	        id={`password-${index}`}
	        ref={this.inputRef} 
	        type="password" 
	        className="f_input_1" 
	        value={inputValue} 
	        onChange={this.handleValueChange}
	        placeholder={config.placeholder || ""}
	      />

	      {this.setFloatingLabel()}

	      <div className={`${commentClass}${errorText ? "disabled" : "active" }`}>
	        {config.comment}
	      </div>

	      <div className={`${errorClass}${!errorText ? "disabled" : "active"}`}>
	        {errorText}
	      </div>

	    </div>
	  );
	}
}

export default PasswordInput;
