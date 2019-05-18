import React, { Component } from "react";
import PropTypes from 'prop-types';

import {
  STATUS_STRINGS,
  defaultReactiveUIProps,
  defaultReactiveUIDefaultProps
} from "../../../helpers";

class Button extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: props.defaultStatus
    };
  }

  componentDidMount(){
    const button = this;
    const { componentStateKey, parent, name } = this.props;
    parent.setState(state => ({
      [componentStateKey]: {
        ...state[componentStateKey],
        [name]: button
      }
    }));
  }
    
  componentDidUpdate(){
    const { status } = this.state;
    const { defaultStatus } = this.props;
    if ([1,2].includes(status)) {
      const component = this;
      setTimeout(() => {
        component.setState({status: defaultStatus });
      }, 3000);
    }
  }

	setStatus = status => this.setState({
	  status: STATUS_STRINGS.findIndex(string => string === status) || 0
	});

	render() {
	  const { config } = this.props;
	  const { status } = this.state;
	  const statusText = STATUS_STRINGS[status];

	  const classValue = `${config.type || 'neo-button'}--${statusText} neo-font--button--2 neo-font--text-capitalize`;
    
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
  ...defaultReactiveUIProps,
  config: PropTypes.shape({
    type: PropTypes.string,
    action: PropTypes.func,
    label: PropTypes.string
  }).isRequired
};

Button.defaultProps = {
  ...defaultReactiveUIDefaultProps
};

export default Button;
