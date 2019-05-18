import React, { Component } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


function ErrorPopup(props) {
	return (
		<div className="ePP">
			{
				props.errorPopup.errors.map((item, i) => {
					return <ErrorMessage error={item} key={i} />;
				})
			}
		</div>
	)
}

class ErrorMessage extends Component {
	constructor(props){
		super(props);

		this.state = {
			togglePopup:false
		};

		this.togglePopup = this.togglePopup.bind(this);
	}

	componentDidMount(){
		var com = this;
		com.togglePopup();

		setTimeout(()=>{
			com.togglePopup();
		},5000);
	}

	togglePopup(){
		this.setState({ togglePopup: !this.state.togglePopup});
	}

	render() {
		return (
			<div className={`ePP__error--${this.state.togglePopup ? "active" : "disabled" }`}>
				<div className="ePP__error__icon">
					<svg className="icon">
						<use xlinkHref="#warning" />
					</svg>
				</div>
				<div className="ePP__error__content f_normal">
					{this.props.error}
				</div>
			</div>
		);
	}
}

ErrorPopup.propTypes = {
	errorPopup: PropTypes.object.isRequired
};

ErrorMessage.propTypes = {
	error: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired
};

function mapStateToProps(state) {
	return {
		errorPopup: state.errorPopupReducer.errorPopup
	};
}

export default connect(mapStateToProps)(ErrorPopup);
