import React, { Component } from "react";
import PropTypes from 'prop-types';

class ButtonWithIcon extends Component {
	constructor(props){
		super(props);
		this.state = {
			status: props.status
		};
	}

	componentDidMount(){
		const button = this;
		this.props.parent.setState(state => ({
			buttons: [...state.buttons, button]
		}));
	}
    
	componentDidUpdate(){
		const { status } = this.state;
		if ([1, 2].includes(status)) {
			const component = this;
			setTimeout(() => {
				component.setState({ status: 0 });
			}, 3000);
		}
	}

	render() {
		const { config } = this.props;
		const { status } = this.state;
		var statusText = "";

		switch (status) {
			case 0: { statusText = "normal"; break; }
			case 1: { statusText = "fail"; break; }
			case 2: { statusText = "success"; break; }
			case 3: { statusText = "loading"; break; }
			case 4: { statusText = "warning"; break; }
			case 5: { statusText = "danger"; break; }
			case 6: { statusText = "success"; break; }
		}

		return (
			<div className={`${config.class}--${statusText}`} onClick={config.action}>
				<div className={`${config.class}__icon`}>
					<svg className="icon">
						<use xlinkHref={`#${config.icon}`} />
					</svg>
				</div>
				<div className={`${config.class}__label f_normal`}>{config.label}</div>
			</div>
		);
	}
}

ButtonWithIcon.propTypes = {
	config: PropTypes.shape({
		type: PropTypes.string,
		action: PropTypes.func,
		label: PropTypes.string
	}).isRequired,
	status: PropTypes.number,
	parent: PropTypes.instanceOf(Object).isRequired
};

ButtonWithIcon.defaultProps = {
	status: 0
};

export default ButtonWithIcon;
