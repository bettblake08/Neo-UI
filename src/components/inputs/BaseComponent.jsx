import React, { Component } from 'react';
import PropTypes from "prop-types";
import Regex from "../../helpers/regex";

import "./baseComponent.scss";

export default class BaseComponent extends Component {
	static propTypes = {
	  children: PropTypes.shape({}).isRequired
	}

	constructor(props) {
	  super(props)

	  this.state = {
	    neoComponents: {}
	  }
	}

	getClone = () => {
	  const { children } = this.props;
	  const { props } = children;

	  return React.cloneElement(children,
	    {
	      parent: this,
	      config: {
	        ...props.config,
	        testInput: Regex.email
	      }
	    })
	}

	render() {

	  return (
	    <div className="demo-box">
	      {this.getClone()}
	    </div>
	  )
	}
}
