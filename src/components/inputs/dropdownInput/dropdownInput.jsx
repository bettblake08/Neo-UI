import React, { Component } from "react";
import PropTypes from "prop-types";
import { STATUS_STRINGS } from "../../../helpers";


class DropdownInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultStatus: props.status,
      status: props.status,
      errorText:"",
      inputValue: props.config.inputValue || "" 
    };

    this.dropdownInputRef = React.createRef();

    this.handleValueChange = this.handleValueChange.bind(this);
    this.setFloatingLabel = this.setFloatingLabel.bind(this);
    this.focus = this.focus.bind(this);
  }

  componentDidMount() {
    var state = this.props.parent.state;
    state.dropdownInputs.push(this);
    this.props.parent.setState(state);
  }

  componentDidUpdate() {
    const { status, defaultStatus } = this.state;
    if ([1, 2].includes(status)) {
      const component = this;
      setTimeout(() => {
        component.setState({ status: defaultStatus });
      }, 3000);
    }
  }

	handleValueChange = e => {
	  const { inputLength } = this.state;
	  e.target ? this.setState({
	    inputValue: e.target.value.substr(0, inputLength)
	  }) : null;
	}

	setFloatingLabel = () => {
	  const { config } = this.props;
	  if (config.floatingLabel){
	    return (
	      <label htmlFor={config.label.replace(" ","")} >
	        {config.label}
	      </label>
	    );
	  }
	}

	focus = () => this.dropdownInputRef.current.focus();

	render() {
	  const { status, errorText } = this.state;
	  const { config } = this.props;

	  const errorClass = `f_comment_1 ${config.class}__error--`;
	  const commentClass = `f_comment_1 ${config.class}__comment--`;

	  const mainClass = `${config.class}--${STATUS_STRINGS[status]}${
	    config.floatingLabel ? " f_input_1 has-float-label" : ""}`;

	  return (
	    <div className={mainClass} >
	      <div className={`${config.class}__label f_label_1` }>{config.label}</div>
    
	      <select
	        id={config.label.replace(" ","")}
	        ref={this.dropdownInputRef}
	        name="dd"
	        className="f_input_dd"
	        onChange={this.handleValueChange}>
	        <option value="">{config.placeholder || "-- Select --"}</option>
	        {
	          config.options.map((item,i)=>{
	            return (<option value={item.value} key={i}>{item.label}</option>);
	          })
	        }
	      </select>
                
	      {this.setFloatingLabel()}
	      <div className={`${commentClass}${errorText ? "disabled" : "active"}`}>{config.comment}</div>
	      <div className={`${errorClass}${errorText ? "active" : "disabled"}`}>{errorText}</div>

	    </div>
	  );
	}
}

DropdownInput.propTypes = {
  config: PropTypes.shape({
    class: PropTypes.string,
    label: PropTypes.string,
    floatingLabel: PropTypes.bool,
    comment: PropTypes.string,
    inputValue: PropTypes.string
  }).isRequired,
  status: PropTypes.number,
  parent: PropTypes.shape({
    state: PropTypes.instanceOf(Object).isRequired,
    setState: PropTypes.func.isRequired
  }).isRequired
};

DropdownInput.defaultProps = {
  status: 0
};

export default DropdownInput;
