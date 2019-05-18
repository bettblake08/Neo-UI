import React, { Component } from 'react';
import PropTypes from "prop-types";

import "./baseComponent.scss";

export default class BaseComponent extends Component {
	static propTypes = {
	  children: PropTypes.instanceOf(Array).isRequired
	}

	constructor(props) {
	  super(props)

	  this.state = {
	    neoComponents: {}
	  }
	}

	delay = () => new Promise(resolve => setTimeout(() => resolve(), 2000));

	onClick = (inputName, status) => {
	  const { neoComponents } = this.state;
	  neoComponents[inputName].setStatus('loading');
	  this.delay().then(() => {
	    neoComponents[inputName].setStatus(status);
	  });
	}

	getClone = () => {
	  const { children } = this.props;
	  const { props } = children;

	  return React.cloneElement(children,
	    {
	      parent: this,
	      config: {
	        ...props.config,
	        action: () => this.onClick(props.name, props.config.action().actionStatus)
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
