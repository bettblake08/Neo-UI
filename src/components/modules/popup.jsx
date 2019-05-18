import React, { Component } from "react";
import PropTypes from "prop-types";

class Popup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toggleContent: false
		};

		this.toggleContent = this.toggleContent.bind(this);
	}

	toggleContent() {
		this.setState({toggleContent: !this.state.toggleContent});
	}

	render() {
		const { style, exit, component } = this.props;
		const { toggleContent } = this.state;
		const popupViewComponent = React.cloneElement(component, { popupComponent: this});
		
		return (
			<div className={`popUp--${toggleContent ? "active" : "disabled"}`}>
				<div className="popUp__content SB" style={style}>
					<div className="popup__exit f_title"
						style={{ display: exit ? "block" : "none" }}
						onClick={() => { this.toggleContent(); }}>&times;</div>
					{popupViewComponent}
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