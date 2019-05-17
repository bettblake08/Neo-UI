import React, { Component } from "react";
import PropTypes from "prop-types";

class Popup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toggleContent: false
		};

		this.setContent = this.setContent.bind(this);
		this.toggleContent = this.toggleContent.bind(this);
	}

	toggleContent() {
		this.setState({toggleContent: !this.state.toggleContent});
	}

	setContent() {
		return React.cloneElement(
			this.props.component, {
				popupComponent: this
		});
	}

	render() {
		const { style, exit } = this.props;

		return (
			<div className={`popUp--${this.state.toggleContent ? "active" : "disabled"}`}>
				<div className="popUp__content SB" style={style}>
					<div className="popup__exit f_title"
						style={{ display: exit ? "block" : "none" }}
						onClick={() => { this.toggleContent(); }}>&times;</div>
					{this.setContent()}
				</div>
			</div>
		);
	}
}

Popup.propTypes = {
	component: PropTypes.object.isRequired,
	exit: PropTypes.bool,
	style: PropTypes.object
};

Popup.defaultProps = {
	style: {},
	exit: false
}

export default Popup;