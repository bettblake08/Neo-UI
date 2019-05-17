import React, { Component } from "react";
import PropTypes from 'prop-types';

class Button extends Component {
	constructor(props){
		super(props);
		this.state = {
			status: props.status
		};

		this.setStatus = this.setStatus.bind(this);
	}

	componentDidMount(){
		const button = this;
		this.props.parent.setState(state => ({
			buttons: [...state.buttons, button]
		}));
	}
    
	componentDidUpdate(){
		const { status } = this.state;
		if ([1,2].includes(status)) {
			const component = this;
			setTimeout(() => {
				component.setState({status: 0});
			}, 3000);
		}
	}

	setStatus = status => this.setState({ status });

	render() {
		const { config } = this.props;
		const { status } = this.state;
		var statusText = "";

		switch (status) {
			case 0: { statusText = "normal"; break; }
			case 1:
			case 5: { statusText = "fail"; break; }
			case 2: 
			case 6: { statusText = "success"; break; }
			case 3: { statusText = "loading"; break; }
			case 4: { statusText = "warning"; break; }
		}

		var classValue = `${config.type}--${statusText} f_button_2 f_text-capitalize`;
        
		return (
			<button
				type="button"
				className={classValue}
				onClick={config.action}
			>
				{config.label || ""}
			</button>
		);
	}
}

Button.propTypes = {
	config: PropTypes.shape({
		type: PropTypes.string,
		action: PropTypes.func,
		label: PropTypes.string
	}).isRequired,
	status: PropTypes.number,
	parent: PropTypes.instanceOf(Object).isRequired
};

Button.defaultProps = {
	status: 0
};

export default Button;
