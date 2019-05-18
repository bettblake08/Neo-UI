import React, { Component } from "react";
import PropTypes from "prop-types";
import PasswordInput from "../passwordInput";
import { statusStrings } from "./helpers";

class NewPasswordInput extends Component {
	static propTypes = {
	  regex: PropTypes.object,
	  config: PropTypes.object.isRequired,
	  parent: PropTypes.object.isRequired
	}
	
	constructor(props) {
	  super(props);
	  this.state = { 
	    passwordInputs: [],
	    lastTyped: Date.now(),
	    inputValue: ""
	  };

	  this.checkPasswords = this.checkPasswords.bind(this);
	  this.renderPassword = this.renderPassword.bind(this);
	  this.focus = this.focus.bind(this);
	}

	componentDidMount(){
	  const { parent } = this.props;
	  parent.setState({
	    newPasswordInput: this
	  });
	}

	checkPasswords(){
	  const c = this;
	  this.setState({ lastTyped: Date.now() });

	  setTimeout(() => {
	    const { passwordInputs, lastTyped } = c.state;
	    if ((Date.now() - lastTyped) >= 1000) {
	      const isValid = passwordInputs[0].state.status === 6
					&& passwordInputs[1].state.status === 6
					&& passwordInputs[0].state.inputValue === passwordInputs[1].state.inputValue;
	      const inputValue = isValid ? passwordInputs[0].state.inputValue : "";
	      c.setState({ inputValue });
	    }
	  }, 1000);
	}

	renderPassword = index => (
	  <div className="pass">
	    <PasswordInput
	      parent={this}
	      status={0}
	      index={index}
	      regex={this.props.regex}
	      config={{
	        class: "text_input_4",
	        floatingLabel: true,
	        label: index === 1 ? "Password" : "Re-enter Password",
	        placeholder: this.props.config.placeholder,
	        action: this.checkPasswords
	      }} />
	  </div>
	);

	focus = () => this.state.passwordInputs[0].focus();

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
