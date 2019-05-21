import React, { Component } from "react";
import PropTypes from 'prop-types';

import Helpers, {
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
    Helpers.Common.attachToParentComponent(this);
  }
    
  componentDidUpdate(){
    Helpers.Common.resetInteractiveComponentStatus(this);
  }

	setStatus = status => this.setState({
	  status: STATUS_STRINGS.findIndex(string => string === status) || 0
	});

  setIcon = config => (
    <>
      <div className={`${config.type}__icon`}>
        <i className={`fas fa-${config.icon} icon`}/>
      </div>
      <div className={`${config.type}__label f_normal`}>{config.label}</div>
    </>
  )
  
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
        {
          config.icon ? this.setIcon(config) : config.label
        }
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
