import React, { Component } from "react";
import PropTypes from "prop-types";

import TextInput from "../textInput";
import Helpers from "../../../helpers";

class NewPasswordInput extends Component {
	static propTypes = {
	  regex: PropTypes.object,
	  config: PropTypes.object.isRequired,
	  parent: PropTypes.object.isRequired
	}
	
	constructor(props) {
	  super(props);
	  this.state = { 
	    passwordInputs: {},
	    lastTyped: Date.now(),
	    inputValue: ""
	  };
	}

	componentDidMount(){
	  Helpers.Common.attachToParentComponent(this);
	}

	checkPasswords(){
	  const component = this;
	  this.setState({ lastTyped: Date.now() });

	  setTimeout(() => {
	    const { passwordInputs, lastTyped } = component.state;
	    if ((Date.now() - lastTyped) >= 1000) {
	      const isValid = passwordInputs[0].state.status === 6
					&& passwordInputs[1].state.status === 6
					&& passwordInputs[0].state.inputValue === passwordInputs[1].state.inputValue;
	      const inputValue = isValid ? passwordInputs[0].state.inputValue : "";
	      component.setState({ inputValue });
	    }
	  }, 1000);
	}

	renderPassword = index => (
	  <div className="pass">
	    <TextInput
	      parent={this}
	      componentStateKey='passwordInputs'
	      name={`password-${index}`}
	      regex={this.props.regex}				
	      config={{
	        floatingLabel: true,
	        type: "neo-text-input",
	        action: this.checkPasswords
	      }} />
	  </div>
	);

	focus = () => this.state.passwordInputs['password-1'].focus();

	render() {
	  return (
	    <div className="passwords">
	      {this.renderPassword(1)}
	      {this.renderPassword(2)}
	    </div>
	  );
	}
}

export default NewPasswordInput;
