import React, { Component } from "react";
import PropTypes from "prop-types";

import TextInput from "../textInput";
import Helpers from "../../../helpers";
import { getInputStatus } from "../textInput/helpers";

class NewPasswordInput extends Component {
	static propTypes = {
	  config: PropTypes.shape({
	    testInput: PropTypes.oneOfType([
	      PropTypes.string,
	      PropTypes.instanceOf(RegExp),
	      PropTypes.func				
	    ])
	  }).isRequired,
	  parent: PropTypes.shape().isRequired
	}
	
	constructor(props) {
	  super(props);
	  this.state = { 
	    passwordInputs: {},
	    lastChanged: Date.now(),
	    inputValue: ""
	  };
	}

	componentDidMount(){
	  Helpers.Common.attachToParentComponent(this);
	}

	componentDidUpdate(prevProps, prevState){
	  const { lastChanged } = this.state;
	  if (prevState.lastChanged !== lastChanged) setTimeout(this.checkPasswords, 500);
	}

	checkPasswords = () => {
	  const { passwordInputs: { password, repass } } = this.state;
		
	  const passwordValue = password.getValue();
	  const repassValue = repass.getValue();

	  if (!passwordValue|| !repassValue) return;

	  const passwordsMatch = passwordValue === repassValue;
	  const isValid = password.isValid() && repass.isValid() && passwordsMatch;
	  const message = "Passwords do not match! Please retry both password inputs.";
	
	  repass.setStatus(`${isValid ? 'success' : 'fail'}:fixed`, !passwordsMatch ? message : "");

	  this.setState({ inputValue: isValid ? passwordValue : "" });
	}

	focus = () => this.state.passwordInputs.password.focus();

	getValue = () => this.state.inputValue;

	isValid = () => this.state.inputValue.length !== 0;

	testInput = inputValue => {
	  const { config: { testInput = 'password' } } = this.props;
	  this.setState({ lastChanged: Date.now() });
	  return getInputStatus(inputValue, testInput);
	}

	renderPassword = (inputName, config) => (
	  <div className="neo-password">
	    <TextInput
	      parent={this}
	      componentStateKey='passwordInputs'
	      name={inputName}
	      config={{
	        ...config,
	        inputType: 'password',
	        testInput: this.testInput
	      }} />
	  </div>
	);

	render() {
	  const { config } = this.props;
	  let { password = {}, rePassword = {}} = config.inputs || {};

	  return (
	    <div className="neo-passwords">
	      {this.renderPassword('password', { ...config, label: password.label || 'Password' })}
	      {this.renderPassword('repass', { ...config, label: rePassword.label || 'Re-enter Password' })}
	    </div>
	  );
	}
}

export default NewPasswordInput;
