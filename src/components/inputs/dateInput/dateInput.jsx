import React, { Component } from "react";
import PropTypes from "prop-types";

class DateInput extends Component {
	constructor(props) {
		super(props);
		this.dateInputRef = React.createRef();

		this.state = {
			defaultStatus: props.status,
			status: props.status,
			errorText:"",
			inputValue: props.config.inputValue || ""
		};

		this.handleValueChange = this.handleValueChange.bind(this);
		this.setFloatingLabel = this.setFloatingLabel.bind(this);
		this.focus = this.focus.bind(this);
	}

	componentDidMount() {
		const input = this;
		this.props.parent.setState(state => ({
			dateInputs: [...state.dateInputs, input]
		}));
	}

	componentDidUpdate() {
		const { status } = this.state;
		if ([1,2].includes(status)) {
			var component = this;
			setTimeout(() => {
				component.setState(state => ({ status: state.defaultStatus}));
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
		if (config.floatingLabel) {
			return (
				<label htmlFor={config.label.replace(" ", "")} >{config.label}</label>
			);
		}
	}

	focus = () => this.dateInputRef.current.focus();

	render() {
		const { errorText, status } = this.state;
		const { config } = this.props;
		let statusText = "";

		switch (status) {
			case 0: { statusText = "normal"; break; }
			case 1: { statusText = "fail"; break; }
			case 2: { statusText = "success"; break; }
			case 3: { statusText = "loading"; break; }
			case 4: { statusText = "warning"; break; }
			case 5: { statusText = "danger"; break; }
		}

		var errorClass = `f_comment_1 ${config.class}__error--`;
		var commentClass = `f_comment_1 ${config.class}__comment--`;

		var mainClass = `${config.class}--${statusText}`;
		mainClass += config.floatingLabel ? " f_input_1 has-float-label" : "";

		return (
			<div className={mainClass} >
				<div className={`${config.class}__label f_label_1`}>{config.label}</div>

				<input 
					id={config.label.replace(" ","")}
					ref={this.dateInputRef}
					type="date" 
					className="f_input_1" 
					value={this.state.inputValue} 
					onChange={this.handleValueChange}
					placeholder={config.placeholder || ""}
				/>

				{this.setFloatingLabel()}
				<div className={`${commentClass}${errorText ? "disabled" : "active"}`}>{config.comment}</div>
				<div className={`${errorClass}${errorText ? "active" : "disabled"}`}>
					{errorText}
				</div>

			</div>
		);
	}
}

DateInput.propTypes = {
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

DateInput.defaultProps = {
	status: 0
};

export default DateInput;
